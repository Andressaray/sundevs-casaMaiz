# Known Limitations & Next Steps

**CasaMaiz App — CMS-driven React Native client**
Status as of this submission: `tsc --noEmit` clean, `eslint .` clean, 80 test suites / 281 tests passing, 86.07% statement coverage (70.88% branch).

This document is deliberately candid. It lists what the app **does not** do yet, why, and what I would build next. Everything below is a real gap I found in this codebase, not a hypothetical.

---

## 1. Contract & data integrity

### 1.1 `contractVersion` is typed but never verified at runtime
The response envelope's `contractVersion` appears in `src/types/page.types.ts` and `src/types/bootstrap.types.ts`, but no code compares it against a supported version. If the CMS ships `1.2` with a reshaped `data`, the app renders whatever arrives and fails at the block level instead of at the boundary.

**What I'd do:** a single `assertSupportedContract(envelope)` in the axios response interceptor (or a thin `withEnvelope()` wrapper around each service call) that checks `contractVersion` against a `SUPPORTED_CONTRACT_VERSIONS` constant and throws a typed `UnsupportedContractError`. Screens already have an `isError && !data` branch — they'd route that error to a dedicated "update your app" state instead of the generic retry.

### 1.2 There is no runtime validation of CMS responses
TypeScript types are compile-time only. `response.data` is cast, never validated. A block missing `slides`, an `image` without `width`/`height`, or a `null` where a string is expected reaches the render path unchecked. `imageBlock` computes `imageToShow.width / imageToShow.height` with no guard — a missing dimension produces `NaN` height.

**What I'd do:** introduce Zod (or Valibot, smaller bundle) schemas mirroring `page.types.ts`/`bootstrap.types.ts`, parsed in the service layer. Critically, validate **per block, not per page**: an invalid block is dropped and reported, the rest of the page still renders. That's the difference between "one bad CMS entry hides a promo" and "one bad CMS entry blanks the home screen".

### 1.3 The API base URL is hardcoded
`src/services/index.ts` pins `https://payload-cms-poc-seven.vercel.app/api/content/v1/`. The brief explicitly asks for it to be configurable, and there is no staging/production split and no way to point QA at a preview environment.

**What I'd do:** `react-native-config` with `.env.development` / `.env.staging` / `.env.production`, surfaced through a typed `src/config/env.ts`. Same treatment for `APP_VERSION`, which is currently the literal `"1.0.1"` in `src/config/constants/index.ts` rather than the installed build's version — it will silently drift from the real binary and corrupt every `appVersion` sent to the CMS. `react-native-device-info` (or reading `Info.plist` / `BuildConfig` through a tiny native constant) fixes that.

### 1.4 Media URLs are used verbatim
Every block does `source={{ uri: image.url }}`. The contract allows **relative Payload paths** as well as absolute CDN URLs, and exposes responsive `sizes`. Only `Alert.tsx` picks a size (`sizes.thumbnail`); the blocks always take the full-size original.

**What I'd do:** a `resolveMediaUrl(media, targetWidth)` helper that (a) prefixes relative paths with the configured base URL, and (b) selects the smallest `sizes.*` entry ≥ the rendered width × pixel ratio. Cheap to write, and it's the single biggest bandwidth/scroll-jank win available.

---

## 2. Screens that are not wired to the CMS

### 2.1 Privacy is a placeholder
`src/features/privacy/screens/privacy_policy/index.tsx` holds `useState<LayoutBlock[]>([])` and a `setTimeout(1000)` fake refresh. `/legal/privacy_policy` is never called, so the screen always shows the empty state. The plumbing to fix it already exists.

**What I'd do:** a `usePrivacyData` hook over `usePageData` with a `LegalService`, exactly mirroring `useHomeData`/`useMenuData`. Roughly an hour, including the mirrored test. This is the single most visible gap in the submission.

### 2.2 Reservations is a local shell
Same pattern: local `useState([])`, fake refresh, and `handleCreateReservation` is an empty function. This one is defensible — no reservation API exists in the contract — but the button currently does nothing, which is worse than not showing it.

**What I'd do:** either drive the screen from a `formBlock` (see §3.1) posting to `/api/form-submissions`, or hide the tab behind a bootstrap feature flag until a real endpoint exists. A CTA that no-ops should not ship.

### 2.3 `src/features/notfound/services/index.ts` is an empty file
Zero bytes, tracked in git. Delete it or fill it.

---

## 3. Contract coverage

