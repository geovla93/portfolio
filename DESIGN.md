---
name: geovla.dev
description: George Vlassis's portfolio, printed like a security document and read like a component datasheet.
colors:
  # Steel plate (dark, the default theme)
  copper: "oklch(0.73 0.12 52)"
  copper-ink: "oklch(0.18 0.025 50)"
  iris-teal: "oklch(0.76 0.07 180 / 0.55)"
  plate-steel: "oklch(0.165 0.012 250)"
  plate-raised: "oklch(0.2 0.014 250)"
  plate-muted: "oklch(0.235 0.014 250)"
  plate-accent: "oklch(0.255 0.016 250)"
  plate-border: "oklch(0.31 0.016 250)"
  plate-input: "oklch(0.42 0.02 250)"
  silver-ink: "oklch(0.93 0.008 240)"
  silver-muted: "oklch(0.73 0.02 245)"
  engraving-line: "oklch(0.84 0.018 240 / 0.42)"
  engraving-line-faint: "oklch(0.84 0.018 240 / 0.2)"
  microprint-silver: "oklch(0.8 0.02 240 / 0.5)"
  signal-red: "oklch(0.7 0.17 25)"
  # Security paper (light)
  copper-print: "oklch(0.52 0.135 42)"
  copper-print-ink: "oklch(0.985 0.006 80)"
  iris-print: "oklch(0.5 0.08 185 / 0.62)"
  paper: "oklch(0.956 0.007 165)"
  paper-raised: "oklch(0.982 0.004 165)"
  paper-muted: "oklch(0.925 0.01 200)"
  paper-accent: "oklch(0.915 0.016 250)"
  paper-border: "oklch(0.83 0.02 250)"
  paper-input: "oklch(0.74 0.03 255)"
  intaglio-blue: "oklch(0.29 0.085 268)"
  intaglio-blue-muted: "oklch(0.43 0.05 265)"
  print-line: "oklch(0.36 0.08 268 / 0.5)"
  print-line-faint: "oklch(0.36 0.08 268 / 0.24)"
  microprint-blue: "oklch(0.36 0.07 268 / 0.62)"
  signal-red-print: "oklch(0.53 0.2 27)"
typography:
  display:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "min(13.4vw, 12.25rem)"
    fontWeight: 780
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "\"FLAR\" 100, \"VOLM\" 100"
  statement:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "clamp(1.875rem, 3.3vw, 3rem)"
    fontWeight: 560
    lineHeight: 1.06
    letterSpacing: "-0.025em"
    fontVariation: "\"FLAR\" 100, \"VOLM\" 55"
  headline:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.75rem)"
    fontWeight: 680
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"FLAR\" 100, \"VOLM\" 70"
  headline-sheet:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4rem)"
    fontWeight: 680
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"FLAR\" 100, \"VOLM\" 70"
  title:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "\"FLAR\" 100, \"VOLM\" 70"
  body-lead:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
    fontFeature: "\"kern\""
    fontVariation: "\"FLAR\" 0"
  body:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
    fontFeature: "\"kern\""
    fontVariation: "\"FLAR\" 0"
  data-value:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
    fontVariation: "\"FLAR\" 0"
  control:
    fontFamily: "Commissioner, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.005em"
    fontVariation: "\"FLAR\" 0"
  label:
    fontFamily: "Martian Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
    fontVariation: "\"wdth\" 87.5"
  mono-data:
    fontFamily: "Martian Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "0.02em"
  mono-meta:
    fontFamily: "Martian Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  microprint:
    fontFamily: "Martian Mono, monospace"
    fontSize: "6.5px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.14em"
    fontVariation: "\"wdth\" 75"
rounded:
  none: "0px"
  sm: "2px"
  md: "2px"
