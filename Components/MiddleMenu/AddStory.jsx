"use client";

import { FaCirclePlus } from "react-icons/fa6";
import { CldUploadWidget } from "next-cloudinary";
import { addStory } from "@/lib/serverActions";

const AddStory = () => {
  return (
    <CldUploadWidget
      uploadPreset="tourMedia_nextJS"
      onSuccess={(result, { widget }) => {
        addStory(result?.info.secure_url); // { public_id, secure_url, etc }
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <div
            className="flex items-center justify-center w-[80px] h-[120px] overflow-hidden rounded-lg cursor-pointer ring-2 ring-green-500"
            onClick={handleOnClick}
          >
            <div className="flex flex-col items-center gap-2">
              <FaCirclePlus className="text-2xl text-green-400" />
              <p className="text-[12px] text-green-400 font-semibold">
                Add Story
              </p>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default AddStory;
