"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Logout from "./Logout";
import { Button } from "antd";
export default function Navbar() {
  const { user } = useUser();

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/dashboard"
                className="text-xl font-bold text-gray-800"
              >
                Admin Panel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="border-b-2 border-transparent hover:border-blue-500 inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
              <Link
                href="/user-listing"
                className="border-b-2 border-transparent hover:border-blue-500 inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                Users
              </Link>
            </div>
          </div>

          {/* User profile section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
               {typeof user.picture === 'string' && user.picture !== '' ? (
                <Image
                  src={user.picture}
                  alt={`${user.name}'s profile`}
                  className="h-8 w-8 rounded-full"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
                <span className="text-gray-700">{user.name}</span>
                <Logout />
              </div>
            ): (
                <Button type="primary" onClick={handleLogin} className="">Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
