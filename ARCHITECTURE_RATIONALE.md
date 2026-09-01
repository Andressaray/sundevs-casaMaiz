# CasaMaiz App Architecture: CMS-Driven Design Rationale

## Executive Summary

CasaMaiz is built using a **CMS-driven, content-as-contract architecture**. This design separates the mobile application (a read-only renderer) from all editorial content, enabling rapid content updates, A/B testing, feature releases, and platform-specific experiences without requiring App Store deployments. The CMS (Payload) acts as a versioned content contract, and the app consumes and renders that contract reliably.

---

## What This Architecture Is

### Core Concept
The application is a **renderer**, not a content container. The CMS is a **versioned content contract**. Every piece of user-facing content—navigation items, labels, promotions, feature flags, legal text, page layouts, and even UI blocks—comes from the CMS at runtime. The app contains zero hardcoded content.

### Key Design Pattern: Block Registry
Content is delivered as structured blocks (`cardGrid`, `carousel`, `promoRail`, `textBlock`, `restaurantCTA`, `formBlock`, etc.) with a centralized component registry that maps block types to React Native components. New block types can be added to the CMS and rendered without code changes, as long as they conform to the OpenAPI contract the app understands.

---

## Technical Reasons for This Architecture

### 1. **Decoupling Content from Code**
- **Problem it solves:** In traditional mobile apps, every content change requires rebuilding, testing, and resubmitting to app stores (14+ days approval time on iOS).
- **Solution:** Content lives in the CMS. App updates only when code changes, not when copy or layouts change.
- **Impact:** Editorial teams can update home promotions, navigation structure, or legal text in minutes instead of weeks.

### 2. **Forward Compatibility & Versioning**
- **Problem it solves:** As an app evolves, the backend might support new fields or block types, but old app versions are still in use. Sending incompatible responses breaks old clients.
- **Solution:** The API response includes a `contractVersion` field (`1.1`). The app verifies it understands this version before trusting the data. Unknown top-level fields are tolerated; missing fields default gracefully. The CMS can evolve while old apps remain functional.
- **Impact:** No forced upgrades; old and new versions coexist peacefully.

### 3. **Platform-Specific Content Without Duplicate Servers**
- **Problem it solves:** iOS and Android often need different layouts, copy, or visual treatments due to platform conventions. Maintaining separate content for each is expensive and error-prone.
- **Solution:** The request includes `platform: ios|android`. The CMS returns only blocks and content that match the requesting platform—the app receives what it can render.
- **Impact:** One CMS, one content model, automatically platform-aware.

### 4. **Feature Flags Without Code Deployment**
- **Problem it solves:** Rolling out a new feature safely requires A/B testing, gradual rollout, or ability to kill a feature if it breaks. Traditional approaches require code changes and app recompilation.
- **Solution:** Bootstrap includes feature flags. Toggle them in the CMS; the app reads them at startup and adapts its UI and behavior.
- **Impact:** Release new features, test them live, and disable them instantly without touching code.

### 5. **Smart Caching & Offline Resilience**
- **Problem it solves:** Mobile networks are unreliable. Downloaded content can be stale, but the app still needs to work.
- **Solution:** The last successful response is cached locally. If `nextChangeAt` is present, the app knows when cached content expires. Offline or network errors show a retry state, not a crash or blank screen.
- **Impact:** Users can browse cached content offline. Network failures are graceful.

### 6. **Content Validation at Runtime**
- **Problem it solves:** Bad data from a CMS can crash an app or produce weird UI.
- **Solution:** The app uses TypeScript types and runtime validation to check every CMS response. Invalid or missing fields fail safely with a fallback, not a crash.
- **Impact:** CMS editors can make mistakes without breaking the app.

---

## Business Reasons for This Architecture

### 1. **Speed to Market for Content Changes**
- Restaurant promotions, seasonal menus, or operational notices can go live in minutes, not weeks.
- No app store submission delays for editorial changes.
- Editorial teams are not blocked by development cycles.

### 2. **A/B Testing & Analytics Without App Updates**
- Test different copy, layouts, or navigation structures on live users.
- Change test variants or kill underperforming ones in real time.
- Collect data on what works before committing to code.

### 3. **Single Backend for Multiple Platforms**
- One CMS serves iOS and Android with the same content model.
- Reduces duplicated editorial work.
- Ensures consistency across platforms (unless intentionally varied).

### 4. **Reduced App Store Friction**
- Fewer app updates mean fewer interruptions for users.
- Reduced app store review overhead (fewer submissions = faster time to production).
- Users are less fatigued by update prompts.

### 5. **Scalability Without Code Changes**
- Adding a new page, section, or content type doesn't require app rebuilds.
- CMS can introduce new block types; app will render them if they match the contract.
- Scale content library without scaling app deployment burden.

