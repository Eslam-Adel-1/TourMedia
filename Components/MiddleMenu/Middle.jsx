"use server";

import BasicContainer from "../BasicContainer";
import AddPost from "../MiddleMenu/AddPost";
import Post from "./Post";
import ProfileInformation from "./ProfileInformation";
import StoriesContainer from "./StoriesContainer";
import { connect } from "@/MongoDB/mongoConnect";
import PostSchema from "@/MongoDB/Schemas/PostSchema";
import User from "@/MongoDB/Schemas/User";

//=====================================================================

const Middle = async ({ page, id }) => {
  let postarray;
  let finalUsersArray;
  try {
    await connect();

    postarray = await PostSchema.find().sort({ createdAt: -1 }).exec();

    const usersArray = postarray.map((subPost) => {
      return User.findOne({ userId: subPost.userId }).exec();
    });

    finalUsersArray = await Promise.all(usersArray);
  } catch (err) {
    console.error(err);
  }
  //=====================================================================
  return (
    <div className="sm:flex-[0.85] md:flex-[0.75] lg:flex-[0.55]">
      {page === "mainPage" && (
        <>
          <AddPost />
          <StoriesContainer />
        </>
      )}
      {page === "profilePage" && <ProfileInformation id={id} />}

      {/* //=========================================================== */}

      {postarray.length === 0 && (
        <BasicContainer>
          <h3 className="text-green-400 text-center text-lg ">
            No posts are available{" "}
          </h3>
        </BasicContainer>
      )}

      {page === "profilePage" &&
        postarray.map((post, index) => {
          if (post?.userId === id) {
            const user = finalUsersArray.find((user) => {
              return user?.userId === id;
            });
            return (
              <Post
                key={index}
                name={`${
                  user?.first_name === null ? "New" : user?.first_name
                } ${user?.last_name === null ? "User" : user?.last_name}`}
                description={post.content}
                image={user?.imageUrl}
                state={user?.active}
                userId={user?.userId}
                postImage={post?.postImgUrl}
                postVideo={post?.postVidUrl}
                postId={post?._id}
                page={page}
              />
            );
          }
        })}

      {/* //=========================================================== */}
      {page === "mainPage" &&
        postarray.map((post, index) => {
          const user = finalUsersArray.find((user) => {
            return user?.userId === post?.userId;
          });
          return (
            <Post
              key={index}
              name={`${user?.first_name === null ? "New" : user?.first_name} ${
                user?.last_name === null ? "User" : user?.last_name
              }`}
              description={post?.content}
              image={user?.imageUrl}
              state={user?.active}
              userId={user?.userId}
              postImage={post?.postImgUrl}
              postVideo={post?.postVidUrl}
              postId={post?._id}
            />
          );
        })}
    </div>
  );
};

export default Middle;
