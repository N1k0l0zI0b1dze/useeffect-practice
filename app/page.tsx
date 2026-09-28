"use client";

import { User } from "@/components/types/users.types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-300">
      <div className="flex flex-col items-center w-175 h-125 bg-white rounded-[10px] mt-10 py-3 px-6">
        <div className="w-full h-auto flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-black">
              Users Directory
            </h2>
            <p className="text-sm text-gray-400 font-semibold">
              Browse and view user details
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-md bg-blue-100 border border-gray-300 py-2 pr-3 pl-10 outline-none"
            />
          </div>
        </div>

        <div className="w-full h-100 rounded-[10px] mt-7.5 bg-blue-400">
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
