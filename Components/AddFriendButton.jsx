"use client";
import { addFriend } from "@/lib/serverActions";
import { IoMdAddCircle } from "react-icons/io";

const AddFriendButton = ({ id }) => {
  return (
    <form
      action={() => {
        addFriend(id);
      }}
    >
      <button>
        <IoMdAddCircle size={18} className="cursor-pointer" />
      </button>
    </form>
  );
};

export default AddFriendButton;
