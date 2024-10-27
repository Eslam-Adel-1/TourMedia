import BasicContainer from "./BasicContainer";
import { MdMoreHoriz } from "react-icons/md";
import SponseredAdsCover from "../assets/images/SponseredAdsCover.jpg";
import FoodAvatar from "../assets/images/FoodAvatar.jpg";
import Image from "next/image";

//================================================================

const SponseredAds = ({ side }) => {
  let text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
  //================================================================
  return (
    <BasicContainer className="gap-2 p-3 sticky top-2">
      <div className="flex items-center justify-between w-full">
        <p className="text-gray-600 text-[12px]">Sponsered Ads</p>
        <div className="text-gray-400 text-md">
          <MdMoreHoriz />
        </div>
      </div>
      <div className="w-full">
        <Image
          src={SponseredAdsCover}
          alt="sponser-cover-image"
          width={0}
          height={80}
          className="w-full rounded-md shadow-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={FoodAvatar}
          alt="sponser-avatar"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
        <p className="text-sm font-semibold">Chefs World</p>
      </div>
      <p className="text-[12px] text-gray-400">
        {side === "left"
          ? text.slice(0, 100) + " ..."
          : text.slice(0, 200) + " ..."}
      </p>
      <button className="bg-green-400 text-white text-sm w-full py-1 px-2 rounded-lg">
        Learn More
      </button>
    </BasicContainer>
  );
};

export default SponseredAds;
