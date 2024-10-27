"use client";
import Image from "next/image";
import { useState } from "react";

const StoryContainer = ({ userImage, storyImg }) => {
  const [showStory, setShowStory] = useState(false);

  return (
    <>
      {showStory && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/45 z-[200] cursor-pointer"
          onClick={() => setShowStory((prev) => !prev)}
        >
          <Image
            src={storyImg}
            alt="story-image"
            width={300}
            height={500}
            className="h-full"
          />
        </div>
      )}

      <div
        className="relative animate-border w-[80px] overflow-hidden rounded-xl cursor-pointer  bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1"
        onClick={() => setShowStory((prev) => !prev)}
      >
        <Image
          src={storyImg}
          alt="story-image"
          width={500}
          height={500}
          className="object-fill h-[120px] rounded-xl"
        />
        <div className="absolute bottom-2 left-2 border-sky-100">
          <Image
            src={userImage}
            alt="profile-image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default StoryContainer;
