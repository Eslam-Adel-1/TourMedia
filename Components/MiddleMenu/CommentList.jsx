import Comment from "../MiddleMenu/Comment";
import CommentSchema from "@/MongoDB/Schemas/CommentSchema";

const CommentList = async ({ postId }) => {
  let comments;
  try {
    comments = await CommentSchema.find({ postId });
  } catch (err) {
    throw new Error(err.message);
  }

  return (
    <>
      <div className=" w-full h-[1px] bg-gray-200 mt-4"></div>

      <h3 className="font-medium text-gray-400 my-3">Comments</h3>
      {comments.map((item, index) => {
        return (
          <Comment
            content={item.content}
            commenterId={item.userId}
            key={index}
          />
        );
      })}
    </>
  );
};

export default CommentList;
