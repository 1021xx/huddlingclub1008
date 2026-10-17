# Halloween edition

Only theme-copy is changed. Original page flows and demo-only storage behavior are preserved.

## Local image
- public/halloween/pumpkin.jpg — Sergio Zhukov, Unsplash.
- Source: https://unsplash.com/photos/a-scary-pumpkin-with-smoke-coming-out-of-it-RzqbigPf3ZQ
- License: https://unsplash.com/license (free commercial/non-commercial use; no unmodified resale or competing image collection).
- Downloaded at 1200px, displayed locally through next/image.

## Effects and characters
- Reverse border beam: https://uithing.com/goodies/border-beam#reverse — independently implemented with CSS offset-path for React; Vue code is not copied.
- Confetti: https://uithing.com/goodies/confetti — uses the recommended canvas-confetti package, ISC license retained in node_modules/canvas-confetti/LICENSE. Triggered on publish and RSVP completion, with cleanup and reduced-motion support.
- Characters: https://libraries.dev/bots — bot-avatars package, MIT license retained in node_modules/bot-avatars/LICENSE. Purple ghost and orange party-hat cat. Respects reduced motion via the library.

## Preview
npm run dev (port 3001)
- /i/demo: invitation + RSVP
- /create: create + preview + completion
- /i/demo/responses: response summary
- /i/empty/responses: empty state

No persistence/backend was added; creation links still show the sample invitation, as disclosed in the UI.
