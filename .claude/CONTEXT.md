# Casa Maiz — CMS-Driven Restaurant App
## Project Context

## What this app is

Casa Maiz is a mobile application for iOS and Android, built with **React
Native CLI** and **TypeScript**, that presents a restaurant's experience
(home, menu, promotions, navigation, legal content) entirely driven by a
headless CMS. The app itself contains no hardcoded content — every label,
navigation destination, promotion, feature flag, alert, and page layout comes
from the CMS at runtime. The CMS is an external system that already exists;
the app only consumes it.

The core idea: the CMS is a **versioned content contract**, and the app is a
**renderer** for that contract. New content, new promotions, new navigation
items, or even new visual blocks can appear without a new app store release,
as long as they conform to the contract the app understands.

## The CMS (Payload) API

**Default base URL** (must be configurable, not hardcoded):
```
https://payload-cms-poc-seven.vercel.app
```

- Interactive docs: `/api/docs`
- OpenAPI 3.1 contract: `/api/openapi.json`
- Mobile content contract version: **1.1**
- Public mobile content root: `/api/content/v1`
- No authentication is required for the operations this app uses.

### Required request context

Every mobile content request must include four query parameters, built in
one central place (never repeated in screens or presentation components):

| Param | Value | Notes |
|---|---|---|
| `platform` | `ios` or `android` | Derived from `Platform.OS` |
| `market` | `MX` | Fixed for this app |
| `audience` | `guest` | Fixed for this app |
| `appVersion` | e.g. `1.0.0` | Installed app version, strict semver — `1` or `v1.0` are invalid |

Example:
```
GET /api/content/v1/pages/home?platform=ios&market=MX&audience=guest&appVersion=1.0.0
```

### Response envelope

```json
{
  "contractVersion": "1.1",
  "data": {},
  "nextChangeAt": "optional ISO date-time",
  "preview": false,
  "resolvedContext": {
    "appVersion": "1.0.0",
    "authenticationState": "guest",
    "market": "MX",
    "now": "ISO date-time",
    "platform": "ios"
  }
}
```

The app verifies `contractVersion` is a supported `1.1` before trusting
`data`. Unknown top-level fields are tolerated (forward compatibility);
missing or incompatible contract versions fail safely with a useful state
rather than a crash.

### Endpoints the app consumes

1. **Bootstrap** — `GET /api/content/v1/bootstrap`
   One cacheable request returning active alerts, experience configuration,
   feature flags, CMS-driven navigation, operational controls, and home
   promotions. This is application configuration, not debug output.

2. **Pages** — `GET /api/content/v1/pages/{slug}`
   Supported slugs: `home`, `menu`. The server already removes blocks that
   don't match the requesting platform, audience, version, or visibility
   window — the app renders whatever comes back.

3. **Legal content** — `GET /api/content/v1/legal/{key}`
   `privacy_policy` powers the Privacy screen.

4. **Form submissions** — `POST /api/form-submissions`
   ```json
   {
     "form": "Payload form document ID from formBlock",
     "submissionData": [{ "field": "fieldName", "value": "string or boolean" }]
   }
   ```
   Returns `201` on success.

5. **Media** — `GET /api/media/file/{filename}`
   Media objects may contain either absolute CDN URLs or relative Payload
   paths, and the app must resolve both correctly.

### Errors

The API documents `400`, `401`, `403`, `404`, and `500` responses, using
either a top-level `error` string or an `errors` array. The app shows
user-safe, actionable messages while keeping technical detail available for
debugging — raw server internals are never surfaced in the UI.

## CMS-driven page rendering

Home and Menu are rendered from each page's `data.layout` array, using a
block registry / component map so that adding a new documented block never
requires rewriting a screen.

Blocks currently returned by the live API:

- **Home:** `cardGrid`, `carousel`, `promoRail`, `textBlock`, `restaurantCTA`
- **Menu:** `textBlock`, `cardGrid`, `restaurantCTA`, `promoRail`, `imageBlock`

Full block union declared by the OpenAPI contract (the renderer must not
crash on any of these, even ones not currently returned):

`restaurantHero`, `carousel`, `cardGrid`, `restaurantCTA`, `promoRail`,
`textBlock`, `imageBlock`, `cta`, `content`, `mediaBlock`, `archive`,
`formBlock`

The UI is driven by `blockType` and the fields returned — never by position
or hardcoded copy. Unknown, incomplete, or future block types render a safe
fallback instead of crashing.

## Bootstrap-driven application behavior

`/bootstrap` configures live application behavior, including:

- CMS-controlled navigation
- Home promotions
- Feature flags that change visible UI or navigation
- Operational notices / maintenance behavior
- Recommended or required app-update presentation
- Active alerts, respecting placement, trigger, dismissible state, actions,
  and page targeting

All of this is editorial content that can change at any time — labels and
messages are never hardcoded. Optional bootstrap fields may be null or
empty; missing optional configuration must never make the app unusable.

## Navigation

Native navigation is built from `bootstrap.navigation`, routed through a
single centralized resolver (CMS actions and destinations never navigate
directly from screen code).

Current destinations:

| Destination | Path |
|---|---|
| Home | `/` |
| Menu | `/menu` |
| Reservations | `/reservas` |
| Privacy | `/legal/privacy_policy` |

- Home, Menu, and Privacy are fully functional; Privacy loads its content
  from `/legal/privacy_policy`.
- Reservations uses a local placeholder screen (no reservation transaction
  API exists).
- Unsupported internal destinations fail safely.
- External URLs are validated before being opened.
- Native back behavior follows each platform's own conventions.

## Content variability and resilience

Media objects may contain absolute CDN URLs, relative Payload paths,
multiple responsive sizes, dimensions, and alt text — the app picks an
appropriate source, preserves aspect ratio, avoids layout shift, and surfaces
alt text where relevant. Long strings, missing optional images, empty
arrays, and general content drift are all expected and must not break the
UI.

The app maintains deliberate states for:

- Initial loading
- Empty content
- Recoverable network error, with retry
- Pull-to-refresh
- Offline / stale content
- Unsupported content contract
- Page not found

The last successful content response is persisted locally as a read-only
fallback when offline. When `nextChangeAt` is present, cached *targeted*
content is not used past that boundary, and staleness is surfaced to the
user without blocking access to content that's still valid. If nothing has
ever loaded successfully and no cache exists, the app shows a useful retry
state rather than an empty screen.

## Platform-aware experience

The app is expected to feel native on each platform, respecting: safe areas,
iOS navigation/back gestures, Android system back behavior, adequate touch
targets, dynamic text / large font settings, dark mode, reduced motion,
small screens, and keyboard avoidance in forms. A shared component system
underlies both platforms, with platform-specific differences where they
genuinely improve the experience — iOS conventions are not forced onto
Android and vice versa.

## Architecture boundaries

The codebase separates clearly:

- **API transport** — HTTP calls to the CMS
- **Runtime content validation & TypeScript models** — typing and validating
  what the CMS returns
- **Cache / repository layer** — persistence and fallback content
- **Application state**
- **Navigation and destination resolution**
- **CMS block rendering** — the registry/component-map pattern
- **Platform-specific presentation**

Network work runs off the render path, lists and horizontal rails are
virtualized where appropriate, and image loading avoids repeated large
downloads.