import BasicContainer from "../BasicContainer";
import EditPost from "../EditPost";
import CommentSection from "../MiddleMenu/CommentSection";
import PostUserClick from "../RightSideMenu/PostUserClick";
import ShowPostImage from "../ShowPostImage";

const Post = ({
  name,
  state = false,
  image,
  description,
  postImage,
  userId,
  postId,
  page,
  postVideo,
}) => {
  return (
    <BasicContainer>
      <div className="flex items-center justify-between">
        <PostUserClick
          userId={userId}
          image={image}
          name={name}
          state={state}
        />
        <EditPost postId={JSON.stringify(postId)} />
      </div>
      <div className="w-full my-2">
        <p>{description}</p>
      </div>

      {(postVideo || postImage) && (
        <ShowPostImage postVideo={postVideo} postImage={postImage} />
      )}

      <CommentSection postId={postId} userId={userId} page={page} />
    </BasicContainer>
  );
};

export default Post;
