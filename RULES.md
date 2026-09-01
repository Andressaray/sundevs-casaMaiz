# CasaMaizApp — Working Rules for Claude

> This file is the **source of truth** for how this project is built.
> Read it in full before creating, modifying, or moving any file under `src/`.
> If a request contradicts these rules, say so before implementing.
> Business context and CMS contract: see `.claude/CONTEXT.md`.

---

## 1. Stack and fixed decisions

| Area | Choice | Do not replace without asking |
|---|---|---|
| Framework | React Native **CLI** 0.87 (not Expo), React 19.2 | ✅ |
| Language | TypeScript 6 `strict: true` | ✅ |
| Navigation | `@react-navigation/native` v7 + `native-stack` + `bottom-tabs` | ✅ |
| Data fetching / cache | **`react-query` v3** (`useQuery`, `QueryClientProvider`) | ✅ |
| Offline cache | `@react-native-async-storage/async-storage` via `src/services/cache/persister.ts` | ✅ |
| HTTP | **axios**, single instance in `src/services/index.ts` | ✅ |
| Global client state | **zustand** (`src/store`) — theme and language only | ✅ |
| Server state | react-query, **never** zustand | ✅ |
| Styling | `StyleSheet.create` + tokens from `src/theme` | ✅ |
| Icons | `react-native-svg` under `src/ui/icons` | ✅ |
| Gestures / animation | `react-native-gesture-handler`, `react-native-reanimated` v4 + `react-native-worklets`, `@react-native-community/blur` | ✅ |
| i18n | Local JSON files + `useTranslation` (no i18next) | ✅ |
| Testing | **jest** + `@testing-library/react-native` + `axios-mock-adapter` | ✅ |

Node `>= 22.11.0`. Package manager: **yarn** (a `yarn.lock` exists; do not generate `package-lock.json`).

Config files (note the extensions — they are `.cjs` because the toolchain is ESM-aware):
`babel.config.cjs`, `jest.config.cjs`, `metro.config.js`, `eslint.config.js` (ESLint 10 **flat config**; there is no `.eslintrc.js`), `.prettierrc.js`, `.prettierignore`, `tsconfig.json`.

---

## 2. Architecture: Screaming Architecture by feature

```
src/
├── components/        # UI shared across features
│   ├── blocks/        # CMS block rendering  ← the core of the app
│   ├── shared/        # Cross-feature UI with a barrel (EmptyComponent)
│   ├── ui/            # Alert, ErrorFallback, Loading
│   └── skeletons.ts   # Barrel re-exporting every block skeleton
├── config/
│   ├── constants/     # APP_VERSION, FONTS
│   └── languages/     # es.json, en.json
├── context/           # Global providers (BootstrapContext)
├── features/          # ← ONE FOLDER PER BUSINESS DOMAIN
│   ├── home/  menu/  privacy/  reservation/  notfound/
├── hooks/             # Cross-cutting hooks (usePageData, useTranslations, useGetBootstrap, useTabGestures)
├── navigation/        # Root, tabs, stacks, ROUTES map, types.ts (ParamList + navigateToRoute)
├── services/          # axios instance + cross-cutting services (bootstrap/, pages/, cache/)
├── store/             # zustand
├── theme/             # colors.ts, styles.ts, ThemeContext.tsx
├── types/             # Global types / CMS contract
└── ui/                # Visual primitives with no business logic (icons, shared)

__tests__/             # Test suite mirroring src/ (see §13)
```

### Golden rule for placement

- Does it carry business meaning (home, menu, reservations, privacy)? → `src/features/<domain>/`
- Is it reusable and **free of** business meaning? → `src/components/`, `src/ui/`, `src/hooks/`, `src/theme/`
- Does it render a CMS `blockType`? → `src/components/blocks/<blockType>/`

**Never** create new top-level folders inside `src/` without asking.
**Never** create empty placeholder folders.

### Internal structure of a feature

```
src/features/<domain>/
├── screens/<screen_name>/index.tsx   # screen component
│                        └ styles.ts  # only when styles depend on `colors`
├── components/            # UI exclusive to this feature + index.ts (barrel)
│   ├── <Domain>Empty.tsx      # empty state
│   └── <Domain>Skeleton.tsx   # full-screen loading composition
├── hooks/use<Something>/index.ts
├── services/index.ts      # domain service class
├── types/<domain>.types.ts
└── index.ts               # public barrel for the feature (optional but preferred)
```

