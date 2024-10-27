import Search from "./Search";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import BurgerMenu from "./BurgerMenu";
import TourMedia from "./TourMedia";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="py-3 px-5 bg-white rounded-b-lg">
      <div className="flex items-center justify-between md:mx-[20px] lg:mx-[70px] xl:mx-[120px]">
        {userId && (
          <div className="flex items-center gap-10">
            <TourMedia />
            <div className="hidden md:block">
              <Search />
            </div>
          </div>
        )}
        <div className="flex items-center gap-6">
          {userId && (
            <div className="flex items-center gap-4">
              <IoIosNotificationsOutline className="text-[23px]" />
              <IoPersonAddOutline className="text-[20px]" />
              <AiOutlineMessage className="text-[20px]" />
            </div>
          )}
          <ClerkLoading>
            <div className="animate-spin rounded-full border-[3px] border-t-blue-600 border-gray-300 h-7 w-7" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <p className="text-emerald-500 font-bold px-4 text-xl">
                TourMedia
              </p>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