### 3.1 Five of twelve contract block types are unimplemented
`restaurantHero`, `carousel`, `cardGrid`, `promoRail`, `textBlock`, `restaurantCTA` and `imageBlock` are built. `cta`, `content`, `mediaBlock`, `archive` and `formBlock` fall through to `BlockRenderer`'s `default` branch. That is safe — no crash — but the app silently drops content the CMS considers published.

`formBlock` is the costly one: without it, `POST /api/form-submissions` is entirely unexercised, and with it the Reservations screen (§2.2) becomes real.

**What I'd do, in priority order:** `formBlock` (unlocks submissions + reservations), then `cta` and `mediaBlock` (trivial, close to existing components), then `content` and `archive`.

### 3.2 The unknown-block fallback is invisible
`default:` logs a warning and returns `<View />`. In development, an editor publishing an unsupported block sees nothing at all and has no way to tell whether the block failed or was filtered by targeting.

**What I'd do:** render a labelled dev-only placeholder (`__DEV__` gated) naming the unrecognised `blockType`, and emit a telemetry event in production so the team learns which unimplemented types are actually being published.

### 3.3 `BlockRenderer` is a `switch`, not a registry
The brief and the architecture doc both describe a component map. A `switch` works, but every new block edits a shared file, and the mapping can't be extended or overridden per platform.

**What I'd do:** `const BLOCK_REGISTRY: Record<BlockType, ComponentType<BlockProps>>`, with `BlockRenderer` reduced to a lookup plus fallback. It also makes the registry directly testable — "every type in the union has an entry" becomes one assertion.

---

## 4. Offline, caching and network state

### 4.1 The app cannot tell that it is offline
There is no `@react-native-community/netinfo` and no connectivity state anywhere. The brief calls for an explicit offline/stale state; today a failed fetch with cached data renders the cached content with **no indication that it is stale**, and a failed fetch without cache renders a generic error that blames nothing in particular.

**What I'd do:** NetInfo → a `useConnectivity()` hook → a persistent "Offline — showing content from {relative time}" banner, driven off react-query's `dataUpdatedAt`, which is already persisted. Also gate retries: right now `retry: 2` with a 1s delay burns three requests against an unreachable host before failing.

### 4.2 Cache is written only on backgrounding
`PersistenceManager` persists on `AppState` `background`/`inactive`. If the OS kills the app from the foreground (or it crashes), the session's fetches are lost. And the persist step serialises the whole critical set on every transition, on the JS thread.

**What I'd do:** persist on successful query settle (debounced), not only on app state change — react-query v4+'s `persistQueryClient` does this properly, which leads to §7.1.

### 4.3 `nextChangeAt` handling is partial
`usePageData` reads `nextChangeAt` from the **already-cached** response to compute `staleTime`/`cacheTime`, so the boundary is applied one fetch late — the first response's own `nextChangeAt` doesn't constrain that response. The restore path in `App.tsx` doesn't check it at all: a cached page whose `nextChangeAt` passed while the app was closed is rehydrated and shown as if valid, bounded only by the 7-day `MAX_AGE_MS`.

**What I'd do:** evaluate `nextChangeAt` at rehydration time in `cachePersister.restoreClient()` and drop expired entries there, and read it from the incoming response via `onSuccess` rather than from the cache.

### 4.4 The 7-day cache TTL is arbitrary and undifferentiated
`bootstrap`, `home` and `menu` share one `MAX_AGE_MS`. Bootstrap carries operational notices and alerts — a week-old maintenance banner is actively wrong. Menu content ages much more gracefully.

**What I'd do:** per-key TTLs, with bootstrap on the order of hours.

---

## 5. Bootstrap features that are fetched but unused

`/bootstrap` returns feature flags, operational controls and app-update information. `featureFlags` is typed in `bootstrap.types.ts` and **never read**. There is no maintenance-mode handling and no recommended/required update prompt — both are named in the brief.

**What I'd do:** a `useFeatureFlag(key)` hook over the existing bootstrap context (cheap, the data is already there), a `<MaintenanceGate>` above the navigator, and an update prompt comparing `APP_VERSION` (once it's real, §1.3) against the bootstrap minimum.

**Alerts are also only partly honoured.** `AlertsContainer` renders every alert returned, ignoring `placement`, `trigger` and page targeting, and mounting them as the `ListHeaderComponent` of the Home list only — so alerts intended for Menu never appear. Dismissal lives in component state, so every alert returns on remount; it should persist to AsyncStorage keyed by alert id. `Alert.tsx` also maps priority to colour with bare magic numbers (`100`, `50`) and navigates via `action.href.replace('/', '')` straight into `navigation.navigate()`, bypassing the `ROUTES` resolver every other surface goes through — an unmapped `href` throws instead of falling back to Not Found.

