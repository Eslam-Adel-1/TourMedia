import BasicContainer from "../BasicContainer";
import CoverImage from "../../assets/images/CoverImage.jpg";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import User from "@/MongoDB/Schemas/User";
import Follower from "@/MongoDB/Schemas/Follower";
import MyProfileButton from "../MyProfileButton";

const MyProfile = async () => {
  const { userId } = auth();
  const user = await User.findOne({ userId });
  const followedCount = await Follower.countDocuments({ followedId: userId });

  return (
    <BasicContainer className="gap-3 p-2">
      <Image
        src={user?.coverImgUrl || CoverImage}
        alt="cover-image"
        width={500}
        height={500}
        className="w-full rounded-md"
      />

      <div className="flex flex-col items-center gap-2 -mt-9">
        <Image
          src={user?.imageUrl}
          alt="profile-image"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full"
        />

        <div>
          <h4 className="text-center text-gray-500 font-semibold">
            {`${user?.first_name === null ? "New" : user?.first_name} ${
              user?.last_name === null ? "User" : user?.last_name
            }`}
          </h4>
          <p className="text-center text-gray-500 font-semibold text-sm">
            {followedCount || 0} Followers
          </p>
        </div>
      </div>

      <MyProfileButton userId={user?.userId} routing={true}>
        My profile
      </MyProfileButton>
    </BasicContainer>
  );
};

export default MyProfile;
