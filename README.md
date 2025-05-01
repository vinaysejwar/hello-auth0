This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your Auth0 application:

1. Create an account at [Auth0](https://auth0.com/)
2. Create a new application in the Auth0 dashboard
3. Set the Application Type to "Regular Web Applications"
4. Configure the following URLs:
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
5. Create a `.env.local` file in the root of your project with the following variables:
   ```
   # Auth0 Configuration (Required)
   AUTH0_SECRET='your-long-random-secret-value-at-least-32-characters'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
   AUTH0_CLIENT_ID='your-client-id'
   AUTH0_CLIENT_SECRET='your-client-secret'
   
   # Cookie Configuration (Important to fix state cookie issues)
   # For local development
   COOKIE_SECURE=false
   ```

6. **Important troubleshooting for state cookie errors**:
   - Make sure your Auth0 Secret is at least 32 characters long
   - For local development, set COOKIE_SECURE=false
   - Ensure your browser accepts cookies from localhost
   - Clear your browser cookies before testing again
   - If using Chrome, ensure third-party cookies are not blocked

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication Flow

This project uses the Auth0 Next.js SDK for authentication. The main flow is:

1. Users can log in via `/api/auth/login`
2. After successful login, they are redirected to the dashboard
3. Protected routes are secured via middleware
4. Logout is available via `/api/auth/logout`

## Learn More

To learn more about Next.js and Auth0, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth0 Next.js SDK Documentation](https://auth0.github.io/nextjs-auth0/)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
