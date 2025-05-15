import { getSession } from '@auth0/nextjs-auth0';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';
import type { User } from '../..//lib/auth';

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/api/auth/login');
  }
  
  return (
    <DashboardClient userDetails={session.user as User} />
  );
}