---

## 6. Navigation

- **External URLs are not supported at all.** `Linking` is never imported. The brief asks for external destinations to be validated before opening; today a CMS action pointing at `https://…` matches nothing in `ROUTES` and silently does nothing.
- **`handleNavigation` is duplicated** verbatim in the Home, Menu and Privacy screens. It belongs in a `useNavigateToDestination()` hook — one place to add URL support, preconditions and analytics.
- **Unsupported destinations no-op rather than routing to Not Found.** `if (path in ROUTES)` with no `else`; `NOT_FOUND_STACK` exists but is unreachable from content.
- **Tabs are a fixed set filtered by the CMS**, not built from it. A genuinely new CMS destination cannot produce a tab without a release. That is a reasonable trade-off for native tab bars, but it is a limit of the "no release needed" claim and should be stated as such.
- **Deep links / universal links are not configured.** No `linking` config on `NavigationContainer`, so a promo email cannot open a specific page.

---

## 7. Dependencies and tooling

### 7.1 `react-query` v3 is end-of-life
The project uses `react-query@3.39.3`. It has been superseded by `@tanstack/react-query` v5; v3 receives no fixes and its React 19 compatibility is incidental rather than supported. It also forced the hand-rolled `cachePersister` — v4+ ships `persistQueryClient` with an AsyncStorage adapter that handles the cases in §4.2 and §4.3 properly.

**What I'd do:** migrate to `@tanstack/react-query` v5 and delete roughly half of `persister.ts`. This is the highest-leverage dependency change in the project.

### 7.2 No CI
No `.github/`. The husky `pre-commit` hook runs `typecheck` only — lint and tests are on the honour system and `--no-verify` skips even that.

**What I'd do:** a GitHub Actions workflow running `typecheck`, `lint`, `test --coverage` on every PR, with a coverage floor (say 80% statements / 70% branches, roughly where it stands) so it can't silently regress.

### 7.3 No error monitoring and no analytics
No Sentry, no crash reporting, no event tracking. For an architecture whose entire premise is "content changes without a release", there is no way to learn that a CMS change broke a client. The A/B-testing benefit claimed in the architecture doc is also unmeasurable without analytics.

**What I'd do:** Sentry with the block type attached as a tag on render errors, plus a `block_rendered` / `block_unknown` event. This is what makes CMS-driven safe rather than just fast.

### 7.4 No error boundary
`ErrorFallback` is a presentational component rendered from an `isError` branch. There is no React error boundary, so a throw inside any block component (see §1.2 — `NaN` heights, missing arrays) unmounts the whole tree to a white screen.

**What I'd do:** wrap `BlockRenderer` in a per-block error boundary. One malformed block loses one block.

### 7.5 Dead dependencies
`react-native-reanimated`, `react-native-worklets` and `@react-native-community/blur` are installed and linked natively but imported nowhere in `src/`. Three native dependencies' worth of build time, pod install and upgrade risk for zero runtime use. Either use Reanimated (it would do §8.3's reduced-motion work better than `Animated`) or drop all three.

### 7.6 Repository hygiene
`src/navigation/tabs/index.tsx.backup` and `src/styles/theme.css` (a CSS file in a React Native app) are tracked in git and dead. Untracked but sitting in the working tree: `src/config/languages/{en,es}.json.backup`, `ios/CasaMaizApp/AppDelegate.swift.backup`. Also dead but tracked: `src/components/example.tsx`, `src/components/glasscomponents.tsx` (both excluded from coverage rather than deleted), and `features/home/types/home.types.ts`, which duplicates `types/page.types.ts`. Noise for a reviewer and a trap for the next developer.

---

## 8. Theming, i18n and accessibility

### 8.1 Two `useThemeColors` implementations coexist
`theme/ThemeContext.tsx` respects the provider's `themeMode`; `theme/colors.ts` only reads `useColorScheme`. Almost every component imports the second one, so **the in-app theme toggle does not affect most of the UI** — it follows the OS regardless. This is a real, user-visible bug, not just debt.

**What I'd do:** migrate every import to `ThemeContext`, then delete the duplicate hook (keeping `COLORS`, `useTheme`, `withOpacity`).

### 8.2 UI strings are bundled, not CMS-driven
`en.json`/`es.json` ship in the binary while the architecture doc claims "the app contains zero hardcoded content". Tab labels do come from the CMS (with the bundle as fallback), which is the right pattern — but error messages, empty states and retry labels don't, so fixing a bad error string still needs a release. There is also no language auto-detection: the store defaults to `es` and only a manual toggle changes it.

