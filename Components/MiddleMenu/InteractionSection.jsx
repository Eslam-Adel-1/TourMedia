import { BiCommentDetail } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import LikeButton from "../LikeButton";
import CommentSchema from "@/MongoDB/Schemas/CommentSchema";
import Like from "@/MongoDB/Schemas/Likes";
import { auth } from "@clerk/nextjs/server";

const InteractionSection = async ({ postId, page }) => {
  const { userId } = auth();

  let comments;
  let likes;
  let isLiked;

  try {
    comments = await CommentSchema.find({ postId });
    likes = await Like.find({ postId });
    isLiked = await Like.findOne({ userId, postId });
  } catch (err) {
    throw new Error(`something went wrong  ----  ${err.message}`);
  }
  return (
    <div className="flex items-center justify-between px-2 my-1 flex-wrap">
      <div className="flex item-center gap-6 m-1">
        <LikeButton
          postId={JSON.stringify(postId)}
          likes={likes.length}
          isLiked={isLiked?.length === 0 || isLiked === null ? false : true}
          page={page}
        />
        <div className="flex items-center gap-2 w-fit cursor-pointer m-1">
          <BiCommentDetail className="text-green-500 text-[19px]" />
          <p className="text-[13px] text-gray-400">
            <span>{comments.length}</span> Comments
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 w-fit cursor-pointer m-1">
          <TbShare3 className="text-gray-500 text-[19px]" />
          <p className="text-[13px] text-gray-400">Share</p>
        </div>
      </div>
    </div>
  );
};

export default InteractionSection;
