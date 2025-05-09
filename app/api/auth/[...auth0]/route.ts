import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const runtime = 'nodejs';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/',
    authorizationParams: {
      prompt: 'login'
    }
  }),
  logout: handleLogout({
    returnTo: process.env.AUTH0_BASE_URL || '/'
  })
});