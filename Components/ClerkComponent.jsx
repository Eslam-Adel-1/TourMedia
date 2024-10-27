"use client";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import BurgerMenu from "./BurgerMenu";

const ClerkComponent = () => {
  return (
    <>
      <ClerkLoading>
        <div className="border-gray-300 h-7 w-7 animate-spin rounded-full border-[3px] border-t-blue-600"></div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div>
            <IoIosNotificationsOutline className="hidden md:block text-[23px]" />
            <AiOutlineMessage className="hidden md:block text-[20px]" />
            <IoPersonAddOutline className="hidden md:block text-[20px]" />
            <BurgerMenu />
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div>
            <button className="rounded-xl text-emerald-500 border-emerald-500 border-2 font-semibold py-1 px-4 text-sm hover:bg-emerald-500 hover:text-white transition">
              Login/Register
            </button>
          </div>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
};

export default ClerkComponent;
