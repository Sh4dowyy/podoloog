## Sidefolio - Portfolio website template

As seen on [Aceternity UI](https://ui.aceternity.com/templtes/sidefolio)

## Built with

- Next.js
- Tailwindcss
- Framer motion
- MDX
- Supabase (for authentication and database)

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Run the development server: `npm run dev`

## Environment Variables

For deployment, make sure to set these environment variables in your hosting platform:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Deployment

This project is ready to deploy on Vercel, Netlify, or any other Next.js hosting platform. Make sure to:

1. Set up your environment variables in the hosting platform
2. Connect your Supabase project
3. Follow the setup instructions in `SUPABASE_SETUP.md`

Checkout all the templates at [Aceternity UI](https://ui.aceternity.com/templates)
