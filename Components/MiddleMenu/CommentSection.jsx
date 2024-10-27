import CommentInput from "../MiddleMenu/CommentInput";
import CommentList from "../MiddleMenu/CommentList";
import InteractionSection from "./InteractionSection";

const CommentSection = ({ postId, userId, page }) => {
  return (
    <div>
      <InteractionSection postId={postId} page={page} />
      <CommentInput postId={postId} page={page} />
      <CommentList postId={postId} userId={userId} />
    </div>
  );
};

export default CommentSection;
