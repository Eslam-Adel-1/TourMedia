"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const FriendRequestButton = ({ id, name, avatar }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push(`/${id}`)}
    >
      <Image
        src={avatar}
        alt="friend-request-avatar"
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
      />
      <p className="font-semibold text-[12px]">
        {name.length > 13 ? name.slice(0, 12) + " ..." : name}
      </p>
    </div>
  );
};

export default FriendRequestButton;