spacing:
  hairline: "1px"
  frame-inset: "6px"
  row: "12px"
  row-loose: "16px"
  cell-x: "20px"
  gutter: "24px"
  page-margin-sm: "16px"
  page-margin-md: "24px"
  page-margin-lg: "40px"
  block: "40px"
  block-lg: "56px"
  section-sm: "96px"
  section-md: "128px"
  section-lg: "160px"
  lattice-max: "88rem"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.copper-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-primary-lg:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.copper-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "oklch(0.73 0.12 52 / 0.88)"
  button-outline:
    backgroundColor: "{colors.plate-steel}"
    textColor: "{colors.silver-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.plate-accent}"
    textColor: "{colors.silver-ink}"
  button-icon:
    backgroundColor: "{colors.plate-steel}"
    textColor: "{colors.silver-ink}"
    rounded: "{rounded.sm}"
    size: "36px"
  input:
    backgroundColor: "{colors.plate-raised}"
    textColor: "{colors.silver-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "4px 14px"
    height: "44px"
  textarea:
    backgroundColor: "{colors.plate-raised}"
    textColor: "{colors.silver-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  data-label:
    textColor: "{colors.silver-muted}"
    typography: "{typography.label}"
  datasheet-row:
    textColor: "{colors.silver-ink}"
    typography: "{typography.body}"
    padding: "12px 0"
  spec-plate-cell:
    backgroundColor: "{colors.plate-raised}"
    textColor: "{colors.silver-ink}"
    typography: "{typography.data-value}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  microprint-rule:
    textColor: "{colors.microprint-silver}"
    typography: "{typography.microprint}"
    padding: "2px 0"
  project-frame:
    backgroundColor: "{colors.plate-muted}"
    rounded: "{rounded.none}"
    padding: "6px"
  nav-link:
    textColor: "{colors.silver-ink}"
    typography: "{typography.control}"
    padding: "8px 12px"
  nav-link-hover:
    textColor: "{colors.copper}"
  contact-pointer:
    textColor: "{colors.copper}"
    typography: "{typography.body-lead}"
  header:
    backgroundColor: "{colors.plate-steel}"
    height: "64px"
  contact-slip:
    backgroundColor: "{colors.plate-raised}"
    textColor: "{colors.silver-ink}"
  contact-slip-form:
    backgroundColor: "{colors.plate-steel}"
    rounded: "{rounded.none}"
    padding: "40px"
  seal:
    textColor: "{colors.engraving-line}"
    size: "112px"
  mark:
    textColor: "{colors.iris-teal}"
    size: "28px"
---

# Design System: geovla.dev

## Overview

**Creative North Star: "The Engraved Datasheet"**

The site is a document engineered not to be forged. Every decorative mark is a security feature drawn in code: guilloché rosettes woven from a single polar curve repeated at small rotations, microprint rules that carry real text, a line-engraved portrait, and a monogram hidden in the medallion's mesh that only surfaces when the plate is tilted. On top of that sits the discipline of a component datasheet. Proof is set as hairline spec rows with fixed label columns, never as cards. The engraving gives the page its authority, and the datasheet keeps it honest.

There are two physical states of the same object. Dark is the default: the steel intaglio plate, silver line work on near-black blue steel, with copper as the one warm metal. Light is the print pulled from that plate: intaglio-blue ink on cool green-grey security paper, with the copper deepened to a burnt print ink. The two themes are paired role for role, and switching between them runs the next plate through the press as a single top-to-bottom wipe.

Density is that of a document, not a dashboard. Sections breathe on generous vertical rhythm (96 to 160px), and type does the structural work: very large engraved display headings, quiet body text, and condensed mono labels for every datum. Anything that would feel like crypto hype (neon, glow, chain motifs, coins, currency marks) has been refused, and so have the centred name hero and rows of equal project cards. The security vocabulary is the antidote: it reads as rigor, not speculation.

**Key Characteristics:**
- Code-generated guilloché, rosettes derived from real data (role start dates), drawn in two inks: line and iris.
- Commissioner with its flare axis for engraved display type; Martian Mono only for data.
- Hairline datasheet tables and 1px rules instead of cards, shadows, or filled panels.
- Copper is the single action colour in both themes.
- Near-square geometry: 2px corners on controls, square plates; the only curves are rosettes and perforations.
- One entry animation (the engraving draw-in) and one transition (the plate-press theme wipe).

## Colors

Cold metal and ink with one warm metal: a near-monochrome blue-steel family, a teal second ink for engraving, and copper reserved for action.

Every role exists twice. The table below is the pairing; components reference the role, and the theme swaps the value.

