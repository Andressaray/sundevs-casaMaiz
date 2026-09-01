# Known Limitations & What I'd Improve

A few honest notes on where this stands right now and what I'd tackle next if I had more time.

## What's not there yet

- **No offline detection.** If the connection drops, the app just shows a generic error or quietly serves stale cached data with no indication it's stale. I'd add NetInfo and a simple "you're offline, showing older content" banner.
- **CMS responses aren't validated at runtime.** The TypeScript types only help at compile time — a malformed or missing field from the CMS can slip through and blank out a screen. I'd add per-block validation (Zod or similar) so one bad block doesn't take the whole page down with it.
- **Privacy and Reservations are placeholders.** They look finished but aren't actually calling the real endpoints yet, and the reservation button doesn't do anything.
- **A few CMS block types aren't built** (forms, CTAs, media blocks), so content published using them just silently doesn't show up.
- **Theming is inconsistent.** There are two separate theme hooks in the code and most components ended up using the wrong one, so toggling dark/light mode doesn't actually affect most of the UI.
- **No CI and no crash reporting.** Tests exist and pass locally, but nothing enforces them automatically, and if something breaks for a real user I'd have no way of knowing.
- **Accessibility is thin.** Images are missing alt text, some touch targets are too small, and there's no reduced-motion support for animations.
- **A few performance shortcuts.** Carousels use a plain ScrollView instead of a virtualized list, and images aren't cached or lazy-loaded, so long lists and repeat scrolling are heavier than they should be.

## What I'd do with more time

1. Add runtime validation for CMS data so a bad response can't take a screen down.
2. Finish wiring Privacy and Reservations to their real endpoints.
3. Fix the offline experience — detect connectivity and be upfront about stale content.
4. Clean up the theming bug so dark/light mode actually works everywhere.
5. Set up CI and basic error tracking so issues don't go unnoticed.
6. Do an accessibility pass and fix the obvious performance gaps.

None of this blocks reviewing the app as-is — it's the stuff I'd naturally pick up in the next sprint or two.
