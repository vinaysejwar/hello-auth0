'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/component/Navbar";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/user-listing');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-full flex items-center justify-center max-h-[calc(100vh_-_64px)]">
        <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      </div>
    </div>
  );
}
