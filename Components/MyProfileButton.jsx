"use client";

import { useRouter } from "next/navigation";

const MyProfileButton = ({ userId, children, routing, className }) => {
  const router = useRouter();
  return (
    <button
      className={`bg-green-400 text-white border-2 border-green-400 text-sm hover:bg-white hover:border-2 hover:border-green-400 hover:text-green-400 font-semibold py-1 rounded-lg transition duration-300 ${className}`}
      onClick={() => {
        if (routing) {
          router.push(`/${userId}`);
        }
      }}
    >
      {children}
    </button>
  );
};

export default MyProfileButton;