| Role | Steel plate (dark, default) | Security paper (light) |
|---|---|---|
| Ground | plate-steel | paper |
| Raised plate | plate-raised | paper-raised |
| Muted fill | plate-muted | paper-muted |
| Hover wash | plate-accent | paper-accent |
| Hairline rule | plate-border | paper-border |
| Control stroke | plate-input | paper-input |
| Ink | silver-ink | intaglio-blue |
| Muted ink | silver-muted | intaglio-blue-muted |
| Action | copper | copper-print |
| Ink on action | copper-ink | copper-print-ink |
| Engraving line | engraving-line | print-line |
| Faint engraving line | engraving-line-faint | print-line-faint |
| Second ink | iris-teal | iris-print |
| Microprint | microprint-silver | microprint-blue |
| Error | signal-red | signal-red-print |

### Primary
- **Plate Copper** (oklch(0.73 0.12 52), dark) / **Burnt Print Copper** (oklch(0.52 0.135 42), light): the only action colour. It fills the "Get in touch", "Live Demo" and "Send Message" buttons, colours the inline links that point to the contact slip, turns nav links on hover and focus, and is the focus ring, text selection and caret colour. Ink on copper is a near-black brown in dark (about 7.6:1) and a warm off-white in light (about 5.6:1). Hover fades the fill to 88% opacity.

### Secondary
- **Iris Teal** (oklch(0.76 0.07 180 / 0.55), dark) / **Iris Print** (oklch(0.5 0.08 185 / 0.62), light): the second engraving ink, the rainbow-roll colour of a security print. It draws the medallion's inner rosette, the site mark in the header, and the 10px tick that leads every bullet in scope and decision lists. It is always a stroke or a 1px tick, never a fill or a text colour.

### Neutral
- **Steel Plate** (oklch(0.165 0.012 250)) / **Security Paper** (oklch(0.956 0.007 165)): the page ground, the header, the outline button fill, and the slip's form panel.
- **Raised Plate** (oklch(0.2 0.014 250)) / **Raised Paper** (oklch(0.982 0.004 165)): the one step of tonal lift. It fills the hero spec plate cells, the contact section, the footer, inputs and menus.
- **Muted Plate** (oklch(0.235 0.014 250)) / **Muted Paper** (oklch(0.925 0.01 200)): the ground behind project screenshots while they load.
- **Hover Wash** (oklch(0.255 0.016 250)) / **Paper Wash** (oklch(0.915 0.016 250)): the hover and highlight fill for outline and ghost buttons and menu items.
- **Plate Rule** (oklch(0.31 0.016 250)) / **Paper Rule** (oklch(0.83 0.02 250)): every hairline. Datasheet rows, section dividers, frames, the microprint's top and bottom rules, and the 1px gaps of the spec plate grid.
- **Control Stroke** (oklch(0.42 0.02 250)) / **Paper Control Stroke** (oklch(0.74 0.03 255)): the border of inputs and outline buttons, and the scrollbar thumb. It sits one step above the hairline so controls read as interactive.
- **Silver Ink** (oklch(0.93 0.008 240)) / **Intaglio Blue** (oklch(0.29 0.085 268)): all primary text, the display name, and the colour that the engraved portrait mask is filled with.
- **Muted Silver** (oklch(0.73 0.02 245)) / **Muted Intaglio** (oklch(0.43 0.05 265)): secondary paragraphs, data labels, company names, and footer text. It holds above 7:1 on both grounds, so 11px mono labels stay legible.
- **Engraving Line** (oklch(0.84 0.018 240 / 0.42)) / **Print Line** (oklch(0.36 0.08 268 / 0.5)): the main guilloché stroke for the medallion's outer mesh, core, and the role seals.
- **Faint Engraving Line** (oklch(0.84 0.018 240 / 0.2)) / **Faint Print Line** (oklch(0.36 0.08 268 / 0.24)): the medallion's outer wave band and the seal's boundary ring.
- **Microprint Silver** (oklch(0.8 0.02 240 / 0.5)) / **Microprint Blue** (oklch(0.36 0.07 268 / 0.62)): microprint text in rules and around the medallion ring.

