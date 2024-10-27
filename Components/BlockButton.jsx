"use client";
import { blockFriend } from "@/lib/serverActions";

const BlockButton = ({ id, isFriendBlocked }) => {
  return (
    <form
      action={() => {
        blockFriend(id);
      }}
      className="flex w-full"
    >
      <button className="text-center text-red-500 text-sm mt-2 cursor-pointer flex-end">
        {isFriendBlocked ? "Unblock user" : "Block user"}
      </button>
    </form>
  );
};

export default BlockButton;
