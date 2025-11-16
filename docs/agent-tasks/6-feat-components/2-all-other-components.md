# Task

I want you to create React components for all components described in @components.md, except for the Button component. Use the Figma MCP with the figma links in the document to get information about the component requirements. Correctly use the font and color from the theme, and border radius and other props from Figma. Implement the props and states given in the document. Also create stories for each component.

# Answer

I'll help you create all the components described in the document. Let me start by fetching the Figma designs for the components that have Figma links, then implement each component with its stories.

[4 tools called]

Now I'll create all the components. Let me start by creating the atoms, then molecules, and finally organisms.

[12 tools called]

Now let me update the index files to export the new components:

[6 tools called]

Now let me check for any linting errors in the new files:

[1 tool called]

Perfect! All components have been created successfully with no linting errors. Let me create a summary of what was implemented:

## Summary

I've successfully created all the components from `components.md` (except Button which already existed):

### Atoms Created:

1. **TextArea** - A textarea input component similar to the Input component
   - Props: `placeholder`, `value`, `onChange`, `disabled`, `error`, `name`, `id`, `required`
   - Includes error and disabled states
   - Story file with multiple variants

2. **Icon** - Simple image component for displaying icons
   - Props: `src`, `alt`
   - Story file with examples using existing SVG icons

### Molecules Created:

3. **PricingRow** - Displays a service name and price in a row with border
   - Props: `name` (string), `price` (number in cents)
   - Automatically formats price from cents to euros with proper formatting (€16,50)
   - Follows Figma design with border-bottom, justified spacing
   - Story file with various examples

### Organisms Created:

4. **PricingTable** - A card displaying pricing information
   - Props: `title` (optional), `subtitle` (optional), `priceItems` (array)
   - Uses the PricingRow molecule for each item
   - Pink background (`bg-primary-400`), rounded corners (5px)
   - Follows Figma design specifications
   - Story file with multiple scenarios

5. **TextAreaField** - Complete form field with label and textarea
   - Props: `label`, `id`, `placeholder`, `errorMessage`, `disabled`, `required`, `value`, `onChange`
   - Combines Label and TextArea atoms
   - Shows error messages below the field
   - Story file demonstrating all states

6. **ServiceCard** - Service display card with icon, description, and button
   - Props: `title`, `iconSrc`, `iconAlt`, `description`, `buttonLabel`, `onClick`
   - Uses Icon and Button components
   - Pink background (`bg-primary-400`), rounded corners (30px)
   - Follows Figma design specifications
   - Story file with multiple service examples

All components:

- ✅ Follow the project's Tailwind styling approach
- ✅ Use proper design tokens (colors, fonts, spacing)
- ✅ Include TypeScript interfaces with proper documentation
- ✅ Have comprehensive Storybook stories
- ✅ Are exported from their respective index files
- ✅ Pass all linting checks
- ✅ Follow the functional component with hooks pattern
- ✅ Match Figma designs for styling (border-radius, colors, spacing)

You can now view and test all these components in Storybook!

# Fix 1

The ServiceCard has backgroundColor: color-primary-400, and a border radius. I don't see that in storybook

# Answer

Let me check the Figma tokens and the ServiceCard implementation to fix this issue:

[7 tools called]

I see the issue! Looking at the `globals.css` file, the Tailwind theme uses `primary-light` for the 400 shade, not `primary-400`. The Button component uses `bg-primary` which works, but I need to use `bg-primary-light` for the lighter pink color.

Let me fix the ServiceCard and PricingTable components:

[3 tools called]

Perfect! I've fixed the issue. The problem was that I was using `bg-primary-400` which isn't defined in the Tailwind theme. The correct class name is `bg-primary-light` which maps to `--color-primary-400` (#fdeef5 - the light pink color).

**Changes made:**

- Updated `ServiceCard.tsx` to use `bg-primary-light` instead of `bg-primary-400`
- Updated `PricingTable.tsx` to use `bg-primary-light` instead of `bg-primary-400`

Now both components will properly display:

- ✅ Light pink background color (#fdeef5)
- ✅ Border radius (30px for ServiceCard, 5px for PricingTable)

The components should now render correctly in Storybook with the proper styling from your design tokens!

# Fix 2

I need you to use semantic header elements in ServiceCard and PricingTable Components. ServiceCard title should be h2, PricingTable title should be h3 and subtitle h4

# Answer

I'll update both components to use semantic header elements instead of paragraph tags for the titles.

[3 tools called]

Perfect! I've updated both components to use semantic header elements:

**ServiceCard:**

- Title now uses `<h2>` instead of `<p>`

**PricingTable:**

- Title now uses `<h3>` instead of `<p>`
- Subtitle now uses `<h4>` instead of `<p>`

This improves accessibility and SEO by using proper semantic HTML structure. The visual styling remains exactly the same with all the Tailwind classes preserved.
