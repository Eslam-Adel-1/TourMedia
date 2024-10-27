"use client";
import { addComment } from "@/lib/serverActions";
import { LuSend } from "react-icons/lu";
import { useRef } from "react";

const CommentInputField = ({ postId, page }) => {
  //================================================================
  let processedPostId = JSON.parse(postId);
  const ref = useRef();

  const handleSubmit = async (formData) => {
    await addComment(formData, processedPostId, page);
    ref?.current?.reset();
  };
  //================================================================

  return (
    <form
      action={handleSubmit}
      className="flex-1 flex items-center bg-gray-100 rounded-[50px] overflow-hidden h-fit pr-4"
      ref={ref}
    >
      <input
        className="outline-none placeholder-gray-400 bg-transparent py-2 px-4 w-full"
        placeholder="Write a comment"
        name="content"
      />
      <button>
        <LuSend className="text-gray-400 cursor-pointer text-lg" />
      </button>
    </form>
  );
};

export default CommentInputField;
