# 10xbin — Campaign & Interface Handover

Delivered 6 September 2026. The current experience follows the revised cinematic revenue brief. The earlier Next.js cybernetic-core version is preserved separately.

## Website and downloads

| Deliverable | Link | Notes |
|---|---|---|
| Published website | [Open 10xbin](https://tenxbin-autonomous-core.teamnprepnc001.chatgpt.site) | Publishing confirmed successful. Owner-private access; not a public launch. |
| Standalone website | [index.html](./index.html) | Approximately 10 MB. Open directly in a browser. All three images, fonts, compiled Tailwind styles, and native JavaScript are embedded. |
| Current editable source | [10xbin-cinematic-source.zip](./10xbin-cinematic-source.zip) | Includes editable HTML, assets, build/preview scripts, validation script, README, and earlier Next.js source. |
| Earlier Next.js version | [10xbin-source.zip](./10xbin-source.zip) | Archived original six-section cybernetic-core implementation. Not the current published design. |
| Scene 01 — Revenue Monolith | [revenue-monolith.png](./campaign/revenue-monolith.png) | Cyan / graphite monolith hero artwork. |
| Scene 02 — Sub-second Intake Pulse | [intake-pulse.png](./campaign/intake-pulse.png) | Amber architectural command-floor artwork. |
| Scene 03 — Conduit Collision | [conduit-collision.png](./campaign/conduit-collision.png) | Emerald / sapphire telemetry collision artwork. |
| Exact generation prompts | [prompts.md](./campaign/prompts.md) | All three prompts used with the built-in image-generation tool; one generation per scene. |

The campaign images are 1672 × 941 PNGs. The private website is hosted at the Sites URL above; **10xbin.com has not been connected**.

## Implemented experience

- Cinematic monolith hero, telemetry header, and two calls to action.
- Interactive SVG revenue circuit: Meta/Google → WhatsApp and voice qualification → CRM → bank-settlement reconciliation. Nodes support pointer, Enter, and Space interaction.
- Three forensic funnel cards covering attribution loss, response delay, and reported ROAS versus settled margin.
- INR director’s console with monthly spend from ₹1 lakh to ₹1 crore, response lag from 0 to 60 minutes, and editable business assumptions.
- Three-chapter 14-day sprint: ingestion audit, agent deployment, and margin lock.
- Consultation terminal with validation and local JSON brief download.
- Responsive layouts, reduced-motion support, keyboard focus states, and privacy notes.

## What remains before a commercial launch

1. Connect a real consultation delivery or booking service. The current form **only prepares a local downloadable brief**; no appointment is booked, email sent, or information transmitted.
2. Connect and configure 10xbin.com, then explicitly choose the public audience. The current published website is owner-private.
3. Replace illustrative statistics with approved, evidenced claims if they are to be presented as factual benchmarks. The 38% tracking loss and 80% lead-decay figures are clearly labeled assumptions from the brief.
4. Review the financial assumptions against real business data. The model is a sensitivity illustration, not a forecast or guarantee. Eight-second intake is a design target, not a measured live performance claim.
5. Connect real ad, messaging, voice, CRM, and payment integrations if operational behavior is required. The blueprint currently describes a conceptual system.

## Model used

Default assumptions: ₹1,000 per qualified lead, 10% immediate-response close rate, ₹5,000 contribution per sale, and retention of 20% after 10 minutes.

- Retention(t) = 0.2^(t / 10), where t is minutes.
- Qualified leads = monthly spend ÷ cost per qualified lead.
- Exposed spend = spend × (1 − human retention).
- Potential contribution recovered = leads × close rate × contribution per sale × max(0, retention at 8 seconds − human retention).

The 38% tracking scenario is not included in this calculation. Exposed spend is a proxy, not realized cash loss. Recovery excludes implementation fees, platform charges, and operational constraints.

## Validation and technical handover

The standalone build passed. Automated checks passed for inline JavaScript syntax, internal links, embedded assets/fonts, calculator boundaries, invalid input handling, blueprint state changes, local brief lifecycle, and the mocked WebMCP registration contract. The dependency audit reported zero vulnerabilities.

Visual browser QA and verification in a live WebMCP-enabled browser were not performed. The calculator tool is feature-detected and falls back to normal page controls when unsupported.

To edit: extract the current source ZIP, run `npm install`, edit `index.html`, and run `npm run build`. The resulting `dist/index.html` is the portable deliverable. `npm run dev` serves the local preview; `npm run check` reruns the logic checks. The earlier Next.js implementation can be built with `npm run build:next`.

No credentials are included in the deliverables. Form values remain in page memory until the page is closed or navigated away from. Hosting may retain standard access logs.
