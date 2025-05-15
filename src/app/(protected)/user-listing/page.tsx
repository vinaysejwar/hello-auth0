"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";

export const dynamic = 'force-dynamic';

type User = {
    _id: string;
    fullName: string;
    email: string;
  };
const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const data = await getUsers();
    console.log("Fetched users:", data);
    setUsers(data?.data); // ✅ Use data directly
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 
  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users Todo list</h1>

      <ul className="space-y-2">
      {users.map((user: User, index: number) => (
        <li key={user._id || `user-${index}`} className="border p-2 rounded">
            {user.fullName} ({user.email})

            {/* <span className="" onClick={deleteHandler}>Delete</span> */}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
