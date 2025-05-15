 
// import { redirect } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
export default async function AdminPage() {
    const session = await getSession(); // ✅ This matches your `auth()` setup
    const user = session?.user;
  
    // 🔒 Local logic to allow only admin
    if (!user || user.email !== 'vinay.shantiinfotech+10@gmail.com') {
      redirect('/');
    }
  
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p>Welcome, {user.name}!</p>
        <p>You have admin access.</p>
      </main>
    );
  }
  