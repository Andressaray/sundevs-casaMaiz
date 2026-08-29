---
name: react-native-screaming-architecture
description: Scaffold, organize, or refactor a React Native (or Expo) project using Screaming Architecture, where the folder structure "screams" the app's business domains instead of its technical layers. Use this skill whenever the user asks to start a new React Native project, restructure an existing one, add a new feature/module, set up navigation, or mentions "screaming architecture", "feature-based structure", "src/features", "modular React Native", or "clean architecture for React Native". Also use it when the user asks where a new screen, hook, service, or navigator should live inside an existing React Native codebase. Always apply this skill's conventions instead of a generic by-type (components/, screens/, hooks/ at the root) structure unless the user explicitly asks for something else.
---

# React Native — Screaming Architecture

## What this is

Screaming Architecture (a term coined by Robert C. Martin) means the top-level
folder structure of a project immediately communicates *what the app does*
(its business domains), not *what framework it uses*. In a React Native
codebase this translates to organizing code by **feature/domain module**
instead of by technical type (no global `components/`, `screens/`, `hooks/`
dumping grounds at the root).

This skill defines the exact folder conventions to use, provides scaffolding
scripts, and includes reference templates for a feature module and for
navigation.

## Core folder structure

Everything lives under a single `src/` folder. The two pillars are
`src/features/` (business modules) and `src/navigation/` (wiring between
screens):

```
src/
├── app/                      # App entry, root providers, app-wide config
│   ├── App.tsx
│   └── providers/            # ThemeProvider, QueryClientProvider, StoreProvider, etc.
│
├── navigation/                # Everything related to routing/navigation
│   ├── RootNavigator.tsx      # Top-level navigator (decides Auth vs Main, etc.)
│   ├── types.ts               # RootStackParamList and shared navigation types
│   ├── linking.ts             # Deep-linking config (optional)
│   └── stacks/                # One navigator per area of the app
│       ├── AuthNavigator.tsx
│       ├── HomeNavigator.tsx
│       └── MainTabNavigator.tsx
│
├── features/                  # One folder per business domain — the "screaming" part
│   ├── auth/
│   │   ├── screens/           # LoginScreen.tsx, RegisterScreen.tsx...
│   │   ├── components/        # Components used only within this feature
│   │   ├── hooks/             # useLogin.ts, useAuthForm.ts...
│   │   ├── services/          # API calls / repositories for this domain
│   │   ├── store/             # Local state slice (Zustand/Redux slice/Context)
│   │   ├── types/             # Domain types & DTOs
│   │   ├── utils/             # Feature-only helpers
│   │   └── index.ts           # Public barrel export — the feature's "API"
│   │
│   ├── home/
│   │   └── ...                # same internal shape as auth/
│   │
│   └── profile/
│       └── ...
│
├── shared/                     # Cross-feature, reusable code (NOT business logic)
│   ├── components/            # Button, Card, Input, generic UI kit
│   ├── hooks/                 # useDebounce, useAppState, etc.
│   ├── services/              # apiClient.ts, storage.ts, http instance
│   ├── theme/                 # colors, typography, spacing tokens
│   ├── constants/
│   └── utils/
│
└── config/                     # Env vars, feature flags, app-wide constants
    └── env.ts
```

Key rule: **`shared/` holds framework/utility code with no business meaning.
`features/*` holds everything with business meaning.** If a hook, component,
or service only makes sense in the context of one domain, it belongs inside
that feature, not in `shared/`.

## Conventions inside a feature module

Every folder under `features/<name>/` follows the same internal shape shown
above (screens, components, hooks, services, store, types, utils). Not every
feature needs all of them — only create the sub-folders a feature actually
uses. Never create empty placeholder folders.

Each feature exposes a single **barrel file** at `features/<name>/index.ts`
that re-exports only what other parts of the app are allowed to import
(typically screens and, occasionally, a public hook or type). Other features
and `navigation/` should import from `features/<name>` — never reach into
`features/<name>/hooks/useSomethingInternal` directly. This keeps features
decoupled and makes the domain boundary explicit.

```ts
// src/features/auth/index.ts
export { LoginScreen } from './screens/LoginScreen';
export { RegisterScreen } from './screens/RegisterScreen';
export type { AuthUser } from './types';
```

## Conventions inside `navigation/`

- `RootNavigator.tsx` is the single entry point mounted by `App.tsx`. It
  decides top-level flow (e.g. authenticated vs. unauthenticated) and renders
  the appropriate stack from `navigation/stacks/`.
- One file per stack/tab navigator under `navigation/stacks/`, named after the
  area it navigates (`AuthNavigator.tsx`, `HomeNavigator.tsx`,
  `MainTabNavigator.tsx`). Each stack imports screens **only** from the
  corresponding feature's barrel file (`features/auth`, `features/home`...).
- `types.ts` centralizes all `ParamList` types (e.g. `AuthStackParamList`,
  `RootStackParamList`) so screens can safely type `useNavigation` /
  `useRoute` via declaration merging with `@react-navigation/native`.
- Navigation never contains business logic — it only wires screens together.

## When asked to scaffold a new project

1. Confirm the navigation library (React Navigation is the default/assumed
   unless the user says Expo Router or something else) and state management
   choice (Zustand, Redux Toolkit, Context, etc.) if not already specified —
   ask a single clarifying question if genuinely unclear, otherwise default to
   React Navigation + Zustand and say so.
2. Run `scripts/scaffold_project.sh <project-root>` to generate the base
   `src/` tree (app, navigation, shared, config) plus one example feature.
3. Walk the user through what was created and where their first feature's
   code should go.

## When asked to add a new feature/module

Run `scripts/scaffold_feature.sh <project-root> <feature-name> [sub-folders...]`.
Default sub-folders if none are given: `screens components hooks services types`.
Example:

```bash
bash scripts/scaffold_feature.sh . payments screens hooks services store types
```

This creates `src/features/payments/` with the requested sub-folders and a
starter `index.ts` barrel file.

## When asked to add a navigator

Add a new file under `navigation/stacks/`, following `references/navigation-template.md`,
and register it in `RootNavigator.tsx` (or the relevant parent
stack/tab navigator). Update `navigation/types.ts` with the new `ParamList`.

## Reference files

- `references/feature-template.md` — full worked example of a feature module
  (screens, hook, service, store, barrel file) to copy patterns from.
- `references/navigation-template.md` — full worked example of
  `RootNavigator.tsx`, a stack navigator, and `types.ts`.

Read the relevant reference file before writing feature or navigation code so
generated files match the exact patterns (import style, barrel exports,
typing) used across this skill.