Only create the subfolders the feature actually uses.

---

## 3. Naming and file conventions

| Element | Convention | Real example |
|---|---|---|
| Feature folder | `camelCase` / lowercase | `features/home`, `features/notfound` |
| Screen folder | `snake_case` or lowercase | `screens/home`, `screens/privacy_policy` |
| CMS block folder | `camelCase` = the `blockType` value | `blocks/cardGrid`, `blocks/promoRail` |
| Main component | `index.tsx` inside its own folder | `blocks/hero/index.tsx` |
| Block skeleton | `skeleton.tsx` next to its `index.tsx` | `blocks/cardGrid/skeleton.tsx` |
| Feature skeleton | `<Domain>Skeleton.tsx` in `components/` | `features/home/components/HomeSkeleton.tsx` |
| Standalone component | `PascalCase.tsx` | `components/ui/ErrorFallback.tsx` |
| Hook | folder `use<Name>/index.ts` | `hooks/usePageData/index.ts` |
| Feature service | `services/index.ts` with class `<Domain>Service` | `HomeService`, `MenuService` |
| Cross-cutting service | `services/<domain>/<domain>.service.ts` | `bootstrap/bootstrap.service.ts`, `pages/pages.service.ts` |
| Types | `<domain>.types.ts` | `types/page.types.ts`, `services/pages/pages.types.ts` |
| Barrel | `index.ts` (never `.tsx`) | `features/home/components/index.ts` |
| Test | mirrors the `src/` path under `__tests__/` | `__tests__/features/home/screens/home/index.test.tsx` |

Default export for components, screens, hooks, and services.
Named exports for types, constants, and utilities (`export const ROUTES`, `export interface ...`).
Some shared components export **both** (e.g. `ErrorFallback`, `EmptyComponent`): prefer the named import in new code, matching what the screens already do.

---

## 4. Imports

**Always** use the path aliases. They are declared in **three** places — `tsconfig.json`, `babel.config.cjs`, and the `moduleNameMapper` of `jest.config.cjs`. Adding a new alias means editing all three.

```
@/*  @services/*  @/features/*  @components/*  @config/*  @hooks/*
@utils/*  @types/*  @assets/*  @styles/*  @navigation/*  @screens/*
@models/*  @store/*  @context/*
```

- ✅ `import { useThemeColors } from '@/theme/colors';`
- ❌ `import { useThemeColors } from '../../../theme/colors';` (legacy code does this; **do not replicate it**, and fix it whenever you touch such a file)

Import order in every file — **groups separated by one blank line**, alphabetical by module inside each group. This is what `node organize-imports.js ./src` produces and what the codebase follows:

1. `react` / `react-native` (and `react-*` packages)
2. Scoped external packages (`@react-navigation/*`, `@testing-library/*`, `@react-native-*/*`)
3. Project aliases (`@/...`, `@services/...`, `@components/...`)
4. Everything else: unscoped packages (`react-query`, `axios`, `zustand`) and relative imports (`../../components`)

`no-duplicate-imports` is enforced. A feature **must not** import another feature's internal files — only its barrel `index.ts`.
`sort-imports` and `import/order` are **off** in ESLint (incompatible with ESLint 10); ordering is kept by `organize-imports.js`, run manually.

---

## 5. How a component is written

Required pattern (taken from `blocks/cardGrid/index.tsx` and `blocks/hero/index.tsx`):

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/theme/colors';
import { getRadius, getSpacing, SPACING, TYPOGRAPHY } from '@/theme/styles';
import { CardGridBlock } from '@/types/page.types';

interface CardGridProps {
  block: CardGridBlock;
}

