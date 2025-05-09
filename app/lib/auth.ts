import { getSession } from '@auth0/nextjs-auth0';

// For server components (Node.js runtime)
export async function getServerSession() {
  try {
    const session = await getSession();
    return session;
  } catch (err) {
    console.error("Failed to fetch session:", err);
    return null;
  }
}

// For Edge runtime (middleware, route handlers)
export async function getEdgeSession() {
  try {
    const session = await getSession();
    return session?.user || null;
  } catch (error) {
    console.error('Edge session error:', error);
    return null;
  }
}

// Type for the user object
export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  sub: string;
} 