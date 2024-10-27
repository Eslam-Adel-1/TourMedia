"use client";

import { useState } from "react";
import Link from "next/link";

const BurgerMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="md:hidden">
      <div
        className={` md:hidden z-[150] ${openMenu && "fixed "}`}
        onClick={() => {
          setOpenMenu((prev) => !prev);
        }}
      >
        <div className="flex flex-col items-center gap-[5px] cursor-pointer ">
          <div
            className={`h-[2px] w-[20px] bg-black rounded-3xl transition ${
              openMenu && "origin-left rotate-[45deg]"
            }`}
          ></div>
          <div
            className={`h-[2px] w-[20px] bg-black rounded-3xl transition ${
              openMenu ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-[2px] w-[20px] bg-black rounded-3xl transition ${
              openMenu && "origin-left -rotate-[45deg]"
            }`}
          ></div>
        </div>
      </div>
      {openMenu && (
        <div
          className={`fixed md:hidden bg-white top-0 bottom-0 left-0 right-0 translate-x-[0px] z-50 grid place-items-center transition-all `}
        >
          <div className="flex flex-col items-center gap-6">
            <Link href="/" className="font-semibold">
              Profile
            </Link>
            <Link href="/" className="font-semibold">
              Friends
            </Link>
            <Link href="/" className="font-semibold">
              Messages
            </Link>
            <Link href="/" className="font-semibold">
              Posts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
