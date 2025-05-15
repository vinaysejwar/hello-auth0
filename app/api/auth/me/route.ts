import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

declare module '@auth0/nextjs-auth0' {
    interface User {
      name: string;
      email: string;
      picture?: string;
      sub?: string;
      sid?: string;
      updated_at?: Date;
      nickname?: string;
      id?: number;
      auth0_id?: string
    }
  }

export const runtime = 'edge';

export async function GET() {
  const session = await getSession();
  return NextResponse.json(session?.user ?? null);
}