### Status
- **Signal Red** (oklch(0.7 0.17 25)) / **Print Red** (oklch(0.53 0.2 27)): field errors and invalid control borders only.

### Named Rules
**The One Copper Rule.** Copper means "act". It appears on buttons that do something, links that lead to the contact slip, nav hover, focus, and selection, and nowhere else. It never strokes a rosette, colours a heading, or tints a surface.

**The Two Inks Rule.** Engraving uses only two inks: the line ink (silver or intaglio blue) and the iris ink. Both are translucent strokes that weave into the ground. Never fill an area with them, and never set body text in them.

**The Paired Plate Rule.** A colour token is not done until it exists in both `:root` (paper) and `.dark` (plate) with the same role. Dark is the default for first-time visitors, and light and system stay selectable.

## Typography

**Display Font:** Commissioner (variable, with the FLAR and VOLM axes), falling back to sans-serif
**Body Font:** Commissioner at flare 0, falling back to sans-serif
**Label/Mono Font:** Martian Mono (variable, with the wdth axis), falling back to monospace

**Character:** Commissioner's flare axis grows wedge terminals on the strokes, which is what makes the headings look cut into a plate rather than typeset. At flare 0 the same family is a calm humanist sans for reading. Martian Mono, narrowed on its width axis, is the serial-number voice of the document: every date, label, handle, address, and stack line is set in it, and nothing else is.

### Hierarchy
- **Display** (780, min(13.4vw, 12.25rem) from 1024px up, 22vw on phones and 21vw from 640px; line-height 0.98, tightening to 0.86 when the name breaks over two lines; tracking -0.035em; flare 100, volume 100): the name "George Vlassis", set once at the foot of the hero and running the full width of the lattice.
- **Statement** (560, clamp(1.875rem, 3.3vw, 3rem), 1.06, -0.025em; flare 100, volume 55): the single positioning sentence that opens the hero. It is lighter and lower in volume than the headings, so it reads as voice rather than title.
- **Headline** (680, clamp(2.5rem, 5.2vw, 4.75rem), 1, -0.03em; flare 100, volume 70; balanced wrapping): section headings for About, Experience, Projects, and Contact.
- **Headline, sheet** (680, clamp(2.25rem, 4.6vw, 4rem), 1, -0.03em): project names at the head of each project sheet.
- **Title** (650, clamp(1.75rem, 3.2vw, 2.75rem), 1.05, -0.025em): role titles in the experience record.
- **Body lead** (400, 1.125rem, 1.625): section ledes and narrative paragraphs, held to 36 to 62ch (36rem for the hero lede, 44ch beside headlines, 60 to 62ch for long copy). Pretty wrapping.
- **Body** (400, 1rem, 1.625): datasheet values, bullets, and form text.
- **Data value** (400, 0.9375rem, 1.375): the values inside the hero spec plate.
- **Control** (500, 0.9375rem, 0.005em): button and nav labels. Large buttons step up to 1rem.
- **Label** (Martian Mono 400, 0.6875rem, line-height 1.4, 0.08em tracking, uppercase, width 87.5): the `data-label` voice for every datasheet label, list heading, caption, and the slip's address strip.
- **Mono data** (Martian Mono 400, 0.875rem, 0.02em on dates): role date ranges, project addresses, and social handles.
- **Mono meta** (Martian Mono 400, 0.75rem, 1.625): the "Stack:" line under each role and project, with the technologies joined by slashes.
- **Microprint** (Martian Mono 400, 6.5px, line-height 1, 0.14em, uppercase, width 75): the text inside microprint rules. In the medallion ring it is 10 units of the SVG's 1000-unit plate, with 1.5 units of tracking.

### Named Rules
**The Speak-or-Record Rule.** Commissioner speaks and Martian Mono records. Prose, headings, and buttons are never set in mono. Dates, labels, serials, handles, and stack lists are never set in Commissioner.

**The Flare Rule.** The flare axis is on (100) only for engraved type: display, statement, headline, and title, through the `font-engraved` utility. Body text always runs at flare 0. Volume rises with presence: 55 for the statement, 70 by default, 100 for the name alone.

