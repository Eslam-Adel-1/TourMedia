"use client";
import { ignoreFriend } from "@/lib/serverActions";
import { IoBanOutline } from "react-icons/io5";

const IgnoreFriend = ({ id }) => {
  return (
    <form
      action={() => {
        ignoreFriend(id);
      }}
    >
      <button>
        <IoBanOutline size={15} className="cursor-pointer" />
      </button>
    </form>
  );
};

export default IgnoreFriend;
