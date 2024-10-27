"use server";

import { connect } from "@/MongoDB/mongoConnect";
import User from "@/MongoDB/Schemas/User";
import PostSchema from "@/MongoDB/Schemas/PostSchema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import FollowRequest from "@/MongoDB/Schemas/FollowRequest";
import Follower from "@/MongoDB/Schemas/Follower";
import Block from "@/MongoDB/Schemas/Block";
import CommentSchema from "@/MongoDB/Schemas/CommentSchema";
import Like from "@/MongoDB/Schemas/Likes";
import Story from "@/MongoDB/Schemas/Story";

//=======================================================================

export const addPost = async (
  formData,
  postImgUrl = null,
  postVidUrl = null
) => {
  const { userId } = auth();

  try {
    const description = formData.get("description");
    connect();

    const user = await User.findOne({ userId });

    const post = new PostSchema({
      userId: userId,
      content: description,
      postImgUrl: postImgUrl,
      postVidUrl: postVidUrl,
    });

    post.save();
    revalidatePath("/");
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const sendFriendRequest = async (recieverId) => {
  const { userId } = auth();
  const senderId = userId;

  try {
    connect();
    const reciever = await User.findOne({ userId: recieverId });
    const sender = await User.findOne({ userId: senderId });

    if (reciever && sender) {
      const existingFollow = await Follower.findOne({
        followerId: senderId,
        followedId: recieverId,
      });
      if (existingFollow) {
        await Follower.deleteOne({
          followerId: senderId,
          followedId: recieverId,
        });
      } else {
        const existingFollowRequest = await FollowRequest.findOne({
          sender: senderId,
          receiver: recieverId,
        });

        if (existingFollowRequest) {
          await FollowRequest.deleteOne({
            sender: senderId,
            receiver: recieverId,
          });
        } else {
          const request = new FollowRequest({
            sender: senderId,
            receiver: recieverId,
          });
          request.save();
        }
      }
    }
    revalidatePath(`/${recieverId}`);
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const addFriend = async (followerId) => {
  const { userId } = auth();

  try {
    connect();
    const followed = await User.findOne({ userId });
    const follower = await User.findOne({ userId: followerId });
    if (followed && follower) {
      const follow = new Follower({
        followerId: followerId,
        followedId: userId,
      });
      follow.save();

      await FollowRequest.deleteOne({ sender: followerId, receiver: userId });

      revalidatePath("/");
    } else {
      console.error("something went wrong");
    }
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const ignoreFriend = async (senderId) => {
  const { userId } = auth();

  try {
    connect();
    const reciever = await User.findOne({ userId });
    const sender = await User.findOne({ userId: senderId });
    if (sender && reciever) {
      await FollowRequest.deleteOne({ sender: senderId, receiver: userId });
      revalidatePath("/");
    } else {
      console.error("something went wrong");
    }
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const blockFriend = async (blockedId) => {
  const { userId } = auth();

  try {
    connect();
    const blocked = await User.findOne({ userId: blockedId });
    const blocker = await User.findOne({ userId });
    if (blocker && blocked) {
      const existingBlock = await Block.findOne({
        blocker: userId,
        blocked: blockedId,
      });
      if (existingBlock) {
        await Block.deleteOne({ blocker: userId, blocked: blockedId });
        revalidatePath(`/${blockedId}`);
      } else {
        const blockAction = new Block({ blocker: userId, blocked: blockedId });
        blockAction.save();
        await FollowRequest.deleteOne({ sender: blockedId, receiver: userId });
        await FollowRequest.deleteOne({ sender: userId, receiver: blockedId });
        await Follower.deleteOne({ followerId: blockedId, followedId: userId });
        await Follower.deleteOne({ followerId: userId, followedId: blockedId });
        revalidatePath(`/${blockedId}`);
      }
    } else {
      console.error("something went wrong");
    }
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const addComment = async (formData, postId, page) => {
  const { userId } = auth();
  const content = formData.get("content");

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user need to be authenticated");
    }
    const comment = new CommentSchema({
      userId,
      content,
      postId,
    });
    if (page === "mainPage") {
      // revalidatePath("")
    } else {
      revalidatePath("/");
    }

    comment.save();
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const addCoverImage = async (coverImgUrl) => {
  const { userId } = auth();

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    await User.updateOne({ userId }, { coverImgUrl });

    revalidatePath(`/${userId}`);
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const addOrRemoveLike = async (postId, page) => {
  const { userId } = auth();

  try {
    connect();
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      await Like.deleteOne({ userId, postId });
    } else {
      const like = new Like({ userId, postId });
      like.save();
    }

    if (page === "mainPage") {
      // revalidatePath("")
    } else {
      revalidatePath("/");
    }
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const addStory = async (storyImgUrl) => {
  const { userId } = auth();

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    const story = new Story({ userId, storyImgUrl });
    story.save();

    revalidatePath(`/`);
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const updateUserInfo = async (formData) => {
  const { userId } = auth();
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const school = formData.get("University/School");
  const description = formData.get("description");
  const city = formData.get("address");
  const work = formData.get("work");

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    await User.updateOne(
      { userId },
      {
        first_name: first_name.length !== 0 ? first_name : user.first_name,
        last_name: last_name.length !== 0 ? last_name : user.last_name,
        city: city.length !== 0 ? city : user.city,
        work: work.length !== 0 ? work : user.work,
        school: school.length !== 0 ? school : user.school,
        description: description.length !== 0 ? description : user.description,
      }
    ).exec();

    revalidatePath(`/${userId}`);
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================

export const deletePost = async (postId) => {
  const { userId } = auth();

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    await PostSchema.deleteOne({ userId, _id: JSON.parse(postId) });
    await CommentSchema.deleteMany({ postId: JSON.parse(postId) });
    await Like.deleteMany({ postId: JSON.parse(postId) });

    revalidatePath(`/`);
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================
export const editPost = async (formData, postId) => {
  const { userId } = auth();

  const content = formData.get("content");

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    await PostSchema.updateOne(
      { _id: JSON.parse(postId), userId },
      {
        content: content.length !== 0 ? content : post.content,
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================
export const getPost = async (postId) => {
  const { userId } = auth();

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    const postInfo = await PostSchema.findOne({ _id: JSON.parse(postId) });
    return JSON.stringify(postInfo);
  } catch (err) {
    console.error(err.message);
  }
};

//=======================================================================
export const getUsers = async (text) => {
  const { userId } = auth();

  const regexExpression = new RegExp(text, "i");

  try {
    connect();
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("user needs to be authenticated");
    }
    const usersInfo = await User.find({
      $or: [
        {
          first_name: { $regex: regexExpression },
        },
        {
          last_name: { $regex: regexExpression },
        },
      ],
    });
    return JSON.stringify(usersInfo);
  } catch (err) {
    console.error(err.message);
  }
};
