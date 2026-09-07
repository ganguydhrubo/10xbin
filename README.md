# 10xbin cinematic revenue interface

The current deliverable is a self-contained `dist/index.html`: compiled Tailwind CSS, custom cinematic styling, native JavaScript, three generated campaign images, and embedded Space Grotesk / JetBrains Mono fonts. It opens without an internet connection. No runtime framework or CDN is required.

Run `npm install`, then `npm run build`. Run `npm run dev` for the local preview at http://127.0.0.1:3000.

`index.html` is the editable source. `build-cinematic.mjs` compiles Tailwind and embeds required assets. Original PNG campaign images and font files are in `assets/`. Generation prompts are in `campaign-prompts.md`.

The earlier Next.js implementation is preserved under `src/` and can be built with `npm run build:next`. It is not the current deployed experience.

## Behavior and limitations

- Blueprint nodes support mouse, touch, Enter and Space.
- The INR console uses an explicitly illustrative exponential decay model, with editable lead cost, close rate, and contribution per sale. The supplied 38% tracking figure is not used in the model. Neither the figures nor the response target are independently verified benchmarks.
- Consultation submission creates a local JSON brief. It does not book an appointment or transmit personal data. A booking service/backend must be connected for real delivery.
- Motion follows `prefers-reduced-motion`; links and native inputs support keyboard access.
- No live ads, WhatsApp, voice, CRM, payment, or banking integration is connected.
- A feature-detected WebMCP scenario tool uses the same calculator. Its registration contract is checked with a mocked context; no supported live browser WebMCP context was available for verification.
- Campaign artwork was generated using the built-in image-generation tool. The single-file artifact embeds the images for portability, which increases its download size.

## Validation

Run `npm run check` to check the actual inline JavaScript for syntax and exercise model boundaries, invalid inputs, blueprint updates, local brief creation, and the WebMCP registration contract. This is not visual browser QA.
