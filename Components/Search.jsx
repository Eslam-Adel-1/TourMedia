"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getUsers } from "@/lib/serverActions";
import SearchResult from "@/Components/SearchResult";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(search);
      setUsers(JSON.parse(response));
    };

    fetchUsers();
  }, [search]);

  return (
    <div className="relative bg-gray-50 rounded-lg flex items-center w-[300px] gap-6 py-1 px-4 shadow-sm">
      <label htmlFor="search">
        <IoSearch color="gray" />
      </label>
      <input
        className="outline-none bg-transparent placeholder-gray-500"
        name="search"
        id="search"
        type="text"
        value={search}
        placeholder="Search For Something"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length > 0 && (
        <div className="absolute top-10 left-3 w-[300px] bg-white shadow-sm rounded-md border border-green-400 p-2 px-3 flex flex-col gap-2">
          {users.length === 0 ? (
            <p className="text-sm text-gray-300">No results found</p>
          ) : (
            users.map((user) => (
              <SearchResult
                key={user.userId}
                image={user.imageUrl}
                first_name={user.first_name}
                last_name={user.last_name}
                userId={user.userId}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
