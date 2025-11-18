# Main page

The main page is a single page containing the complete website for customers of the ironing service irongirl.nl. Users come to the website to find out what services irongirl.nl provides, where it is located and how the pricing works. They can also fill in a contact form.

## Figma:

https://www.figma.com/design/XoWpGTi19gV6LeYqpOJ18n/irongirl-website?node-id=778-23&t=ulcmwZPwN6HNTJg2-4

## Translations:

All texts are in translation files, with useTranslations from 'next-intl' with keys referring to texts in message files for english and dutch. The texts taken from Figma should be put in messages/nl.json and the english translation should be generated and put in messages/en.json. A generated key should be used in the components to refer to the texts.

## Layout structure:

The page is composed of several blocks that are stacked vertically. I will describe each block.

### Header

Contains the logo on the right side. It should also contain the LanguageSwitcher, although this is not present in the Figma design.

### Hero

Contains a background image and text

### Services

Contains 4 ServiceCards. For Washing, Ironing, Contact and Pricing.

### WhatsApp CTA

Contains a link that will open a WhatsApp message to the irongirl WhatsApp (hardcoded to +31612345678)

### Header Container

Contains a header

### Text Container

Contains general information about irongirl.nl

### Image Container

Contains 2 images

### Header Container

Contains a header for 'Our Method'

### Text Container

Contains information about the services that irongirl provides.

### Image Container

Contains 3 images

### Header Container

Contains a header 'Contact'

### Contact Block

Contains a contact form with:

- A Phonenumber
- An address with a google maps icon. Clicking on the icon will open the address in Google Maps
- A Form with FormFields for name and email and a TextAreaField for message and a 'Send' submit button
- Submit posts the `{name, email and message}` fields as json to the `POST /api/mail` backend endpoint

### Image Container

Contains 2 images

### Header Container

Contains a header 'Pricing'

### Pricing Container

Contains 4 PricingTables: Washing, Ironing Women's and men's clothing, Children's clothing up to size 158 and Linens and bedding.

The Figma design currently shows mock data for all PricingRows. Keep the mock data for now.

### Image Container

Contains 2 images

### Footer

Contains a copyright notice, the address and a Google Maps Icon. Clicking on the icon will open the address in Google Maps
