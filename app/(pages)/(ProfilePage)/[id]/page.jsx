import RightSide from "@/Components/RightSideMenu/RightSide";
import LeftSide from "@/Components/LeftSideMenu/LeftSide";
import Middle from "@/Components/MiddleMenu/Middle";
import Block from "@/MongoDB/Schemas/Block";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import User from "@/MongoDB/Schemas/User";

//================================================

const Page = async ({ params }) => {
  const { userId } = auth();
  const userPage = await User.findOne({ userId: params.id });

  if (!userPage) {
    console.error("Couldn't find user");
    return notFound();
  }

  const block = await Block.findOne({ blocker: params.id, blocked: userId });
  console.error(block);
  if (block) {
    return notFound();
  }

  //================================================

  return (
    <main className="flex justify-center mx-[10px]  md:mx-[20px] lg:mx-[70px] xl:mx-[120px] gap-6 my-6">
      <LeftSide />
      <Middle page="profilePage" id={params.id} />
      <RightSide page="userProfile" id={params.id} />
    </main>
  );
};

export default Page;
