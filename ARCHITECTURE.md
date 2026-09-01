# CasaMaiz — Architecture Overview & Key Trade-offs

React Native CLI 0.87 · React 19.2 · TypeScript 6 (`strict`) · Payload CMS content contract v1.1

---

## 1. The idea in one paragraph

The app is a **renderer, not a content container**. Every screen is assembled at runtime from
content the CMS returns: navigation labels, page layouts, promotions, alerts, copy. The client
owns *how* things look and *where* they navigate; the CMS owns *what* is shown and *in what
order*. Adding a promotion or reordering a home page is an editorial action, not a release.

## 2. Layers

```
App.tsx                    cache restore gate → SafeArea → Theme → QueryClient
                           → PersistenceManager → Bootstrap → NavigationContainer
   │
   ├── src/navigation      static ROUTES map; tabs built from CMS navigation items
   ├── src/features/*      screaming architecture: home | menu | reservation | privacy | notfound
   │                       each: screens / components / hooks / services / types
   ├── src/components      blocks/ (BlockRenderer + one component per CMS block) + shared UI
   ├── src/hooks           usePageData (react-query wrapper), useTranslations, useGetBootstrap
   ├── src/services        single axios instance + per-resource services + cache persister
   ├── src/store           zustand: theme + language only
   └── src/theme           design tokens, light/dark
```

## 3. Data flow

**Startup.** `App.tsx` blocks on restoring the persisted cache from AsyncStorage, seeds the
react-query client with it, then mounts the tree. `BootstrapProvider` fetches
`GET /bootstrap?platform&market&audience&appVersion` and holds navigation, feature flags,
alerts, promotions and operational controls. The tab bar is built from
`bootstrap.data.navigation.items` — labels and which tabs exist come from the CMS, with the
local tab definitions as fallback.

**A page.** `HomeScreen → useGetHomeData → usePageData → HomeService → axios`.
The response is `{ contractVersion, data: { layout: LayoutBlock[], nextChangeAt, ... } }`.
The screen maps `layout` through `BlockRenderer`, which switches on `blockType` and renders
the matching component. Every screen implements the same four states: skeleton, empty, error
with retry, and pull-to-refresh.

**Caching.** react-query holds server state in memory. `usePageData` reads `nextChangeAt` from
the cached response and clamps `staleTime` / `cacheTime` to it, so content the CMS says will
change in 20 minutes will not be served stale for longer than that. On app background,
`cachePersister` writes only the critical keys (`bootstrap`, `home`, `menu`) to AsyncStorage
with a 7-day TTL; on next launch they are restored before the first render.

**State split.** Server state lives in react-query, never in zustand. zustand holds only theme
and language. React Context is used for the two values that are read everywhere and change
rarely: bootstrap and theme.

---

## 4. Key trade-offs

### CMS-driven rendering instead of hardcoded screens
Content changes ship in minutes rather than through app review, and iOS/Android are served from
one content model. **Cost:** the app is only as reliable as the payload. A malformed block, a
renamed field or a CMS outage degrades the UI in ways no build-time check catches, and
debugging spans two systems. Mitigated with skeletons, empty states, defensive optional
chaining and the offline cache — not eliminated.

### Block registry as a typed `switch`, not a dynamic map
`BlockRenderer` is an exhaustive switch over a discriminated union, so TypeScript flags a block
component wired to the wrong props at compile time. **Cost:** a genuinely new block type still
requires a release — the "no code changes" promise holds for *composition*, not for new block
kinds. Today `cta`, `content`, `mediaBlock`, `archive` and `formBlock` exist in the contract and
fall through to the `default` branch, which logs a warning and renders an empty `View`.

### TypeScript types as the only contract validation
The contract is expressed as types (`page.types.ts`, `bootstrap.types.ts`) and trusted at
runtime. This kept the data layer thin and dependency-free. **Cost:** types vanish at runtime,
so nothing actually verifies the payload. `contractVersion` is carried in every response but is
**not checked anywhere in the app** — the forward-compatibility story is currently a convention,
not an enforcement. A runtime schema (zod/valibot) at the service boundary is the obvious next
step; the deliberate choice was to defer it rather than pay its bundle and boilerplate cost in a
prototype.

### Custom AsyncStorage persister instead of the react-query persist plugin
~150 lines, persists only three critical keys, validates the restored shape and expires it. This
keeps storage small and predictable, and avoids serializing every incidental query.
**Cost:** hand-rolled code to maintain, and it only writes on `background`/`inactive` — a hard
crash in the foreground loses the session's updates. The startup restore is also a blocking
gate: a slow AsyncStorage read delays first paint behind a loading screen.

### Bootstrap as a blocking provider
Navigation cannot be built without CMS navigation items, so `BootstrapProvider` renders a
loading screen until the query resolves. Simple and correct in order. **Cost:** it is a single
point of failure — the provider has no error branch, so a bootstrap failure with no cached copy
leaves the user on the loading screen. The tab fallback covers a missing `navigation` object but
not a failed request. Splitting bootstrap into "blocking" (navigation) and "non-blocking"
(promotions, alerts) would remove most of that risk.

### App owns destinations, CMS owns labels
`ROUTES` is a static, `as const`-typed map from CMS path to local stack. Navigation stays
type-safe and unreachable deep links are impossible. **Cost:** a path the CMS invents that is not
in `ROUTES` is silently ignored — no fallback route, no telemetry. Every new destination needs a
release.

### react-query v3, not TanStack Query v5
v3 matches the project's fixed stack and the persister was written against its cache API.
**Cost:** v3 is no longer actively developed; a migration is inevitable and the persister is the
part that will hurt.

### Feature-sliced structure for a four-screen app
Each feature owns its screens, hooks, services and components, so a feature can be deleted or
handed to another developer in one move. **Cost:** noticeable ceremony at this size — a single
screen spans four directories, and it has already produced duplication (`HomeService` and the
generic `PagesService` do the same job; `features/home/types` duplicates `types/page.types.ts`).

### Local JSON i18n instead of i18next
`useTranslations` is a ~40-line nested-key lookup over two JSON files, no dependency, and it
falls back to the key rather than throwing. **Cost:** no pluralization, interpolation or lazy
loading, and there are now **two sources of user-facing copy** — CMS labels and local JSON —
with no rule about which wins beyond "CMS if present". Language is also not persisted; it resets
to `es` on relaunch.

---

## 5. Known gaps, stated plainly

- `featureFlags` and `operationalControls` (including `appUpdate` / force-update policy) are
  typed and fetched but not yet consumed anywhere.
- `features/privacy` and `features/reservation` still run on local placeholder state with a
  simulated refresh instead of the CMS.
- Two `useThemeColors` exist — the correct one in `ThemeContext`, and one in `theme/colors.ts`
  that reads `useColorScheme` directly. Most components import the latter, so the in-app theme
  toggle does not reach them.
- No runtime contract validation and no `contractVersion` gate (see above).

**Priority order if this continued:** runtime validation at the service boundary →
`contractVersion` + `appUpdate` enforcement → non-blocking bootstrap with a cached fallback →
unify the theme hook → move privacy/reservation onto the CMS.
