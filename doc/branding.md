# Cobalt & Amber UI Design System — Software Development Company

> **How to use this file:** canonical spec for the visual language of a software development company's website, portfolio, blog/docs and client/admin dashboards. When a prompt says _"review `ui-design-system-cobalt-amber.md` and redesign `#component`"_, apply the tokens in §3, the role rules in §1 and the component rules in §5–6. **Do not invent hex values** — reference a token or extend a scale. Every text/background pair must meet WCAG AA (4.5:1 text, 3:1 large text and UI/graphics) in **both** light and dark mode. Tokens flip with the theme; components reference **token names**, not raw hex.

---

## 1. Palette Strategy (grounded in the Figma research)

### 1.1 Why this palette replaced violet + emerald

Violet and emerald were similar in visual weight, so neither led; both are bright, which forced deep and pale variants in light mode; emerald also doubled as the success color; and the pair is the default look of many dev-tool startups. Cobalt + amber keeps one hue clearly in charge and puts the energy in a single, rare accent.

### 1.2 What the research says, and what we decided

| Figma guidance | Decision |
|---|---|
| **Complementary schemes** pair opposites (blue + orange is a named example) for "instant drama": bold, high-contrast pairings. | **Cobalt blue + amber** (blue's near-opposite). The contrast makes the CTA unmissable without adding more hues. |
| **Color meaning.** Blue = peace, security, trust, professionalism, calm. Yellow/orange = cheerful, inviting, energetic. | Blue = trust and craft for a studio people hand real money and data to. Amber = warmth, momentum, "start here". |
| **Temperature.** Cool colors (IBM, Blue Shield) promote trust and calm; warm colors carry energy; brands with a signature color use neutrals as backgrounds. | Cool dominant, warm accent, **blue-tinted neutral backgrounds**. |
| **60-30-10.** Dominant ties to brand identity, secondary gives pleasing contrast, accent adds pops and makes key elements stand out. | **60%** blue-tinted neutral canvas · **30%** cobalt (nav accents, links, selection, brand bands, headings) · **10%** amber (the main CTA, highlights, key metrics). |
| **Make one color dominant**; let others play supporting roles. | Cobalt dominant, amber accent, no third brand hue. Green/red/teal appear only as status or chart colors. |
| **Value & contrast.** WCAG 4.5:1 normal, 3:1 large; adjust backgrounds when a color is too light/dull. Saturation and value change how a color reads (a vivid red reads as a warning). | Vivid cobalt/amber are used on small elements; large areas are tinted neutrals. Both hues have **separate light and dark values**, not one reused hex. |
| **Start in grayscale; test across screens and lighting; A/B test CTAs.** | §8 validation plan. |

**Alternatives considered:** _ink teal + coral_ (warm, distinctive, but coral sits too close to the danger color) and _graphite + electric lime_ (dev-tool aesthetic, but lime fails contrast on light backgrounds). Both can be swapped in by replacing the §3.2/§3.3 values.

### 1.3 Roles (one job per color)

| Color | Job | Mnemonic |
|---|---|---|
| **Cobalt** | Identity, links, primary actions in product UI, selection, focus, active nav, brand bands | "who we are / where I am" |
| **Amber** | The single main conversion CTA per view, highlighted metrics, "popular" markers | "start here" |
| **Blue-tinted neutrals** | Canvas, surfaces, borders, text | "the room" |
| **Green, red, (amber), blue** | Status only: success, danger, warning, info | "what state it's in" |

**Rules**
- **One amber CTA per view** ("Start a project", "Book a call"). Everywhere else, primary buttons are cobalt.
- Amber also exists as the **warning** status. They never share a component: CTA is always a solid button; warning is always a soft badge/alert with a ⚠ icon and the word "Warning". Never color alone.
- **Amber is never text on a light background** (it fails contrast). Use `--amber-text` (`#92400E`) when amber-toned text is needed.
- Info status reuses cobalt tints; info elements are non-interactive and carry an ⓘ icon.

---

## 2. Background Decision (light & dark)

### 2.1 Candidates evaluated

**Light mode**

| Option | Hex | Verdict |
|---|---|---|
| White | `#FFFFFF` | Highest contrast but sterile; cards can't separate from the page. **Kept for card surfaces only.** |
| **Cloud** | **`#F5F7FC`** | ✅ **Chosen page background.** A cool blue-tinted off-white. White cards lift off it, amber pops against it, ink text ≈16.6:1. |
| Warm paper | `#FAF7F2` | ❌ Warm cast pushes amber toward muddy yellow and fights the cool brand. |
| Cool gray | `#F3F4F6` | ❌ Safe but anonymous; loses the brand tint. |

**Dark mode**

| Option | Hex | Verdict |
|---|---|---|
| Pure black | `#000000` | ❌ Harsh contrast, no room for elevation. |
| Graphite | `#121212` | ❌ Neutral, but cobalt and amber lose their depth. |
| Ink teal | `#07161A` | ❌ Green cast muddies the blue. |
| **Deep Navy** | **`#0B1220`** | ✅ **Chosen page background.** A blue-black that stays far from pure black, gives four elevation levels by lightness, and makes amber glow. Text ≈16:1. |

### 2.2 Elevation ladder

| Level | Use | Light | Dark |
|---|---|---|---|
| Sunken | Table header, inline code, input addons | `#EBEFF8` | `#070C16` |
| **Base** | Page background (60%) | **`#F5F7FC`** | **`#0B1220`** |
| Surface | Cards, forms, sections | `#FFFFFF` | `#111A2E` |
| Raised | Modals, dropdowns, popovers, sticky nav | `#FFFFFF` + shadow | `#18233B` |
| Top | Tooltips, command palette | `#FFFFFF` + shadow | `#212E4A` |

Light mode elevates with **shadow + border**; dark mode elevates with **lightness**.

---

## 3. Color Tokens — Light vs Dark, and where each is used

### 3.1 Neutrals

| Token | Light | Dark | Used in |
|---|---|---|---|
| `--bg-base` | `#F5F7FC` | `#0B1220` | Page background |
| `--bg-surface` | `#FFFFFF` | `#111A2E` | Cards, forms, inputs, service/pricing/case-study cards |
| `--bg-raised` | `#FFFFFF` | `#18233B` | Modals, menus, popovers, sticky nav |
| `--bg-top` | `#FFFFFF` | `#212E4A` | Tooltips, command palette |
| `--bg-sunken` | `#EBEFF8` | `#070C16` | Table header, Kbd, inline code, input addons |
| `--bg-disabled` | `#E8ECF5` | `#141D33` | Disabled inputs |
| `--skeleton` | `#E1E7F3` | `#1D2842` | Skeleton blocks |
| `--border` | `#DDE3F0` | `#26324D` | Dividers, card borders |
| `--border-strong` | `#C3CCE0` | `#36456A` | Hover borders, neutral Button border |
| `--border-input` | `#7B879F` | `#70809F` | Input/Select/Textarea borders, Checkbox box, Radio ring, Switch off-track (≥3:1) |
| `--text` | `#0F172A` | `#E8EDF8` | Body, headings |
| `--text-muted` | `#55607A` | `#9AA6C0` | Metadata, placeholders, captions, table headers |
| `--overlay` | `rgb(15 23 42 / .5)` | `rgb(0 0 0 / .6)` | Modal backdrop |

### 3.2 Cobalt (dominant brand)

| Token | Light | Dark | Used in |
|---|---|---|---|
| `--blue-fill` | `#2F4FE0` | `#7C9BFF` | Primary Button, checked Checkbox/Radio/Switch, selected date, step markers, active-nav indicator, Outline Button border, charts |
| `--on-blue` | `#FFFFFF` | `#0B1220` | Text/icons on `--blue-fill` |
| `--blue-hover` | `#2640BD` | `#A3B9FF` | Primary Button hover/pressed |
| `--blue-text` | `#2640BD` | `#A3B9FF` | **All text links**, active tab/nav text, highlighted headline phrase, Outline Button text |
| `--blue-tint` | `#DCE6FF` | `#16224A` | Selected row/item, service-card icon tile, Badge `blue`/info, tag chips, Outline Button hover |
| `--blue-tint-subtle` | `#EEF3FF` | `#0F1A3A` | Hero glow, featured-pricing card bg, row hover |
| `--on-blue-tint` | `#1F3391` | `#BCD0FF` | Text on `--blue-tint` |
| `--focus-ring` | `#2F4FE0` | `#7C9BFF` | `outline` on every interactive element |
| `--blue-deep` (band) | `#121C4D` | `#121C4D` | CTA band, footer, feature band (identical in both modes) |
| `--on-band` | `#E8EDF8` | `#E8EDF8` | Text on `--blue-deep` |
| `--band-link` | `#FFC84D` | `#FFC84D` | Links on `--blue-deep` |
| `--focus-ring-band` | `#A3B9FF` | `#A3B9FF` | Focus ring on `--blue-deep` |

### 3.3 Amber (accent)

| Token | Light | Dark | Used in |
|---|---|---|---|
| `--amber-fill` | `#FFB627` | `#FFB627` | **CTA Button** (one per view), "Popular" marker, key-metric highlight |
| `--on-amber` | `#0B1220` | `#0B1220` | Text on `--amber-fill` (always dark ink) |
| `--amber-hover` | `#F59E0B` | `#FFC85C` | CTA hover/pressed |
| `--amber-border` | `#C77D0A` | `#FFB627` | 1px CTA border (gives the button a ≥3:1 edge on light backgrounds) |
| `--amber-text` | `#92400E` | `#FFB627` | Amber-toned text: highlighted figures, "Popular" label, warning text |
| `--amber-tint` | `#FFF3D6` | `#3A2706` | Warning Badge/Alert bg, key-metric card bg |
| `--on-amber-tint` | `#92400E` | `#FFD58A` | Text on `--amber-tint` |
| `--amber-graphic` | `#C77D0A` | `#FFB627` | Chart series, status dots, icons (≥3:1) |

### 3.4 Status (semantic)

| Token | Light | Dark | Soft bg (L / D) | Soft text (L / D) |
|---|---|---|---|---|
| `--status-success` | `#137A42` | `#4ADE80` | `#DDF5E6` / `#0C2E1C` | `#0B5130` / `#A7F3C4` |
| `--status-warning` (icon) | `#B45309` | `#FFB627` | `#FFF3D6` / `#3A2706` | `#92400E` / `#FFD58A` |
| `--status-danger` | `#C62828` | `#FF7B7B` | `#FDE4E4` / `#3B1418` | `#7A1414` / `#FFC9C9` |
| `--status-info` | `#2F4FE0` | `#7C9BFF` | `#DCE6FF` / `#16224A` | `#1F3391` / `#BCD0FF` |
| `--status-neutral` | `#55607A` | `#9AA6C0` | `#EBEFF8` / `#18233B` | `#3B4560` / `#C3CCE0` |
| `--action-danger` (Button fill) | `#C62828` + `#FFFFFF` | `#FF7B7B` + `#0B1220` | — | — |

### 3.5 Developer surfaces (code, terminal)

Code blocks are **dark in both modes**, so syntax colors need only one set.

| Token | Value | Used for |
|---|---|---|
| `--code-bg` | `#0E1730` (light) / `#070C16` (dark) | Code block, terminal |
| `--code-text` | `#E8EDF8` | Default code text |
| `--syn-keyword` | `#93B1FF` | Keywords, tags |
| `--syn-string` | `#5EEAD4` | Strings |
| `--syn-function` | `#FFC857` | Functions, attributes |
| `--syn-number` | `#F9A8D4` | Numbers, booleans |
| `--syn-type` | `#C4B5FD` | Types, classes |
| `--syn-comment` | `#7F8CA8` | Comments |
| `--term-prompt` | `#4ADE80` | Terminal prompt/success output |

### 3.6 Chart palette

| Token | Light | Dark | Notes |
|---|---|---|---|
| `--chart-1` | `#2F4FE0` | `#7C9BFF` | Cobalt (default first series) |
| `--chart-2` | `#C77D0A` | `#FFB627` | Amber |
| `--chart-3` | `#0F766E` | `#2DD4BF` | Teal |
| `--chart-4` | `#C026D3` | `#E879F9` | Magenta |
| `--chart-other` | `#55607A` | `#9AA6C0` | Remainder |

Max 4 series + other; vary dash/marker/pattern so series don't rely on hue alone; label directly; gridlines `--border`, axes `--text-muted`. Status charts (passed/failed) use `--status-*` plus labels.

---

## 4. CSS Tokens

```css
:root {
  color-scheme: light;

  /* neutrals */
  --bg-base: #f5f7fc;    --bg-surface: #ffffff;  --bg-raised: #ffffff;  --bg-top: #ffffff;
  --bg-sunken: #ebeff8;  --bg-disabled: #e8ecf5; --skeleton: #e1e7f3;
  --border: #dde3f0;     --border-strong: #c3cce0; --border-input: #7b879f;
  --text: #0f172a;       --text-muted: #55607a;
  --overlay: rgb(15 23 42 / 0.5);

  /* cobalt */
  --blue-fill: #2f4fe0;  --on-blue: #ffffff;   --blue-hover: #2640bd;
  --blue-text: #2640bd;  --blue-tint: #dce6ff; --blue-tint-subtle: #eef3ff;
  --on-blue-tint: #1f3391; --focus-ring: #2f4fe0;
  --blue-deep: #121c4d;  --on-band: #e8edf8;   --band-link: #ffc84d; --focus-ring-band: #a3b9ff;

  /* amber */
  --amber-fill: #ffb627; --on-amber: #0b1220;  --amber-hover: #f59e0b;
  --amber-border: #c77d0a; --amber-text: #92400e;
  --amber-tint: #fff3d6; --on-amber-tint: #92400e; --amber-graphic: #c77d0a;

  /* status */
  --status-success: #137a42; --status-success-bg: #ddf5e6; --status-success-fg: #0b5130;
  --status-warning: #b45309; --status-warning-bg: #fff3d6; --status-warning-fg: #92400e;
  --status-danger:  #c62828; --status-danger-bg:  #fde4e4; --status-danger-fg:  #7a1414;
  --status-info:    #2f4fe0; --status-info-bg:    #dce6ff; --status-info-fg:    #1f3391;
  --status-neutral: #55607a; --status-neutral-bg: #ebeff8; --status-neutral-fg: #3b4560;
  --action-danger: #c62828;  --on-danger: #ffffff;

  /* dev surfaces */
  --code-bg: #0e1730; --code-text: #e8edf8;
  --syn-keyword: #93b1ff; --syn-string: #5eead4; --syn-function: #ffc857;
  --syn-number: #f9a8d4;  --syn-type: #c4b5fd;   --syn-comment: #7f8ca8; --term-prompt: #4ade80;

  /* charts */
  --chart-1: #2f4fe0; --chart-2: #c77d0a; --chart-3: #0f766e;
  --chart-4: #c026d3; --chart-other: #55607a;

  --radius: 10px; --radius-sm: 6px; --radius-lg: 16px;
}

[data-theme='dark'] {
  color-scheme: dark;

  --bg-base: #0b1220;    --bg-surface: #111a2e;  --bg-raised: #18233b;  --bg-top: #212e4a;
  --bg-sunken: #070c16;  --bg-disabled: #141d33; --skeleton: #1d2842;
  --border: #26324d;     --border-strong: #36456a; --border-input: #70809f;
  --text: #e8edf8;       --text-muted: #9aa6c0;
  --overlay: rgb(0 0 0 / 0.6);

  --blue-fill: #7c9bff;  --on-blue: #0b1220;   --blue-hover: #a3b9ff;
  --blue-text: #a3b9ff;  --blue-tint: #16224a; --blue-tint-subtle: #0f1a3a;
  --on-blue-tint: #bcd0ff; --focus-ring: #7c9bff;

  --amber-hover: #ffc85c; --amber-border: #ffb627; --amber-text: #ffb627;
  --amber-tint: #3a2706;  --on-amber-tint: #ffd58a; --amber-graphic: #ffb627;

  --status-success: #4ade80; --status-success-bg: #0c2e1c; --status-success-fg: #a7f3c4;
  --status-warning: #ffb627; --status-warning-bg: #3a2706; --status-warning-fg: #ffd58a;
  --status-danger:  #ff7b7b; --status-danger-bg:  #3b1418; --status-danger-fg:  #ffc9c9;
  --status-info:    #7c9bff; --status-info-bg:    #16224a; --status-info-fg:    #bcd0ff;
  --status-neutral: #9aa6c0; --status-neutral-bg: #18233b; --status-neutral-fg: #c3cce0;
  --action-danger: #ff7b7b;  --on-danger: #0b1220;

  --code-bg: #070c16;

  --chart-1: #7c9bff; --chart-2: #ffb627; --chart-3: #2dd4bf;
  --chart-4: #e879f9; --chart-other: #9aa6c0;
}
```

Follow the system theme by default and avoid a flash of the wrong theme with a tiny inline script in `<head>`:

```html
<script>
  (function () {
    var saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
    var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  })();
</script>
```

Tailwind v4 mapping (optional): `@theme inline { --color-base: var(--bg-base); --color-surface: var(--bg-surface); --color-blue-fill: var(--blue-fill); --color-amber-fill: var(--amber-fill); --color-ink: var(--text); --color-muted: var(--text-muted); }`

---

## 5. Component Specifications

> Per component: **Default / Hover / Selected-Active / Focus-Disabled-Error**. Tokens flip with the theme; resolved hex appears where components use mode-specific values.

### 5.1 Buttons (resolved values)

| Variant | Light fill / text / hover | Dark fill / text / hover | Use |
|---|---|---|---|
| **Primary (cobalt)** | `#2F4FE0` / `#FFFFFF` / `#2640BD` | `#7C9BFF` / `#0B1220` / `#A3B9FF` | Default action in product UI, secondary marketing actions |
| **CTA (amber)** | `#FFB627` + 1px `#C77D0A` / `#0B1220` / `#F59E0B` | `#FFB627` / `#0B1220` / `#FFC85C` | **One per view**: "Start a project", "Book a call", form submit |
| **Outline** | transparent, border `#2F4FE0`, text `#2640BD` / hover bg `#DCE6FF` | transparent, border `#7C9BFF`, text `#A3B9FF` / hover bg `#16224A` | Secondary beside a primary/CTA ("View our work") |
| **Neutral** (Cancel, Back) | `--bg-sunken` + `--border-strong` / `--text` | same tokens | Dismissive actions |
| **Ghost** | transparent / `--text` / hover `--bg-sunken` | same tokens | Toolbars, icon buttons |
| **Danger** | `#C62828` / `#FFFFFF` / `brightness(.92)` | `#FF7B7B` / `#0B1220` / `brightness(1.08)` | Destructive |
| **Link** | `--blue-text`, underlined | same | Inline actions |

Radius `--radius`, height 40px (44px touch), weight 600. Disabled `opacity .5` + `cursor-not-allowed`. Footer rows: right-aligned, **Cancel left, primary right**. On `--blue-deep` bands: CTA stays amber; outline uses `#E8EDF8` border + text.

### 5.2 Forms

- **Input / Textarea / Select** — bg `--bg-surface`; border `--border-input`; text `--text`; placeholder `--text-muted`; hover border `--text-muted`; focus border `--blue-fill` + ring; disabled `--bg-disabled`; error border + message `--status-danger` with icon.
- **Checkbox / Radio** — border `--border-input`; checked `--blue-fill` + `--on-blue` tick.
- **Switch** — off track `--border-input`; on `--blue-fill`.
- **Field** — label `--text` 14/600; hint `--text-muted`; required marker `--status-danger`.
- **Contact form** — submit = **CTA (amber)**; success state = success Alert.
- **Slider / Progress** — track `--border`; fill `--blue-fill`; completed `--status-success`.

### 5.3 Navigation

- **Top nav** — bg `--bg-raised` (90% opacity + blur), bottom `--border`; links `--text-muted` → hover `--text`; active = `--blue-text` + 2px `--blue-fill` underline; right: theme toggle (Ghost) + **CTA** "Start a project".
- **Tabs** — border-bottom `--border`; active `--text` + 2px `--blue-fill` underline.
- **Breadcrumb** — ancestors `--text-muted`, hover `--blue-text`; current `--text`.
- **Pagination** — current page `--blue-fill` + `--on-blue`.
- **Footer** — bg `--blue-deep`, text `--on-band`, links `--band-link`, dividers `rgb(255 255 255 / .12)`.
- **Docs sidebar** — active item `--blue-tint` + `--on-blue-tint` + 3px left `--blue-fill`.

### 5.4 Data display

- **Card** — bg `--bg-surface`; border `--border`; radius `--radius`; light shadow `0 1px 2px rgb(15 23 42 / .05), 0 4px 12px rgb(15 23 42 / .06)`; dark: no shadow, hover bg `--bg-raised`. Hover border `--blue-fill` at 40%.
- **Table** — header `--bg-sunken` + `--text-muted` uppercase 12px; row hover `--blue-tint-subtle`; selected `--blue-tint` + 3px left `--blue-fill`; numbers right-aligned `tabular-nums`; entity links `--blue-text`.
- **Avatar** — bg `--blue-tint` + `--on-blue-tint` initials.
- **Stat / metric** — value `--text` 28–36px `tabular-nums`; **key metric** card may use `--amber-tint` bg + `--on-amber-tint` value (one per view); delta chip: positive `--status-success-bg` + `-fg` with ↑, negative `--status-danger-bg` + `-fg` with ↓, flat neutral.

**Badges (resolved)**

| Variant | Light bg / text | Dark bg / text |
|---|---|---|
| neutral | `#EBEFF8` / `#3B4560` | `#18233B` / `#C3CCE0` |
| blue / info | `#DCE6FF` / `#1F3391` | `#16224A` / `#BCD0FF` |
| success | `#DDF5E6` / `#0B5130` | `#0C2E1C` / `#A7F3C4` |
| warning (⚠) | `#FFF3D6` / `#92400E` | `#3A2706` / `#FFD58A` |
| danger | `#FDE4E4` / `#7A1414` | `#3B1418` / `#FFC9C9` |
| popular (amber, solid) | `#FFB627` / `#0B1220` | `#FFB627` / `#0B1220` |

Always icon + text.

### 5.5 Feedback & overlays

- **Alert** — 4px left border in semantic color, soft bg, icon + title `--text` + desc `--text-muted`. Variants: success, warning (⚠ + "Warning"), danger, info (ⓘ), **tip** (`--blue-tint` bg, `--blue-fill` border).
- **Toast** — `--bg-raised` + border; semantic icon; success/info auto-dismiss 8s (pause on hover/focus); errors persist.
- **Dialog / Drawer** — `--bg-raised`, border `--border`, backdrop `--overlay`; focus trapped.
- **Tooltip** — `--bg-top`, text `--text`, border `--border`.
- **Skeleton** — `--bg-sunken` → `--skeleton` shimmer (static under reduced motion).
- **Spinner** — `--blue-fill`.

### 5.6 Code & developer content

- **Code block** — bg `--code-bg`, radius `--radius`, mono 13–14px, line-height 1.6; syntax per §3.5; filename bar `rgb(255 255 255 / .06)`; **Copy** button Ghost-inverse with ✓ in `--term-prompt` after copy.
- **Terminal block** — prompt `$` in `--term-prompt`, commands `--code-text`, output `--syn-comment`, errors `#FF7B7B`.
- **Inline code** — bg `--bg-sunken`, text `--blue-text`, radius 4px, border `--border`.
- **Tech-stack chip** — neutral badge with logo; hover `--blue-tint`.
- **Build/status pills** — Passing `success`, Failing `danger`, Running `info` + spinner, Queued `neutral`.

---

## 6. Marketing Site — Color Map by Section (Light / Dark)

| Section | Light mode | Dark mode |
|---|---|---|
| **Nav** | `--bg-raised` (white, blurred) + border; CTA amber `#FFB627` + border `#C77D0A` | `#18233B` + border; CTA `#FFB627` |
| **Hero** | `#F5F7FC` base, soft glow `#EEF3FF`→transparent; headline `#0F172A`, one highlighted phrase `#2640BD`; CTA amber + Outline | `#0B1220` base, glow `#0F1A3A`; headline `#E8EDF8`, highlight `#A3B9FF`; CTA amber + Outline |
| **Services** | White cards, icon tile `#DCE6FF` + icon `#1F3391`, hover border cobalt | `#111A2E` cards, tile `#16224A` + icon `#BCD0FF` |
| **Case studies** | Image + tag chips (blue badge); outcome metrics in key-metric (amber tint) card | Same tokens |
| **Tech stack** | Neutral chips on `#EBEFF8` | Neutral chips on `#18233B` |
| **Process (steps)** | Numbered circles `#2F4FE0` + white; connector `#C3CCE0`; completed `#137A42` ✓ | Circles `#7C9BFF` + `#0B1220`; connector `#36456A`; ✓ `#4ADE80` |
| **Testimonials** | White cards, quote mark `#93B1FF`, avatar tint | `#111A2E` cards, quote mark `#7C9BFF` at 40% |
| **Engagement models / pricing** | White cards; **featured** = 2px `#2F4FE0` border + `#EEF3FF` bg + amber "Popular" badge; buttons cobalt Primary | Featured = 2px `#7C9BFF` border + `#0F1A3A`; buttons cobalt Primary |
| **CTA band** | `#121C4D` band, `#E8EDF8` text, amber CTA | Identical |
| **Contact form** | Inputs white + `--border-input`; submit amber; success Alert | Inputs `#111A2E`; submit amber |
| **Footer** | `#121C4D`, links `#FFC84D` | Identical |
| **Blog / docs** | Prose `--text`, links `#2640BD` underlined, code `#0E1730` | Links `#A3B9FF`, code `#070C16` |

**Gradients.** Use only single-hue ones (`--blue-fill` → `--blue-deep`) for hero or band backgrounds, never behind body text, and never blue-to-amber (it passes through a muddy gray-green).

**Dashboards (client portal/admin).** Same tokens: selected rows `--blue-tint`, charts §3.6, status with icons. The CTA rule relaxes: dashboards use cobalt Primary and reserve amber for one highlighted metric or upgrade prompt.

---

## 7. Accessibility & Contrast

### 7.1 Key pairs (WCAG ratios, computed; re-verify in CI)

| Pair | Light | Dark |
|---|---|---|
| `--text` on `--bg-base` | 16.6:1 | 16.0:1 |
| `--text-muted` on `--bg-base` | 5.9:1 | 7.7:1 |
| `--text-muted` on `--bg-surface` | 6.3:1 | 7.1:1 |
| `--text-muted` on `--bg-top` (lowest) | 6.3:1 | 5.5:1 |
| `--on-blue` on `--blue-fill` | 6.3:1 | 7.1:1 |
| `--blue-text` on `--bg-base` | 7.7:1 | 9.8:1 |
| `--blue-text` on `--blue-tint` | 6.6:1 (`--on-blue-tint` 8.7:1) | 8.0:1 (`--on-blue-tint` 10.0:1) |
| `--on-amber` on `--amber-fill` | 10.2:1 | 10.7:1 |
| `--amber-text` on `--bg-base` | 6.6:1 | 10.7:1 |
| `--on-amber-tint` on `--amber-tint` | 6.4:1 | 10.3:1 |
| `--amber-border` on `--bg-base` (CTA edge) | 3.1:1 | n/a (amber vs navy ≥10:1) |
| `--border-input` on `--bg-surface` | 3.6:1 | 4.4:1 (3.4:1 on `--bg-top`) |
| `--focus-ring` on `--bg-base` | 5.9:1 | 7.1:1 |
| `--on-band` on `--blue-deep` | 13.8:1 | 13.8:1 |
| `--band-link` on `--blue-deep` | 10.5:1 | 10.5:1 |
| `--status-success` text on `--bg-base` | 5.0:1 | 10.8:1 |
| `--status-danger` text on `--bg-base` | 5.2:1 | 7.5:1 |
| `--syn-comment` on `--code-bg` | 5.2:1 | 5.3:1 |
| Chart series on `--bg-surface` | ≥3.3:1 (amber `#C77D0A` is lowest) | ≥6.0:1 |

_Avoid:_ amber text on light backgrounds (use `--amber-text`) · white on `#FFB627` (1.9:1) · cobalt links in running text without underline (≈2.2:1 against body text) · amber and warning on the same component · gradients behind text.

### 7.2 PR checklist

- [ ] Tokens only; no new hex values
- [ ] Verified in light **and** dark
- [ ] Text ≥4.5:1; icons/borders/charts ≥3:1; inputs use `--border-input`
- [ ] Status shown by icon + label, not color alone
- [ ] Exactly **one** amber CTA in the viewport
- [ ] Links in running text underlined
- [ ] Visible focus ring; keyboard order logical
- [ ] Touch targets ≥44px, inputs 16px on touch
- [ ] Grayscale screenshot still shows hierarchy
- [ ] Reduced motion respected

---

## 8. Validation Plan (from the Figma tips)

1. **Grayscale pass:** convert each key page to grayscale; hierarchy and the CTA must still be obvious.
2. **Device pass:** check light and dark on a phone outdoors, a laptop and an external monitor; amber can shift toward yellow or orange across displays.
3. **A/B test the CTA** (amber vs cobalt Primary; label wording) and measure click-through; keep ≥4.5:1 in every variant.
4. **Feedback:** show the palette to 5 target clients; ask what it communicates (trust, craft, speed?). Check cultural readings of the colors for your key markets.
5. **CVD simulation:** run key screens and charts through a color-blind simulator; confirm status is carried by icon and label.

---

## 9. Quick Reference

| Need | Token |
|---|---|
| Page / card / popover | `--bg-base` / `--bg-surface` / `--bg-raised` |
| Text / muted | `--text` / `--text-muted` |
| Primary action, selection, focus | `--blue-fill` + `--on-blue`, `--blue-tint`, `--focus-ring` |
| Link, active nav text | `--blue-text` (hover `--blue-hover`) |
| Main CTA (one per view) | `--amber-fill` + `--on-amber` + `--amber-border` (hover `--amber-hover`) |
| Amber-toned text / metric | `--amber-text`, `--amber-tint` + `--on-amber-tint` |
| Success · Warning · Danger · Info · Neutral | `--status-*` (soft bg + `-fg` text) |
| Brand bands (CTA, footer) | `--blue-deep` + `--on-band` + `--band-link` |
| Code | `--code-bg`, `--code-text`, `--syn-*` |
| Input border | `--border-input` |
| Disabled | `opacity .5` + `cursor-not-allowed` (inputs `--bg-disabled`) |

---

_End of spec. When redesigning a component, read §5–6, apply the tokens for every state, confirm the CTA rule, and verify AA in light AND dark._