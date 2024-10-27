"use client";
import { CldUploadWidget } from "next-cloudinary";
import placeHolderCoverImage from "@/assets/images/CoverImage.jpg";
import { addCoverImage } from "@/lib/serverActions";
import Image from "next/image";

const CoverImageButton = ({ coverImage }) => {
  return (
    <CldUploadWidget
      uploadPreset="tourMedia_nextJS"
      onSuccess={(result, { widget }) => {
        addCoverImage(result?.info.secure_url); // { public_id, secure_url, etc }
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <div
            className="w-full rounded-sm overflow-hidden cursor-pointer"
            onClick={handleOnClick}
          >
            <Image
              src={coverImage ? coverImage : placeHolderCoverImage}
              alt="profile-cover-image"
              width={500}
              height={500}
              className="w-full h-36"
            />
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default CoverImageButton;
