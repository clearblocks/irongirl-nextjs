This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Using Docker (Recommended)

Start all services including Next.js, PostgreSQL, and Storybook:

```bash
docker-compose up
```

- Next.js app: http://localhost:3000
- Storybook: http://localhost:6006

To start individual services:

```bash
# Start only Next.js
docker-compose up nextjs

# Start only Storybook
docker-compose up storybook
```

### Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Storybook

This project includes Storybook v10.0.6 for component development and documentation.

### Running Storybook

```bash
# Using Docker
docker-compose up storybook

# Or locally
npm run storybook
```

Visit http://localhost:6006 to browse the component library.

**Note**: This setup uses Storybook v10.0.6 for Next.js 16 support. Some addons (like MDX support) are not yet available at this version. See [docs/STORYBOOK_LIMITATIONS.md](docs/STORYBOOK_LIMITATIONS.md) for details.

For detailed Storybook documentation, see [docs/STORYBOOK.md](docs/STORYBOOK.md).

### Demo Components

The project includes demo components to showcase the setup:

- **Atoms**: Button, Input, Label
- **Molecules**: FormField, Card

All components have corresponding Storybook stories with interactive controls.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
