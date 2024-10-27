import RightSide from "@/Components/RightSideMenu/RightSide";
import LeftSide from "@/Components/LeftSideMenu/LeftSide";
import Middle from "@/Components/MiddleMenu/Middle";

export default function Home() {
  return (
    <main className="flex justify-center mx-[10px]  md:mx-[20px] lg:mx-[70px] xl:mx-[120px] gap-6 my-6">
      <LeftSide page="userProfile" />
      <Middle page="mainPage" />
      <RightSide page="mainPage" />
    </main>
  );
}
