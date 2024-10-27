import Image from "next/image";
import User from "@/MongoDB/Schemas/User";

const Comment = async ({ content, commenterId }) => {
  let user;
  try {
    user = await User.findOne({ userId: commenterId });
  } catch (err) {
    throw new Error(err.message);
  }

  return (
    <div className="flex gap-2 my-4">
      <div className="w-[150px] rounded-full border-sky-100  overflow-hidden flex-[0.08]">
        <Image
          src={user.imageUrl}
          alt="profile-image"
          width={500}
          height={500}
          className="object-contain  rounded-full"
        />
      </div>
      <div className="bg-gray-100 rounded-xl px-4 py-2 flex-[0.92]">
        <h3 className="text-md font-semibold">{`${
          user.first_name === null ? "New" : user.first_name
        } ${user.last_name === null ? "User" : user.last_name}`}</h3>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
