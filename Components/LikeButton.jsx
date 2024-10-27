"use client";

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { addOrRemoveLike } from "@/lib/serverActions";

const LikeButton = ({ postId, isLiked, likes, page }) => {
  let processedPostId = JSON.parse(postId);
  return (
    <div
      className="flex items-center gap-2 w-fit cursor-pointer"
      onClick={() => addOrRemoveLike(processedPostId, page)}
    >
      {isLiked ? (
        <AiFillLike className="text-blue-500 text-[20px]" />
      ) : (
        <AiOutlineLike className="text-blue-500 text-[20px]" />
      )}
      <p className="text-[13px] text-gray-400">
        <span>{likes}</span> Likes
      </p>
    </div>
  );
};

export default LikeButton;