**The Real Microprint Rule.** Microprint carries real, verifiable text: name, title, company, city, and domain, repeated. It is never lorem or filler, and it is always hidden from assistive technology because it is texture, not content.

## Layout

The page is laid out on a single **lattice**: a centred container up to 88rem (1408px) wide, with page margins of 16px on phones, 24px from 640px, and 40px from 1024px. Inside it, every section uses a 12-column grid with a 24px column gap. Breakpoints are the Tailwind 4 defaults: 640px, 768px, 1024px, and 1280px.

Sections stack vertically with 96px of padding top and bottom on phones, 128px from 640px, and 160px from 1024px. They are separated by a full-width hairline rule rather than by colour bands. The one exception is the contact section, which steps up to the raised plate as the slip at the end of the document. Inside a section the rhythm is 40px between a heading group and its body, 32 to 56px before a datasheet, and 96 to 128px between project sheets.

Asymmetry is the default composition. Headings take seven columns, with their lede pushed to columns 9 to 12 and aligned to the heading's foot. About pins the portrait in columns 1 to 5 (sticky 112px from the top on desktop) against text in columns 6 or 7 to 12. Each experience role puts its date range and seal in columns 1 to 3 and the content in 4 to 12, with scope lists splitting into two columns from 768px. Each project sheet puts the screenshot in columns 1 to 7 and its spec column in 8 to 12. Contact sets the copy in 1 to 5 and the slip in 7 to 12. Below 1024px, everything collapses to a single column in source order.

The hero fills the first viewport on desktop (the full small-viewport height minus the 65px header). It is framed above and below by microprint rules. Its grid has three rows: the statement, lede, and buttons top left in seven columns (six from 1280px); the six-cell spec plate across the full width; then the name across the full width at the bottom. The medallion is positioned absolutely and bleeds off the upper right: 56vw wide, offset -14vw from the top and right at 1024px, and 60vw wide offset -20vw and -15vw at 1280px. On phones and tablets it moves below the copy at 118vw, 80vw, and 64vw wide. The name drops 13rem (23rem from 640px) to make room, and the spec plate follows the name.

### Named Rules
**The Lattice Rule.** Nothing escapes the 88rem lattice except the medallion, which is allowed to bleed off the page edge, and the microprint rules, which run edge to edge.

## Elevation & Depth

The system is flat. No surface on the page casts a shadow. Depth comes from three things. The first is a single tonal step from the ground to the raised plate. The second is hairline rules that cut the plate into fields. The third is solid overlap: the spec plate's raised cells sit over the medallion's lower edge, and their solid fill simply covers the line work behind them. The perforation along the top of the contact section is the only illusion of a physical edge. It is a row of ground-coloured dots punched into the raised plate.

The only shadows that render are inherited library defaults: the shadcn dropdown menus (theme and mobile nav) and sonner toasts. They are not part of the language.

### Named Rules
**The Flat Plate Rule.** Surfaces are flat at rest and flat on hover. To separate a field, draw a hairline or step one tone up to the raised plate. Never lift it with a shadow.

## Shapes

Geometry is engraved, so it is near-square. The base radius is 2px, and it is used only on interactive controls: buttons, inputs, the textarea, and menu items. Every structural plate is square: the spec plate, the slip's form panel, project screenshot frames, and datasheet tables. Larger radius steps (4px, 6px) are derived from the base in the theme but are not used on any live surface.

Lines are 1px everywhere. They come from the hairline token for structure and from the control stroke for inputs and outline buttons. Guilloché strokes do not scale with the drawing: 0.8 units in the medallion, 0.4 in the seals, and 1.1 in the site mark. The only curves on the page are the rosettes and rings themselves, the circular perforation dots (1.75px radius on a 12 by 6px repeat), and the oval vignette of the engraved portrait. Screenshots sit in a double frame: a 1px outer rule, a 6px inset, and a 1px inner rule, which is how a plate is mounted.

## Components

