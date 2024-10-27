"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PostUserClick = ({ userId, name, state, image }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push(`/${userId}`)}
    >
      <div className="border-sky-100">
        <Image
          src={image}
          alt="profile-image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-sm font-semibold -mb-1">{name}</h3>
        {state ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 bg-green-600 rounded-full"></div>
            <p className="text-[12px] text-gray-500">Online</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            <p className="text-[12px] text-gray-500">Offline</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostUserClick;
