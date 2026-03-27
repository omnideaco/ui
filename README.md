> **[Omnidea](https://github.com/omnideaco/omnidea)** / **[Ore](https://github.com/omnideaco/ore)** / **UI** · For AI-assisted development, see [Ore CLAUDE.md](https://github.com/omnideaco/ore/blob/main/CLAUDE.md).

# @omnidea/ui

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE.md) [![GitHub Stars](https://img.shields.io/github/stars/omnideaco/ui)](https://github.com/omnideaco/ui/stargazers) [![Governed by the Covenant](https://img.shields.io/badge/Governed_by-The_Covenant-gold.svg)](https://github.com/omnideaco/covenant) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

Omnidea design system. 41 Solid.js components with two visual modes: **neu** (flat surfaces) and **crystal** (WebGPU glass via `@omnidea/crystal`).

## Usage

```typescript
import { Theme, Button, Card, Input } from '@omnidea/ui';

function App() {
  return (
    <Theme mode="neu" aspect="dark">
      <Card>
        <Input placeholder="Search..." />
        <Button>Submit</Button>
      </Card>
    </Theme>
  );
}
```

Crystal mode (requires `@omnidea/crystal`):

```typescript
import { Theme, Card } from '@omnidea/ui';
import { Crystal } from '@omnidea/crystal';

const crystal = await Crystal.init();

<Theme mode="crystal" crystal={crystal}>
  <Card>Glass card with WebGPU effects</Card>
</Theme>
```

## Components

### Layout (4)
`Stack`, `Grid`, `Container`, `Section`

### Atoms (12)
`Icon`, `Spinner`, `Divider`, `Badge`, `Avatar`, `Image`, `Checkbox`, `Tag`, `Link`, `Skeleton`, `EmptyState`

### Components (23)
`Button`, `Card`, `Input`, `TextArea`, `Select`, `Toggle`, `Modal`, `Dropdown`, `Tooltip`, `Tabs`, `Accordion`, `ImageSlider`, `Sidebar`, `SearchBar`, `Breadcrumb`, `TreeView`, `Toolbar`, `ContextMenu`, `Popover`, `Toast`, `ConfirmDialog`, `List`

### Crystal (2)
`GlassPane`, `GlassCard` -- WebGPU glass-backed containers (only render glass in crystal mode)

### Theme
`Theme` -- wraps the app, provides mode/aspect/tokens to all children

## Theme System

Two modes with light/dark aspects:
- **neu** -- flat surfaces, shadows, standard CSS
- **crystal** -- WebGPU glass rendering via `@omnidea/crystal` (optional peer dep)

Tokens control colors (Ember), borders (Crest), spacing (Span), typography (Glyph/Inscription), elevation (Arch), and shadows (Shadow/Umbra).

```typescript
import { useTheme, themeMode, themeAspect } from '@omnidea/ui';
import { defaultTokens, mergeTheme } from '@omnidea/ui';
```

## Exports

Also exports token types, CSS variable utilities, and theme merge helpers:

```typescript
import type { ThemeMode, Aspect, ThemeConfig, Ember, Crest } from '@omnidea/ui';
import { tokensToCSSVars, emberToHex, modeClass } from '@omnidea/ui';
```

## Icons

Uses [Remix Icon](https://remixicon.com/) (open source). CSS classes: `ri-{name}-{fill|line}`.

## Distribution

Source-distributed (`"main": "./src/lib/index.ts"`). No build step needed for consumers. Import directly from source. The `npm run build` step only regenerates `theme.css` from design tokens.

## Requirements

- `solid-js` peer dependency
- `@omnidea/crystal` optional peer dependency (only needed for crystal mode)

## License

Licensed under the Omninet Covenant License.