### 6. **Lower Cost of Ownership**
- Editorial changes don't need developer involvement.
- Reduced QA burden (most changes don't touch code).
- Faster iteration cycles = faster learning = better user experience.

---

## Specific Design Decisions & Their Rationale

### 1. **Request Context as Query Parameters**
```
GET /api/content/v1/pages/home?platform=ios&market=MX&audience=guest&appVersion=1.0.0
```
- **Why:** Context is centralized in one place, never hardcoded or scattered across screens.
- **Benefit:** The CMS knows exactly who is asking (platform, market, audience, app version) and can serve optimized content.
- **Prevents:** Bugs from inconsistent context passed to different endpoints.

### 2. **Response Envelope with Contract Version**
```json
{
  "contractVersion": "1.1",
  "data": {},
  "nextChangeAt": "optional ISO date-time",
  "resolvedContext": { ... }
}
```
- **Why:** The envelope tells the app whether it understands the response. `nextChangeAt` tells the app when to stop using cached data.
- **Benefit:** Graceful versioning; the app never crashes on unknown fields or incompatible responses.

### 3. **Block Registry Pattern**
- **Why:** New content types can be added to the CMS without touching app code.
- **Benefit:** Editorial team autonomy; developers focus on building block components once, then editors compose pages in the CMS.
- **Prevents:** Content type being limited by what's hardcoded in the app.

### 4. **Centralized Navigation Resolver**
- **Why:** Navigation logic is in one place; CMS actions and destinations never navigate directly.
- **Benefit:** Easy to add new destinations, change routes, or add preconditions (e.g., "show this menu item only if user is logged in").
- **Prevents:** Navigation logic scattered across screens; hard to refactor.

### 5. **Local Fallback Cache**
- **Why:** The last successful response is persisted as a read-only fallback.
- **Benefit:** If the network is down or the CMS is unreachable, users still see content (stale, but better than nothing).
- **Prevents:** App appearing broken or empty when network fails.

### 6. **Platform-Specific Content Filtering at the CMS**
- **Why:** The CMS already knows the platform, so it returns only relevant blocks.
- **Benefit:** The app doesn't need to filter or conditionally render platform-specific UI; it receives exactly what it can use.
- **Prevents:** Bloating the app bundle with content it will never use.

---

## Comparison: Why Not These Alternatives?

### Traditional Hardcoded Content
- ❌ Every change requires app update → weeks of delay.
- ❌ No A/B testing or feature flags without code.
- ❌ Scaling content becomes scaling code.
- ✅ Simple to understand initially.

### Single-Purpose Backend (API-First, No CMS)
- ❌ Requires a developer to add every content item; editorial team has no autonomy.
- ❌ Building pages is code; changing page layout is a code change.
- ❌ Harder to version and evolve without breaking clients.

### CMS Without Versioning or Contract
- ❌ Breaking changes in CMS can crash old app versions.
- ❌ No fallback strategy; app is always dependent on CMS being online.
- ❌ Forward compatibility breaks easily.

### CMS-Driven Without Block Registry
- ❌ Each new content type requires hardcoding a new screen or component.
- ❌ CMS is limited by what's in the app code.
- ❌ Adding features takes as long as traditional architecture.

---

## How This Architecture Enables Business Agility

### Scenario 1: Launch a New Promotion
**Traditional:** Hardcoded copy and design in app → develop → QA → submit to app store → wait 14 days for review → deploy.
**CasaMaiz:** Edit copy and design in CMS → publish → live on all devices in minutes.

### Scenario 2: Test a New Menu Layout
**Traditional:** Build in app → submit → wait → deploy → measure → if it failed, rebuild and repeat.
**CasaMaiz:** Create layout in CMS (same day) → measure on live users → if it works, keep it; if not, revert in minutes.

### Scenario 3: Fix a Typo in Legal Text
**Traditional:** Update code → QA → submit → wait → deploy.
**CasaMaiz:** Fix in CMS → publish → fixed in seconds.

### Scenario 4: Add a New Navigation Item
**Traditional:** Update app code → submit → wait → deploy.
**CasaMaiz:** Add to CMS navigation → publish → live immediately.

---

## Resilience & User Experience

### Network Resilience
- If the CMS is unreachable, the app shows cached content instead of a blank screen.
- Users see "last updated X hours ago" rather than an error.
- Retry is always available.

### Content Evolution Without Crashes
- Invalid block types render a safe fallback, not a crash.
- Missing optional fields use sensible defaults.
- The app is defensive; it doesn't assume perfection.

### Platform Parity
- iOS and Android users see the same content (unless intentionally varied by the CMS).
- No platform-specific bugs from duplicate content pipelines.

### Controlled Updates
- Old app versions can coexist with new ones because of versioning.
- No forced upgrades that frustrate users.

---

## Summary: Why This Architecture Wins

| Goal | Traditional | CMS-Driven |
|------|-----------|-----------|
| **Time to launch a promotion** | 14–30 days | Minutes |
| **A/B test a layout** | Weeks | Hours |
| **Update legal text** | Weeks | Seconds |
| **Add navigation item** | 1–2 days | Minutes |
| **Platform-specific content** | Duplicate work | One CMS, platform-aware |
| **Feature flags** | Code + deployment | CMS, no deployment |
| **Offline resilience** | Blank screen | Show cached content |
| **App store friction** | High (many updates) | Low (updates only for code) |
| **Content team autonomy** | Zero | Full |

---

## Conclusion

The **CMS-driven, content-as-contract architecture** is chosen because it:

1. **Decouples content from code**, enabling editorial agility.
2. **Versioning ensures forward compatibility**, so old and new app versions coexist.
3. **Reduces app store friction**, speeding up time-to-market.
4. **Enables A/B testing and feature flags** without code changes.
5. **Supports platform-specific experiences** from a single CMS.
6. **Provides resilience** with caching and graceful fallbacks.
7. **Empowers editorial teams** with autonomy and speed.

This is not just a technical decision; it's a **business decision** to enable rapid iteration, reduce time-to-market, and give the editorial team real-time control over the user experience.
