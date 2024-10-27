"use client";

import Image from "next/image";
import { useState } from "react";

const ShowPostImage = ({ postImage, postVideo }) => {
  const [showStory, setShowStory] = useState(false);

  return (
    <>
      {showStory && postImage ? (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/65 z-[200] cursor-pointer"
          onClick={() => setShowStory((prev) => !prev)}
        >
          <div className="flex items-center justify-center lg:h-[500px] md:h-[350px] h-[300px]">
            <Image
              src={postImage}
              alt="post-image"
              width={500}
              height={1000}
              className="rounded-md h-full w-auto"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      {postImage ? (
        <div
          className="overflow-hidden rounded-md my-2 h-[290px] max-h-[350px] cursor-pointer"
          onClick={() => setShowStory((prev) => !prev)}
        >
          <div className="flex items-center justify-center h-[290px] max-h-[350px]">
            <Image
              src={postImage}
              alt="post-image"
              width={500}
              height={1000}
              className="w-auto h-full"
            />
          </div>
        </div>
      ) : (
        <div
          className="overflow-hidden rounded-md my-2 h-[290px] max-h-[300px] cursor-pointer"
          onClick={() => setShowStory((prev) => !prev)}
        >
          <div className="flex items-center justify-center h-[290px] max-h-[300px]">
            <iframe
              src={postVideo}
              alt="post-video"
              width="500"
              height="0"
              className="w-full h-full"
              allowFullScreen
              allow="picture-in-picture"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowPostImage;
