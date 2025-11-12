# Tailwind Theme Configuration

> **📖 For complete Tailwind v4 setup information, see [TAILWIND_V4_SETUP.md](../../TAILWIND_V4_SETUP.md)**

This project uses Tailwind CSS v4 with design tokens exported from Figma.

## Theme Structure

The theme is configured using Tailwind v4's `@theme` directive in `src/app/globals.css`. Design tokens from Figma are defined in `src/styles/figma-tokens.css` and integrated into the Tailwind theme.

## Available Tailwind Classes

### Colors

```tsx
// Primary colors
<div className="bg-primary text-primary border-primary" />
<div className="bg-primary-light text-primary-light" />

// Header colors
<div className="bg-header text-header" />
<div className="bg-header-light text-header-light" />

// Base colors
<div className="bg-background text-foreground" />
```

### Typography - Font Families

```tsx
// Hero font (Inria Serif)
<h1 className="font-hero">Hero Heading</h1>

// Base font (Inter) - default for body
<p className="font-sans">Body text</p>

// Header font (Kaisei Tokumin)
<h2 className="font-header">Section Header</h2>
```

### Typography - Font Sizes

```tsx
<p className="text-xs">Extra small (11px)</p>
<p className="text-base">Base (15px)</p>
<p className="text-xl">Extra large (19px)</p>
<p className="text-2xl">2X large (22px)</p>
<p className="text-3xl">3X large (26px)</p>
```

### Line Heights

```tsx
<ul className="leading-list">
  <li>List item with custom line height (30px)</li>
</ul>
```

## Direct CSS Custom Properties

You can also access the design tokens directly via CSS custom properties:

```css
.my-component {
  color: var(--color-primary-500);
  font-family: var(--font-family-hero);
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-list);
}
```

## Example Component

```tsx
export default function HeroSection() {
  return (
    <section className="bg-primary-light p-8">
      <h1 className="font-hero text-3xl text-primary mb-4">
        Welcome to IronGirl
      </h1>
      <p className="font-sans text-base text-foreground leading-list">
        This is an example using our Figma design tokens with Tailwind.
      </p>
    </section>
  );
}
```

## Extending the Theme

To add more design tokens:

1. Update `src/styles/figma-tokens.css` with new CSS custom properties
2. Map them in the `@theme inline` block in `src/app/globals.css`
3. Use them via Tailwind utility classes or direct CSS

## Font Loading

All fonts are loaded automatically via Next.js Google Fonts optimization in `src/app/layout.tsx`:

- **Inter** - Base/body font (variable weight)
- **Inria Serif** - Hero font (300, 400, 700)
- **Kaisei Tokumin** - Header font (400, 500, 700, 800)

Fonts are optimized and self-hosted by Next.js for performance.

## Notes

- This project uses a single default theme (no light/dark mode switching)
- All fonts are loaded from Google Fonts via Next.js font optimization
- Font files are automatically optimized and self-hosted by Next.js
- All colors use hex values as exported from Figma
- Build tested and verified ✓