### Buttons
Precise and quiet. They are flat ink blocks with a 2px corner that state their action and do nothing else.
- **Shape:** near-square (2px radius).
- **Primary:** a copper fill with copper ink, 0.9375rem medium label, 8px gap to a 16px trailing icon. Default height 40px with 16px side padding (14px beside an icon); large 48px with 24px padding (20px beside an icon) and a 1rem label. The page's CTAs are all large.
- **Hover / Focus:** hover fades the copper to 88% over 200ms. Focus draws a 3px copper ring at 50% opacity (the global focus fallback is a 2px solid copper outline offset 3px). Disabled drops to 50% opacity. "Send Message" stays disabled until the invisible Turnstile check returns a token.
- **Outline:** a ground-coloured fill with a 1px control stroke and ink text. On hover the stroke darkens to 70% of the ink, and the fill takes the hover wash. It is used for every secondary action: Download CV, View Github, View Code, and the theme toggle.
- **Ghost:** no fill or stroke until hover. It is used only for the mobile menu trigger.
- **Icon:** 36px square, either outline (theme toggle) or ghost (mobile nav).

### Inputs / Fields
- **Style:** the raised plate as fill, a 1px control stroke, 2px radius, 44px tall with 14px horizontal padding and 1rem text. The message textarea grows with its content from a 96px minimum and is not resizable. Placeholders use the muted ink. Labels sit above each field in the body face at 0.875rem medium.
- **Focus:** the stroke turns copper and a 3px copper ring at 25% opacity appears. The caret is copper.
- **Error / Disabled:** an invalid field takes a signal-red stroke and a faint red ring (20% on paper, 40% on plate), with the message below in 0.875rem signal red. Disabled drops to 50% opacity.

### Navigation
- **Header:** sticky, 64px tall on the ground colour with a hairline below. On the left is the site mark (a 28px five-lobe rosette in iris) beside "George Vlassis" in engraved type at 1.125rem semibold, tracked -0.01em. On the right are the section links and the theme toggle.
- **Links:** 0.9375rem medium in ink with 8px by 12px padding and no background in any state. Hover and focus turn the text copper.
- **Mobile:** below 768px the links collapse into a ghost icon button that opens a dropdown menu. The theme toggle opens a Light / Dark / System menu.
- **Footer:** the raised plate, opened by a microprint rule. It carries the copyright in muted 0.875rem, the domain in mono, and 40px icon links for GitHub, LinkedIn, and X that brighten to full ink on hover.

### Datasheet Rows
The system's replacement for cards. A definition list opens with a top hairline, and each row closes with a bottom hairline. Each row has a fixed mono label column (6.5rem in the hero and social list, 8.5rem in project specs, 9rem in About) and a free value column, with 12px vertical padding (16px in About and the social list). The label is in the muted `data-label` voice, nudged 2 to 4px down to share the value's first baseline. The contact section's social links use the same row with a trailing arrow that nudges 2px up and right on hover, while the whole row turns copper.

### Spec Plate (signature)
The hero's solid data plate. It is a grid filled with the hairline colour and a 1px gap, so the rules between cells are the plate showing through. Each cell is the raised plate with 20px side padding. It has six cells in one row from 1024px, three from 768px, and two from 640px. On phones it becomes stacked label-value rows. Labels are mono; values are 0.9375rem body.

### Bulleted Lists
Scope and decision lists have no glyph bullets. Each item is indented 20px and led by a 10px by 1px iris tick at 0.7em from the top: a single engraved stroke.

### Project Sheet
Each project has a hairline-topped sheet with the name in the sheet headline and the live address flush right in mono. Below are the double-framed screenshot (21:10, cover-cropped) and the spec column: a lead summary, datasheet rows, an optional "Engineering decisions" list, the mono stack line, then a copper "Live Demo" and an optional outline "View Code".

### Contact Slip (signature)
The last section is the tear-off slip. It is the raised plate, perforated along its top edge. Inside, the form panel is a square ground-coloured plate with a hairline frame. It opens with an address strip of mono labels ("To: George Vlassis", with "Reply by email" in muted ink) over a hairline, and has 24px padding on phones and 40px from 640px.

### Contact Pointer
Each section above the slip ends with one sentence in body lead and a copper, underlined inline link with a 16px down-right arrow that leads to the contact slip. Underlines are 1px, offset 0.22em.

