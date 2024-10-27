"use client";

import { useEffect, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { deletePost, editPost, getPost } from "@/lib/serverActions";
import { useAuth } from "@clerk/nextjs";

const EditPost = ({ postId }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [post, setPost] = useState([]);
  const { userId } = useAuth();
  console.log(userId);

  useEffect(() => {
    const handlePost = async () => {
      const postInfo = await getPost(postId);
      setPost(JSON.parse(postInfo));
      // console.log(postInfo);
    };
    handlePost();
  }, [postId]);

  const handleDelete = async () => {
    await deletePost(postId);
    setOpenDelete((prev) => !prev);
    setOpen((prev) => !prev);
  };

  const handleEdit = async (formData) => {
    await editPost(formData, postId);
    setOpenEdit((prev) => !prev);
    setOpen((prev) => !prev);
  };

  return (
    <>
      {userId === post.userId && (
        <div className="relative text-2xl text-gray-400">
          <MdMoreHoriz
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer"
          />
          {open && (
            <div className="absolute top-[20px] right-[0px] h-fit w-20 p-1 px-2 bg-white border border-gray-500 shadow-md rounded-md flex flex-col gap-1">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenEdit((prev) => !prev)}
              >
                <MdEdit className="text-[12px] text-green-500" />
                <p className="text-[12px] text-green-500 self-start">Edit</p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenDelete((prev) => !prev)}
              >
                <AiOutlineDelete className="text-sm text-red-500" />
                <p className="text-[12px] text-red-500 self-start">Delete</p>
              </div>
            </div>
          )}
          {openDelete && (
            <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/30">
              <div className="relative bg-white p-7 flex flex-col gap-2 items-center rounded-lg ">
                <IoMdClose
                  className="absolute top-1 right-1 cursor-pointer"
                  onClick={() => setOpenDelete((prev) => !prev)}
                />
                <p className="text-[17px]">
                  Are you sure you want to delete the post ?
                </p>
                <form action={handleDelete}>
                  <button className="bg-red-500 text-white text-sm  p-[7px] px-4 rounded-lg shadow-md">
                    {" "}
                    Delete
                  </button>
                </form>
              </div>
            </div>
          )}
          {openEdit && (
            <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/30">
              <div className="relative bg-white p-7 flex flex-col gap-2 items-center rounded-lg w-[50%]">
                <IoMdClose
                  className="absolute top-1 right-1 cursor-pointer"
                  onClick={() => setOpenEdit((prev) => !prev)}
                />
                <p className="text-[17px]">Edit the post</p>
                <form
                  action={handleEdit}
                  className="w-full flex flex-col items-center "
                >
                  <div className="w-full">
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      className="w-full bg-transparent border border-green-400 rounded-md outline-none p-3 text-sm"
                      defaultValue={post?.content}
                    />
                  </div>
                  <button className="bg-green-500 text-white text-sm  p-[7px] px-4 rounded-lg shadow-md">
                    {" "}
                    Edit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditPost;
