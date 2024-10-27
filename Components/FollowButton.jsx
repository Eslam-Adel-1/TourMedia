"use client";

import { sendFriendRequest } from "@/lib/serverActions";

import { useFormStatus } from "react-dom";
const FollowButton = ({ id, isFollowRequest, isFollowed }) => {
  //================================================================
  const { pending } = useFormStatus();
  return (
    <form className="w-full" action={() => sendFriendRequest(id)}>
      <button className="w-full bg-green-400 text-white border-2 border-green-400 text-sm hover:bg-white hover:border-2 hover:border-green-400 hover:text-green-400 font-semibold py-1 rounded-lg transition duration-300">
        {pending ? (
          <>
            <div
              class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-white"
              role="status"
              aria-label="loading"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </>
        ) : isFollowRequest ? (
          "Follow request sent "
        ) : isFollowed ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </button>
    </form>
  );
};

//================================================================

export default FollowButton;