### Guilloché Medallion (signature)
A 1000-unit SVG plate built entirely in code from the experience data. It has four meshes. An outer wave band (40 waves, 8 passes) is in the faint line. The outer rosette takes the current role's parameters (9 lobes, 25 passes) in the line ink. The inner rosette takes the first role's parameters (14 lobes, 22 passes) in iris. A core (9 lobes, 9 passes) is in the line ink. A microprint ring circles the plate at radius 466. A second copy of the outer mesh is masked to a "GV" monogram (Commissioner 800). The latent driver turns that copy against the base mesh by up to ±2.6° and thickens its stroke (0.8 plus 0.42 per degree), so the monogram surfaces as moiré. Pointer position across the hero drives it on fine pointers, and scroll progress drives it on touch. It eases at 9% per frame and rests at 0°. Under reduced motion it holds still at 1.6°, so the monogram is always faintly visible.

### Seal and Mark
- **Seal:** a 112px rosette for each role, generated from its start date: lobes are the month plus 3, and passes are the last two digits of the year, spread across 45% of a lobe. It has a 0.4 line stroke and a faint boundary ring at radius 48. Its mono caption states its own parameters ("9 lobes × 25 passes / from 2025.06").
- **Mark:** the site's 28px mark, a five-lobe, three-pass rosette from the same family, stroked in iris at 1.1.

### Engraved Portrait
The photograph is rendered offline as line engraving (waving horizontal lines with diagonal hatching in the deepest tones, in an oval vignette). There are two masks: lines where the photo is dark for paper, and lines where it is bright for plate. The page uses the mask over a block of ink colour, so the portrait is always printed in the current theme's ink. Aspect 578:870, up to 28rem wide, captioned in mono.

### Motion
The motion grammar is deliberately small. All of it uses the expo-out ease cubic-bezier(0.16, 1, 0.3, 1).
- **Engraving draw-in:** on load, every guilloché pass in the medallion draws its stroke over 2.6s, staggered 24ms per pass after a 120ms delay. This is the only entry animation.
- **Plate-press:** a theme change wipes the new plate in from top to bottom over 620ms through a view transition, where the browser supports it.
- **Latent tilt:** see the medallion.
- Under reduced motion, the engraving is drawn complete, the theme switches instantly, smooth scrolling is off, and the latent tilt is static.

## Do's and Don'ts

### Do:
- **Do** reserve copper (plate copper on dark, burnt print copper on light) for actions, the links that lead to the contact slip, nav hover, focus, and selection.
- **Do** set every label, date, serial, handle, address, and stack list in Martian Mono through the `data-label` voice (0.6875rem, 0.08em tracking, uppercase, width 87.5) or the mono data sizes.
- **Do** present specs as datasheet rows: a top hairline, a bottom hairline per row, a fixed mono label column, and 12 to 16px of vertical padding.
- **Do** generate any new rosette from the guilloché helpers and real data. Stroke it in the line or iris ink at a non-scaling width between 0.4 and 1.1, and caption its parameters when it stands alone.
- **Do** define every new colour token in both the paper and plate themes with the same role.
- **Do** use engraved type (flare 100) for headings and statements, and keep body text at flare 0.
- **Do** mount raster images in the double hairline frame (a 1px rule, a 6px inset, and a 1px rule).
- **Do** give every motion a reduced-motion state that shows the finished drawing.

### Don't:
- **Don't** use cards: rounded, shadowed, or filled boxes that hold a summary. The shadcn Card and Badge primitives in the repo are not part of this system.
- **Don't** add shadows to any surface, at rest or on hover.
- **Don't** use neon, glow, chain motifs, coins, currency marks, or denominations. The security vocabulary is engraving and microprint, not crypto iconography.
- **Don't** round structural plates, or round controls beyond 2px. Pill shapes are out. The only curves are the rosettes, rings, perforations, and the portrait's vignette.
- **Don't** fill areas or set text in the line or iris inks. They are translucent strokes.
- **Don't** set prose or headings in Martian Mono, or data in Commissioner.
- **Don't** fill a microprint rule with placeholder or invented text.
- **Don't** animate anything else on entry. The engraving draw-in is the page's one entrance, and the plate-press wipe is its one transition.
