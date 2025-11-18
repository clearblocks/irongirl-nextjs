# Fix 1 - Icons

I am getting the error: 'Error: Image with src "/images/icon-washing.png" is missing required "width" property.' Check if all images are correct

# Answer

I see the issue. The Next.js Image component requires either explicit `width` and `height` properties, or the `fill` property. Let me check how the Icon component is implemented and fix the images throughout the page.

[2 tools called]

I found the issue! The `Icon` component doesn't have `width` and `height` props, which are required by Next.js Image. Let me fix this:

[1 tool called]

Now let me check the ServiceCard component to see if it needs updating, and also verify all Image usages in the page:

[2 tools called]

I need to fix the ServiceCard to pass proper dimensions to the Icon. Let me also check all image usages in the page:

[2 tools called]

I found the issue! Several Image components are missing the `fill` prop. Let me fix all of them:

[6 tools called]

All the Image components in the page already have the `fill` prop. The issue is with the ServiceCard component - it wraps the Icon in a container but doesn't pass dimensions to the Icon. Let me update ServiceCard to accept icon dimensions:

[2 tools called]

Now let me update the page to pass proper icon dimensions for each service card based on the Figma design:

[2 tools called]

Perfect! Now I need to update the Storybook stories for ServiceCard and Icon since I added new props:

[7 tools called]

Perfect! I've fixed all the image issues. Here's what was wrong and what I fixed:

## ✅ Fixed Image Issues

### **Root Cause**
Next.js Image components require either:
- Explicit `width` and `height` properties, OR
- The `fill` property with a container that has explicit dimensions

### **What I Fixed**

1. **Updated Icon Component** (`src/components/atoms/Icon.tsx`)
   - Added optional `width` and `height` props
   - Set default values of 50x50 pixels
   - Now properly passes dimensions to Next.js Image

2. **Updated ServiceCard Component** (`src/components/organisms/ServiceCard.tsx`)
   - Added optional `iconWidth` and `iconHeight` props
   - Passes these dimensions to the Icon component
   - Removed hardcoded container dimensions

3. **Updated Homepage** (`src/app/[locale]/page.tsx`)
   - Added proper icon dimensions for each service card based on Figma design:
     - Washing: 42x46
     - Ironing: 57x57
     - Contact: 44x44
     - Pricing: 53x53

4. **Updated Storybook Stories**
   - Added the new props to Icon.stories.tsx and ServiceCard.stories.tsx
   - Ensured examples have proper dimensions

5. **Verified Other Images**
   - All other Image components in the page already use the `fill` prop with proper container dimensions
   - Logo, hero background, WhatsApp CTA, Google Maps icons, and all content images are correctly configured

All images now have the required dimensions, and there should be no more warnings about missing width/height properties. The page should render properly! 🎉

# Fix 2 - Image height

Images 3,4,5,6,7,8 and 9 are not shown in full height but cropped in their height. This is because the fixed height is taken from Figma. Change the styling of these images so that they are shown page wide with their full height keeping their original ratio.

# Answer

I can see the issue. Images 3-9 have fixed heights which causes them to crop. Let me fix this by removing the fixed heights and allowing the images to maintain their natural aspect ratios while being full width.

[5 tools called]

Perfect! I've fixed images 3-9 so they now display at full width with their complete height, maintaining their original aspect ratios without any cropping.

## What I Changed:

**Before:**
- Images used `fill` prop with fixed height containers (e.g., `h-[196px]`, `h-[271px]`)
- This caused the images to be cropped to fit the fixed container heights
- Using `object-cover` made them fill the container, cutting off parts of the image

**After:**
- Removed the fixed-height container divs
- Used explicit `width` and `height` props on the Image component (800x400 as base values)
- Added `className="w-full h-auto"` to make images:
  - Full page width (`w-full`)
  - Automatically calculated height to maintain aspect ratio (`h-auto`)
- Images now display their full content without cropping

Now images 3-9 will show their complete content at full page width, automatically adjusting their height to maintain the original image proportions. This is the same responsive behavior as images 1-2, just using a different approach that works better when you don't know the exact aspect ratio in advance.

