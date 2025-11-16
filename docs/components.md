# Compoment Library

## Button

Type: Atom
Figma: https://www.figma.com/design/XoWpGTi19gV6LeYqpOJ18n/irongirl-website?node-id=735-21&t=szxChMwZboixdunk-4
Variants: Primary
Props: {label: string, onClick: () => void, disabled: boolean}
Allow Children: No
Disabled state: Grayscale of primary color

## TextArea

Type: Atom
Figma: No figma design needed
Props: {placeholder?: string, value?: string, onChange: () => void, disabled: boolean, error: boolean, name: string, id?: string, required: boolean}
Allow Children: No
Remarks: Implement like Input

## Icon

Type: Atom
Figma: No figma design needed
Props: {src: string, alt: string}
Allow Children: No
Remarks: Implementation should be an img

## PricingRow

Type: Molecule
Figma: https://www.figma.com/design/XoWpGTi19gV6LeYqpOJ18n/irongirl-website?node-id=793-12&t=szxChMwZboixdunk-4
Props: {name: string, price: number}
Allow Children: No
Remarks: price property is an integer in cents. Format as euro amount

## PricingTable

Type: Organism
Figma: https://www.figma.com/design/XoWpGTi19gV6LeYqpOJ18n/irongirl-website?node-id=793-78&t=szxChMwZboixdunk-4
Props: {title?: string, subtitle?: string, priceItems: {name: string, price: number}[]}
Allow Children: No
Remarks: title and subtitle are optional. priceItems is a list of name, price objects with which the PricingRow components will be constructed

## TextAreaField

Type: Organism
Figma: No figma design needed
Props: {label: string, id: string, placeholder?: string, errorMessage?: string, disabled: boolean, required: boolean}
Allow Children: No
Remarks: Implement like FormField

## ServiceCard

Type: Organism
Figma: https://www.figma.com/design/XoWpGTi19gV6LeYqpOJ18n/irongirl-website?node-id=575-160&t=NmG7U3zWG0Mzk8Vh-4
Props: {title: string, iconSrc: string, iconAlt: string, description: string, buttonLabel: string, onClick: () => void}
Allow Children: No
Remarks: Use the Icon component for the icon
