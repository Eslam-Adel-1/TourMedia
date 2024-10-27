import Image from "next/image";
import BasicContainer from "../BasicContainer";
import User from "@/MongoDB/Schemas/User";
import PostSchema from "@/MongoDB/Schemas/PostSchema";
import Follower from "@/MongoDB/Schemas/Follower";
import { auth } from "@clerk/nextjs/server";
import CoverImageButton from "../CoverImageButton";
import placeHolderCoverImage from "@/assets/images/CoverImage.jpg";
//===================================================================

const ProfileInformation = async ({ id }) => {
  const { userId: currentUser } = auth();

  const userId = id;
  let user;
  let user2;
  let posts;
  let followedArray = [];
  let followingArray = [];

  try {
    if (!userId) throw new Error("you need to be authenticated");

    user2 = await User.findOne({ userId: currentUser });
    user = await User.findOne({ userId });
    followingArray = await Follower.find({ followerId: userId }).exec();
    followedArray = await Follower.find({ followedId: userId }).exec();
    posts = await PostSchema.find({ userId });
  } catch (err) {
    throw new Error("something went wrong");
  }

  //===================================================================
  return (
    <BasicContainer className="bg-gray-200">
      <div className="flex flex-col items-center">
        {userId === currentUser ? (
          <CoverImageButton coverImage={user2.coverImgUrl} />
        ) : (
          <div className="w-full rounded-sm overflow-hidden">
            <Image
              src={user.coverImgUrl || placeHolderCoverImage}
              alt="profile-cover-image"
              width={500}
              height={500}
              className="w-full h-36"
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-2 -mt-11">
          <Image
            src={user.imageUrl}
            alt="profile-image"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full"
          />

          <div className="flex items-center gap-3">
            <div
              className={`h-4 w-4 ${
                user.active ? "bg-green-500" : "bg-gray-400"
              } rounded-full`}
            ></div>
            <h3 className="font-bold text-xl">{`${
              user.first_name === null ? "New" : user.first_name
            } ${user.last_name === null ? "User" : user.last_name}`}</h3>
          </div>
          <div className="flex items-center gap-11">
            <div className="flex flex-col items-center">
              <h3 className="font-bold ">{posts.length}</h3>
              <p className="text-sm text-gray-500 font-semibold">Posts</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-bold ">{followingArray.length}</h3>
              <p className="text-sm text-gray-500 font-semibold">Following</p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-bold ">{followedArray.length}</h3>
              <p className="text-sm text-gray-500 font-semibold">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </BasicContainer>
  );
};

export default ProfileInformation;
