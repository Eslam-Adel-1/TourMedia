import BasicContainer from "../BasicContainer";
import { IoLocationSharp } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineWork } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import FollowButton from "../FollowButton";
import { auth } from "@clerk/nextjs/server";
import User from "@/MongoDB/Schemas/User";
import FollowRequest from "@/MongoDB/Schemas/FollowRequest";
import Follower from "@/MongoDB/Schemas/Follower";
import BlockButton from "../BlockButton";
import Block from "@/MongoDB/Schemas/Block";
import EditInfo from "../EditInfo";

//===========================================================

const UserInformation = async ({ id }) => {
  const { userId } = auth();
  let user;
  let user2;
  let isFollowed;
  let isFollowRequest;
  let isFriendBlocked = false;

  //===========================================

  try {
    user = await User.findOne({ userId: id });
    user2 = await User.findOne({ userId });
    if (!user2) {
      console.error("you need to be authenticated");
    }

    //===========================================

    const followRequest = await FollowRequest.findOne({
      sender: userId,
      receiver: id,
    });
    if (followRequest) {
      isFollowRequest = true;
    } else {
      isFollowRequest = false;
    }

    //===========================================

    const follower = await Follower.findOne({
      followerId: userId,
      followedId: id,
    });
    if (follower) {
      isFollowed = true;
    } else {
      isFollowed = false;
    }

    //===========================================

    const block = await Block.findOne({
      blocker: userId,
      blocked: id,
    });
    if (block) {
      isFriendBlocked = true;
    } else {
      isFriendBlocked = false;
    }

    //===========================================
  } catch (err) {
    throw new Error("something went wrong");
  }

  //===========================================================
  return (
    <BasicContainer>
      <div className="flex items-center justify-between">
        <h3 className="text-gray-400 font-semibold mb-2">User Information</h3>
        {userId === id && <EditInfo />}
      </div>
      <div className=" w-full h-[1px] bg-gray-200 mb-2 mt-1"></div>
      <p className="text-sm font-bold mb-2">{`${
        user.first_name === null ? "New" : user.first_name
      } ${user.last_name === null ? "User" : user.last_name}`}</p>
      <p className="text-[12px] text-gray-600 mb-3 text-wrap break-words w-48 xl:w-56">
        {user?.description ? user.description : "Empty"}
      </p>
      <div className="flex items-center gap-2 mb-3">
        <IoLocationSharp className="text-gray-400" />
        <p className="text-[11px] text-gray-500">
          Living in{" "}
          <span className="font-bold text-gray-700">
            {user?.city ? user.city : "Empty"}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <RiGraduationCapFill className="text-gray-400" />
        <p className="text-[11px] text-gray-500">
          Went to{" "}
          <span className="font-bold text-gray-700">
            {user?.school ? user.school : "Empty"}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <MdOutlineWork className="text-gray-400" />
        <p className="text-[11px] text-gray-500">
          Works at{" "}
          <span className="font-bold text-gray-700">
            {user?.work ? user.work : "Empty"}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <BsCalendarDate className="text-gray-400" />
        <p className="text-[11px] text-gray-500">
          Joined{" "}
          <span className="font-bold text-gray-700">
            {JSON.stringify(user.createdAt).slice(1, 11)}
          </span>
        </p>
      </div>
      {userId !== id && !isFriendBlocked && (
        <FollowButton
          id={id}
          isFollowed={isFollowed}
          isFollowRequest={isFollowRequest}
        />
      )}
      {userId !== id && (
        <BlockButton id={id} isFriendBlocked={isFriendBlocked} />
      )}
    </BasicContainer>
  );
};

export default UserInformation;
