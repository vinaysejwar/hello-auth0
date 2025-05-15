'use client';

import { Button } from "antd";
import Image from "next/image";
import type { User } from "../../lib/auth";
import { toast } from "react-toastify";
// import Logout from "@/component/Logout";

interface DashboardClientProps {
  userDetails: User;
}

export default function DashboardClient({ userDetails }: DashboardClientProps) {
  const handleToast = () => {
    toast.success("Hello");
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          {/* <Logout /> */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            {userDetails.picture ? (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                {userDetails.name?.charAt(0).toUpperCase()}
              </div>
            ) : (              
                <Image
                src={userDetails.picture}
                alt={`${userDetails.name}'s profile`}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
                priority
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">
                Welcome {userDetails.name}!
              </h2>
              <p className="text-gray-600">{userDetails.email}</p>
            </div>
          </div>  
          <p>nickname: {userDetails?.nickname}</p>
          <p>name: {userDetails?.name}</p>
          <p>sid: {userDetails?.sid}</p>
          <p>sub: {userDetails?.sub}</p>
          <p>updated_at: {userDetails?.updated_at.toString()}</p>
          <p>id: {userDetails?.id || "N/A"}</p>
          <p>auth0_id: {userDetails?.auth0_id || "N/A"}</p>


          <Button type="primary" onClick={handleToast}>
            Show Toast
          </Button>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">
              Your Account Information
            </h3>
            <p className="text-gray-700">
              You have successfully logged in with Auth0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 