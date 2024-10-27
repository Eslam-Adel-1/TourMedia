import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import User from "@/MongoDB/Schemas/User";
import CommentInputField from "../CommentInputField";

const CommentInput = async ({ postId, page }) => {
  const { userId } = auth();
  let user;

  try {
    user = await User.findOne({ userId });
  } catch (err) {
    console.error(err.message);
  }

  return (
    <>
      <div className="flex items-center gap-2 mt-3">
        <div className="border-sky-100">
          <Image
            src={user.imageUrl}
            alt="profile-image"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full"
          />
        </div>
        <CommentInputField postId={JSON.stringify(postId)} page={page} />
      </div>
    </>
  );
};

export default CommentInput;