const CardGrid: React.FC<CardGridProps> = ({ block }) => {
  const colors = useThemeColors();      // 1. hooks first
  const radius = getRadius();
  const spacing = getSpacing();

  const { cards, eyebrow, title } = block;   // 2. destructure props/data

  return (                               // 3. JSX
    <View style={[styles.container, { paddingHorizontal: SPACING.xl }]}>
      <Text style={[styles.title, TYPOGRAPHY.h2, { color: colors.textPrimary }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({       // 4. static styles at the end
  container: { gap: SPACING.md },
  title: { marginBottom: SPACING.lg },
});

export default CardGrid;                 // 5. default export
```

Hard rules:

- **Function component + `React.FC<Props>`**. No classes. Screens may instead be typed `(): React.ReactElement`, which is what all current screens do.
- The props interface is named `<Component>Props` and declared directly above.
- **Never hardcode colors** → use `useThemeColors()`. Never hardcode spacing, radii, or typography → use `SPACING`, `getRadius()`, `getSpacing()`, `TYPOGRAPHY`.
- **Structural** styles (layout, sizes) go in `StyleSheet.create`; **theme-dependent** styles go inline in the style array: `style={[styles.x, { color: colors.y }]}`.
- If styles depend entirely on `colors`, extract them to `styles.ts` with a `createXStyles(colors)` factory (see `features/notfound/screens/notfound/styles.ts`). Do not declare `StyleSheet.create` inside the component body.
- **All visible text comes from `useTranslation()` or the CMS.** No literal strings in the UI.
- Every CMS block that loads asynchronously needs a sibling `skeleton.tsx`, built with `@/ui/shared/skeleton`, **and** an entry in `src/components/skeletons.ts`.
- Max 300 lines per file (`max-lines` is a warning). Past that, extract subcomponents.

---

## 6. CMS blocks (the heart of the app)

The app is a **renderer** for the CMS contract. To add support for a new `blockType`:

1. Create `src/components/blocks/<blockType>/index.tsx` (+ `skeleton.tsx` if applicable).
2. Add the `<Name>Block` interface to `src/types/page.types.ts` and include it in the `LayoutBlock` union.
3. Register it in the `switch` inside `src/components/blocks/BlockRenderer.tsx`.
4. Export it from `src/components/blocks/index.ts` (and its skeleton from `src/components/skeletons.ts`).
5. Add its test under `__tests__/components/blocks/<blockType>/`.

Rules:

- `BlockRenderer` guards a null/undefined block (`console.warn` + `<View />`) **and** keeps the `default` branch that does the same. An unknown `blockType` must never break the screen.
- Its props are `{ block, onNavigate }`; `onNavigate` is **required**. Blocks with actions receive it as `onPress`. **A block never calls `useNavigation` directly.**
- The UI is driven by `blockType` and the fields received — **never** by array position or hardcoded copy.
- Every optional CMS field is rendered behind a guard: `{eyebrow && <Text>...</Text>}`, `{image?.url ? ... : null}`.

Currently implemented and typed in `LayoutBlock`:
`restaurantHero` (→ `Hero`), `cardGrid`, `carousel`, `promoRail`, `textBlock`, `restaurantCTA`, `imageBlock`.

Contract block types the renderer must tolerate without crashing (not implemented — they fall into `default`):
`cta, content, mediaBlock, archive, formBlock`.

---

## 7. Data layer

### 7.1 HTTP instance

Exactly one, in `src/services/index.ts`: CMS `baseURL`, 10s timeout, request/response interceptors that normalize errors into `{ error, errors }`. Do not create new axios instances and do not use `fetch`.

### 7.2 Services

A class with a `baseUrl` and arrow methods that return `response.data`. No UI logic, no state, no React.

```ts
import { api } from '@services/index';
import { ApiRequest } from '@/types/types';

class HomeService {
  baseUrl = '/pages/home';

  getHomeService = async (request: ApiRequest) => {
    const response = await api.get(this.baseUrl, { params: request });
    return response.data;
  };
}

export default HomeService;
```

A generic `PagesService` (`src/services/pages/pages.service.ts`, `getDataByPage({ slug, ... })`) exists for any page fetched by slug. Prefer it over creating a near-identical per-feature service when the only difference is the slug.

### 7.3 Data hooks

One hook per domain at `features/<domain>/hooks/use<Domain>Data/index.ts`. Instantiate the service **outside** the hook (at module level), wrap `usePageData`, and always return the same shape:

```ts
return { data, isLoading, isError, error, refetch, isRefetching };
```

`usePageData` (`src/hooks/usePageData`) centralizes `useQuery` and adjusts `staleTime`/`cacheTime` from the cached `data.nextChangeAt` (defaults 5 min / 10 min, `retry: 2`, `retryDelay: 1000`). **Screens never call `useQuery` or a service directly.**

### 7.4 Request context

The four parameters `platform`, `market`, `audience`, `appVersion` are assembled in the data hook (`Platform.OS` + `APP_VERSION` from `@config/constants`). Never write them inside a presentation component.

### 7.5 Bootstrap

`BootstrapProvider` (`src/context/BootstrapContext.tsx`) runs a single global query, consumed via `useBootstrap()` (`@/hooks/useGetBootstrap`). Configuration, navigation, flags, alerts, and promotions all come from there. Do not duplicate that call.

### 7.6 Offline persistence

`src/services/cache/persister.ts` persists only the **critical** queries (`bootstrap`, `home`, `menu`) into AsyncStorage under `@casamaiz/query-cache`, with a 7-day max age and shape validation on restore.

- `App.tsx` restores the cache **before** rendering the tree (`isInitialized` gate, `CasaMaizLoadingScreen` meanwhile) and re-hydrates with `client.setQueryData(key, data, { updatedAt })`.
- `PersistenceManager` writes the cache back on `AppState` `background` / `inactive`.
- To make a new query survive restarts, add its key to `CRITICAL_PAGES`. Do not persist everything.

---

## 8. Screens

Every screen that consumes the CMS follows this exact sequence (see `features/home/screens/home/index.tsx` and `features/menu/screens/menu/index.tsx`):

```
1. hooks (useNavigation<RootNavigationProp>, use<Domain>Data, useTranslation)
2. handlers (handleRefresh → refetch, handleNavigation → navigateToRoute)
3. if (isError && !data) → <Container> + <ErrorFallback ... onRetry={refetch} />
4. normal render → <Container>
     <Loading isLoading={isLoading && !isRefetching} component={<XSkeleton />}>
       <FlatList
         data={data?.data?.layout}
         ListEmptyComponent={<XEmpty onRetry={handleRefresh} />}
         refreshControl={<RefreshControl refreshing={isRefetching} ... />}
         renderItem={({ item }) => <BlockRenderer block={item} onNavigate={handleNavigation} />}
         keyExtractor={(item) => item.id}
       />
     </Loading>
```

- Always wrap in `<Container>` (`@/ui/shared/container`), which applies SafeArea + theme background.
- The loading state is rendered through `<Loading>` (`@/ui/shared/loading`, a plain `isLoading ? component : children` switch), never with an ad-hoc ternary in the screen body.
- `<ErrorFallback>` takes **i18n keys**, not strings: `titleKey`, `messageKey`, `retryLabelKey`, plus `error`, `onRetry`, `showDetails`.
- Lists are always `FlatList` (never `.map()` inside a `ScrollView` for CMS content).
- The four mandatory states: **loading (skeleton), empty, error with retry, pull-to-refresh**. Do not ship a screen without all four.
- `<X>Empty` and `<X>Skeleton` components live in `features/<domain>/components/` and are exported from its barrel.

---

## 9. Navigation

- `App.tsx` mounts the provider tree in this order, and it **does not change without a reason**:
  `SafeAreaProvider → ThemeProvider → QueryClientProvider → PersistenceManager → BootstrapProvider → NavigationContainer → Navigation`
  (all of it behind the `isInitialized` gate described in §7.6).
- `src/navigation/index.tsx` = root stack (`Tabs` + `NotFoundStack`) and exports the `ROUTES` map (`as const`) plus `RoutePath` and `RouteValue`.
- `src/navigation/types.ts` holds `RootStackParamList`, `RootNavigationProp` and the `navigateToRoute(navigation, route)` helper. Screens type their hook as `useNavigation<RootNavigationProp>()` and navigate **only** through that helper.
- Each stack lives at `src/navigation/stacks/<name>.tsx`, exports `export const <NAME>_STACK = '<Name>Stack'` plus the navigator as default.
- Tabs are built dynamically in `src/navigation/tabs/index.tsx` by filtering the `tabs` object against `bootstrap.data.navigation.items[].destination.key`. **To add a tab: add its entry to the `tabs` object and its stack; the CMS decides whether it appears.**
- Horizontal swipe between tabs comes from `@/hooks/useTabGestures` (PanResponder). Reuse it instead of adding new gesture handling.
- Navigation triggered by CMS content **always** goes through `ROUTES[path]`, guarded by `if (path in ROUTES)`. An unsupported destination must fall back to `NOT_FOUND_STACK`, never crash.
- Stacks import screens from `@/features/<domain>/...`. Navigation contains no business logic.

---

## 10. Theme, styling, and i18n

- Palette: `src/theme/colors.ts` (`COLORS.light` / `COLORS.dark`, identical keys in both) + the `withOpacity(color, opacity)` helper.
- Tokens: `src/theme/styles.ts` → `SPACING`, `RADIUS`, `TYPOGRAPHY`, `getShadow()`, `getRadius()`, `getSpacing()`.
- Fonts: only through `FONTS` from `@config/constants` (Poppins).
- **Two `useThemeColors` still coexist** — see §14. `@/theme/ThemeContext` is the correct one (it respects the provider's `themeMode`); `@/theme/colors` only reads `useColorScheme` and is what most of the codebase currently imports. In new code use `ThemeContext`, and migrate a file's import whenever you touch it.
- `@/theme/colors` also exports `useTheme()` (`{ colors, isDark, isLight, colorScheme }`), used by `EmptyComponent`. Same caveat applies.
- Every screen and component must look right in **both light and dark**. Never a literal color except for deliberate overlays.
- i18n: add the key to **`es.json` and `en.json` together**, with the same nested structure, and consume it via `t('group.key')`. A missing key makes `t` return the key itself (it never crashes). Ignore the `*.json.backup` files (§14).
- User language and theme live in zustand (`useAppStore`: `theme`, `language`, `languages`, `setTheme`, `setLanguage`). Zustand is **only** for UI preferences, never for CMS data.

---

## 11. TypeScript

- `strict`, `noUnusedLocals`, `noUnusedParameters`, and `noImplicitReturns` are on: leave no unused variables or imports, and no branch without a `return`.
- **`yarn typecheck` currently passes with zero errors. Keep it that way** — a change that introduces a type error is not done.
- `@typescript-eslint/no-explicit-any` is a warning: avoid `any`. When unavoidable, comment why.
- CMS contract types live in `src/types/page.types.ts` and `src/types/bootstrap.types.ts`; `ApiRequest` lives in `src/types/types.ts`.
- A new block is typed and added to the `LayoutBlock` union **before** its component is written.
- Forward compatibility: unknown CMS fields are ignored, optional fields are marked `?` and guarded at render time.

---

## 12. Lint, formatting, and commits

- Prettier: 2 spaces, single quotes, `semi: true`, `trailingComma: 'all'`, `printWidth: 80`, `arrowParens: 'always'`, `endOfLine: 'lf'`, `quoteProps: 'as-needed'`.
- ESLint is a **flat config** in `eslint.config.js` (ESLint 10). `prettier/prettier` runs as an **error**, so formatting violations fail the lint.
- Errors (non-negotiable): `eqeqeq`, `curly` everywhere, `prefer-const`, `no-var`, `prefer-arrow-callback`, `no-duplicate-imports`, `no-else-return`, `no-debugger`, `no-empty`, `no-eval`, `no-implied-eval`, `no-new-func`, `no-trailing-spaces`, `no-multiple-empty-lines` (max 1), `arrow-spacing`, `keyword-spacing`, `no-multi-spaces`.
- Warnings: `no-console` (only `warn`/`error`/`info` allowed), `no-nested-ternary`, `max-depth 4`, `max-nested-callbacks 3`, `max-lines 300`, `complexity 15`, `@typescript-eslint/no-unused-vars` (`_` prefix is ignored), `@typescript-eslint/no-explicit-any`.
- Commands: `yarn typecheck`, `yarn lint`, `yarn test`, `yarn test:coverage`. Import ordering: `node organize-imports.js ./src`.
- Before calling any change done: run `yarn typecheck` **and** `yarn lint`, and `yarn test` when you touched anything with tests. The husky `pre-commit` hook runs `npm run typecheck` only and blocks the commit on failure — lint and tests are on you.
- Commit messages follow the existing format: `feat: ...`, `fix: ...`, `style: ...`, `chore: ...`, `test: ...` with the description in English.

---

## 13. Testing

- Config: `jest.config.cjs` over `@react-native/jest-preset`. Tests live in `__tests__/` and **mirror the `src/` path**: `src/features/home/screens/home/index.tsx` → `__tests__/features/home/screens/home/index.test.tsx`.
- Shared test material: `__tests__/fixtures/` (blocks, page, bootstrap, image), `__tests__/__mocks__/` (api, services, navigation, handlers, bootstrap), `__tests__/utils/render.tsx` (render with providers) and `__tests__/utils/queryClient.ts`. Use them instead of building new mocks by hand.
- Setup: `__tests__/setup/jest.setup.js` + `__tests__/setup/setupAfterEnv.tsx`. Aliases are resolved by `moduleNameMapper` — a new alias must be added there too (§4).
- When adding a component, screen, hook, or service, add its test at the mirrored path.
- `example.tsx` and `glasscomponents.tsx` are excluded from coverage; do not extend them.

---

## 14. How to work with me (Claude)

1. **Read before writing.** Find the equivalent existing pattern and copy it; do not invent a new style.
2. **Placement first.** Decide where the file goes per §2 and §3 before writing any code.
3. **Minimal changes.** Do not refactor files outside the task unless asked. Exception: if you touch a file with a deep relative import, switch it to an alias.
4. **No extra files.** No READMEs, docs, or tests that were not requested — except the mirrored test for code you add (§13).
5. **No `.md` files.** Do not create or modify `.md` files for changes I make to the codebase. Documentation updates are not your responsibility unless explicitly requested.
6. **No hardcoded content.** All text = CMS or i18n. All colors/spacing = theme tokens.
7. **Close the loop.** Every new screen: loading + empty + error + refresh. Every new block: type + component + `BlockRenderer` registration + barrel + skeleton (+ `skeletons.ts` entry).
8. **Verify.** Run `yarn typecheck` and `yarn lint` when done and report the result. If pre-existing errors remain, say so explicitly instead of silencing them.
9. **Ask** when the task involves: a new dependency, a new alias, changing the provider order, replacing react-query with something else, changing what gets persisted offline, or creating a top-level folder under `src/`.

---

## 15. Known technical debt (do not replicate; fix when touched)

**Resolved** since the previous revision — `yarn typecheck` is now clean: the `@/components/blocks/skeletons` barrel exists (`src/components/skeletons.ts`), `EmptyComponent` exists at `src/components/shared/EmptyComponent.tsx` (note: `components/shared/`, not `components/ui/`), `restaurantCTA/skeleton.tsx` uses `@/ui/shared/skeleton`, each feature barrel exports only its own components, `ROUTES` is typed (`as const` + `RoutePath`/`RouteValue`), `navigation/types.ts` exists with the ParamList and `navigateToRoute`, and offline persistence is implemented (§7.6).

Still open:

- `useThemeColors` is duplicated in `theme/colors.ts` and `theme/ThemeContext.tsx`. The `ThemeContext` one is correct, but **almost every component still imports the `colors.ts` one**, which reads `useColorScheme` and therefore ignores the provider's `themeMode` — the in-app theme toggle does not affect those components. Migrate file by file as you touch them; do not delete `colors.ts`'s version until the last import is gone (`COLORS`, `useTheme` and `withOpacity` stay).
- `features/privacy` and `features/reservation` still use local/placeholder state (`useState([])` + a fake `setTimeout` refresh) instead of the CMS. Privacy should consume `/legal/privacy_policy` through a data hook + `usePageData`; reservation has its own local `Reservation` type that is not part of the CMS contract.
- `features/notfound/services/index.ts` is an **empty file**.
- Some deep relative imports survive: `ui/shared/skeleton.tsx`, `components/blocks/cardGrid/skeleton.tsx`, `components/ui/ErrorFallback.tsx`, `components/ui/Alert.tsx` (`../../theme/colors`).
- `components/ui/index.ts` exports only `Alert`; `ErrorFallback` and `Loading` are imported by their full path.
- `yarn lint` currently reports 3 `prettier/prettier` errors (`__tests__/App.test.tsx`, `__tests__/navigation/stacks/reservation.test.tsx`, `src/navigation/stacks/reservation.tsx`) and 1 warning in `organize-imports.js`. Fix these when you touch those files.
- Orphan / junk files, do not use them as reference: `components/example.tsx`, `components/glasscomponents.tsx`, `src/styles/theme.css`, `features/home/types/home.types.ts` (duplicates `types/page.types.ts`), `src/config/languages/es.json.backup` and `en.json.backup`.
- Contract block types `cta`, `content`, `mediaBlock`, `archive`, `formBlock` are neither typed nor rendered — they currently hit the `default` branch of `BlockRenderer`.
