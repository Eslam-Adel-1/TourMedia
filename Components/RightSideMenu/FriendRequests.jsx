import BasicContainer from "../BasicContainer";
import FriendRequest from "./FriendRequest";
import { auth } from "@clerk/nextjs/server";
import FollowRequest from "@/MongoDB/Schemas/FollowRequest";
import User from "@/MongoDB/Schemas/User";

//===========================================
const FriendRequests = async () => {
  const { userId } = auth();
  let myFriendRequests = [];

  myFriendRequests = await FollowRequest.find({ receiver: userId }).exec();

  const followRequestUsers = myFriendRequests?.map((item) => {
    return User.findOne({ userId: item.sender }).exec();
  });

  const finalFollowRequestUsers = await Promise.all(followRequestUsers);

  let show = false;
  return (
    <BasicContainer className="p-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">Friend Requests</p>
        <p className="text-sm text-green-400 cursor-pointerp">See all</p>
      </div>
      {finalFollowRequestUsers.length !== 0 ? (
        <>
          {finalFollowRequestUsers.map((user, index) => {
            return (
              <FriendRequest
                key={index}
                name={`${user.first_name === null ? "New" : user.first_name} ${
                  user.last_name === null ? "User" : user.last_name
                }`}
                avatar={user.imageUrl}
                id={user.userId}
              />
            );
          })}
        </>
      ) : (
        <p className="text-sm font-semibold text-gray-400 text-center p-2 border-2 border-gray-200 rounded-xl">
          There is no friend requests
        </p>
      )}
    </BasicContainer>
  );
};

export default FriendRequests;