**What I'd do:** treat the bundle as the offline fallback and let `/bootstrap` override the string table; detect the device locale on first launch.

### 8.3 Accessibility is close to absent
Only `EmptyComponent` sets `accessibilityRole`/`accessibilityLabel`. Every image renders without `accessible`/`accessibilityLabel`, so the `alt` text the contract provides is fetched and thrown away. Nothing sets `maxFontSizeMultiplier` or otherwise handles Dynamic Type, and layouts using fixed heights (the 200px carousel slide image, the 80px alert thumbnail) will clip at large text sizes. `AccessibilityInfo.isReduceMotionEnabled` is never consulted, so the alert's fade-in animation runs regardless of the user's setting. Several touch targets — the alert's 32×32 close button — are below the 44×44 minimum.

**What I'd do:** an accessibility pass with VoiceOver/TalkBack, alt text plumbed through from media objects, a `useReducedMotion()` guard on animations, and a screen-reader smoke test in CI via `@testing-library/react-native`'s a11y queries.

---

## 9. Performance

- **The carousel uses `ScrollView`, not `FlatList`.** Every slide mounts and every image downloads immediately, however long the rail. The brief specifically asks for virtualised rails.
- **`promoRail` isn't a rail at all.** It `.map()`s every promotion into a vertical stack of `View`s — no horizontal scroll, no virtualisation. `cardGrid` does the same. Fine for the 3–4 items the CMS returns today, a problem the moment an editor publishes twenty.
- **Images have no caching layer or progressive loading.** No `react-native-fast-image` (or the newer `expo-image`), no placeholder, no fade-in — so scrolling back up re-decodes, and each image pops in.
- **Carousel snapping is off by 4px per slide.** `snapToInterval={300}` against a 280px slide plus a 16px gap (`SPACING.lg`) = 296. The drift compounds across slides; it should be derived from the measured item width, not a literal.
- **`FlatList` render props are inline arrow functions**, so `renderItem` is a new reference on every render, defeating memoisation on long pages.
- **No memoisation on block components.** `React.memo` on the leaf blocks plus stable `renderItem` callbacks is a cheap win on the Home list.

---

## 10. Testing

281 tests pass and coverage is respectable, but the shape of the suite has gaps:

- **Branch coverage is 70.9%** against 86.1% statements — the untested branches are disproportionately the error, empty and fallback paths, which is exactly where a resilience-focused brief should be strongest.
- **No end-to-end tests.** No Detox, no Maestro. Nothing exercises "cold start → bootstrap → home renders" on a device, which is the one flow that must never break.
- **No contract tests against the live API.** Every test uses hand-written fixtures, so the suite stays green if the CMS changes shape. A nightly job hitting `/api/openapi.json` and validating the fixtures against it would catch drift before users do.
- **`jest.config.cjs` maps modules to stubs under `__tests__/__mocks__/missing/`** (`EmptyComponent`, `skeletons`). That mapping was a workaround for modules that didn't exist yet; the real modules exist now, so the tests are exercising stubs instead of production code. It should be deleted.
- **Jest reports a worker that "failed to exit gracefully"** — a leaked timer or subscription somewhere, most likely the `Animated` timing in `Alert.tsx` or a `setTimeout` in the placeholder screens. Worth chasing with `--detectOpenHandles`; leaks like this eventually cause flakes in CI.
- **No visual regression or snapshot coverage** for dark mode, so §8.1-style theming regressions are invisible to the suite.

---

## Priority if I had another week

| # | Work | Why first |
|---|------|-----------|
| 1 | Runtime validation (Zod) + `contractVersion` gate, per-block | The architecture's central claim — "bad CMS data can't break the app" — is currently unenforced |
| 2 | Wire Privacy to `/legal/privacy_policy`; hide or implement Reservations | Two of four tabs are placeholders; most visible gap |
| 3 | NetInfo + stale/offline banner + `nextChangeAt` at rehydration | The offline story is half-built and silently shows stale content as fresh |
| 4 | Fix the duplicated `useThemeColors` | The theme toggle doesn't work for most of the UI — a user-visible bug |
| 5 | `formBlock` + `POST /api/form-submissions` | Only unexercised endpoint; unlocks Reservations |
| 6 | Migrate to `@tanstack/react-query` v5 | Unblocks proper persistence and removes an EOL dependency |
| 7 | Env config + real app version | Blocks any real staging/production deployment |
| 8 | CI with coverage floor + Sentry | Makes everything above stay fixed, and makes CMS-driven releases observable |
| 9 | Accessibility pass, virtualised rails, image caching | Polish that a restaurant app genuinely needs, but nothing above depends on it |
