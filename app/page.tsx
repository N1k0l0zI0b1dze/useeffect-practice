"use client";

import { User } from "@/components/types/users.types";
import { Search, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState<User[]>([]); // API data
  const [loading, setLoading] = useState(true); // request მიმდინარეობს?
  const [error, setError] = useState(""); // error message

  useEffect(() => {
    // component-ის mount-ზე ერთხელ ვუშვებთ request-ს
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response body-ს JSON-ად ვაქცევთ
        return response.json();
      })
      .then((data) => {
        // მიღებულ users-ს state-ში ვინახავთ
        setUsers(data);
      })
      .catch((error) => {
        // request-ის ჩავარდნისას error message ვინახავთ
        setError(error.message);
      })
      .finally(() => {
        // success/error-ის მიუხედავად loading დასრულდა
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

        <div className="w-full h-100 rounded-[10px] mt-7.5 custom-scrollbar overflow-y-auto py-0.5">
          <ul className="w-full h-auto flex flex-col ">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex flex-row items-center w-full h-15 border rounded-[10px] border-gray-400 px-2"
              >
                <UserRound width={35} height={35} className="text-gray-700" />
                <div className="flex flex-col justify-center leading-4 ml-2">
                  <p className="text-[16px] font-medium">{user.name}</p>
                  <p className="text-[12px] font-medium text-gray-400">
                    {user.email}
                  </p>
                </div>

                <button className="ml-auto w-25 h-7.5 border-none text-[14px] rounded-[5px] font-semibold cursor-pointer text-blue-700 bg-blue-200 hover:bg-blue-50">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
