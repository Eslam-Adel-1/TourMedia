"use client";

import { useRef, useState } from "react";
import { addPost } from "@/lib/serverActions";
import {
  MdOutlineLiveTv,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FaRegSmileBeam } from "react-icons/fa";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

//=================================================

const Form = ({ userImage }) => {
  const ref = useRef();
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  //=================================================
  const handleForm = async (formData) => {
    await addPost(formData, image?.secure_url, video?.secure_url);
    ref.current.reset();
    setVideo(null);
    setImage(null);
  };

  //=================================================

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col gap-5">
        <div className="border-sky-100 flex items-center gap-2 mt-3 ">
          <Image
            src={userImage}
            alt="profile-image"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full"
          />
          <div className="flex flex-col gap-2 w-full">
            <form
              action={handleForm}
              className="flex-1 flex items-center bg-gray-100 rounded-[50px] overflow-hidden h-fit"
              ref={ref}
            >
              <input
                className="outline-none placeholder-gray-400 bg-transparent py-2 px-4 w-full"
                placeholder="Write a comment"
                name="description"
              />
            </form>
          </div>
        </div>
        {video?.secure_url && (
          <div className="w-full rounded-xl overflow-hidden">
            <iframe
              src={video?.secure_url}
              alt="pre-post-image"
              height="0"
              width="1000"
              className="h-[200px] w-full"
            />
          </div>
        )}
        {image?.secure_url && (
          <div className="w-full rounded-xl overflow-hidden">
            <Image
              src={image?.secure_url}
              alt="pre-post-image"
              height={0}
              width={500}
              className="h-[200px] w-full"
            />
          </div>
        )}
      </div>
      <div className=" w-full h-[1px] bg-gray-200 mt-4"></div>
      <div className="text-2xl flex items-center justify-around mt-4 flex-wrap">
        <div className="flex items-center gap-2 m-2">
          <MdOutlineLiveTv className="text-orange-400" />
          <p className="text-sm text-gray-500 hover:text-green-500 cursor-pointer">
            Go Live
          </p>
        </div>
        <CldUploadWidget
          uploadPreset="tourMedia_nextJS"
          onSuccess={(result, { widget }) => {
            setImage(result?.info); // { public_id, secure_url, etc }
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              setImage(null);
              setVideo(null);
              open();
            }
            return (
              <div
                className="flex items-center gap-2 m-2"
                onClick={handleOnClick}
              >
                <MdOutlinePhotoSizeSelectActual className="text-red-400" />
                <p className="text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                  Photos
                </p>
              </div>
            );
          }}
        </CldUploadWidget>

        <CldUploadWidget
          uploadPreset="tourMedia_nextJS"
          onSuccess={(result, { widget }) => {
            setVideo(result?.info); // { public_id, secure_url, etc }
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              setVideo(null);
              setImage(null);
              open();
            }
            return (
              <div
                className="flex items-center gap-2 m-2"
                onClick={handleOnClick}
              >
                <GoDeviceCameraVideo className="text-blue-400" />
                <p className="text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                  Videos
                </p>
              </div>
            );
          }}
        </CldUploadWidget>

        <div className="flex items-center gap-2 m-2">
          <FaRegSmileBeam className="text-purple-400 " />
          <p className="text-sm text-gray-500 hover:text-green-500 cursor-pointer">
            Feelings
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
