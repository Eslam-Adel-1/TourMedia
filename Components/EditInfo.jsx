"use client";

import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import MyProfileButton from "./MyProfileButton";
import { updateUserInfo } from "@/lib/serverActions";

const EditInfo = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (formData) => {
    try {
      setLoading((prev) => !prev);
      await updateUserInfo(formData);
      setOpen(false);
    } catch (err) {
      console.log(err);
      setLoading((prev) => !prev);
    }
  };

  return (
    <>
      <IoIosMore
        className="text-lg text-gray-500 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="z-50 fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center">
          <div className="relative w-[75%] h-[90%] bg-white rounded-xl shadow-sm p-6 overflow-y-scroll">
            <IoCloseCircleOutline
              className="absolute top-5 right-5 text-[30px] text-gray-400 cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            />
            <p className="text-red-500 text-sm mb-6">
              You can change your image from the image icon in the top right
              corner
            </p>
            <form action={handleChange} className="grid grid-cols-2 gap-5">
              <div className="flex flex-col  gap-2">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  placeholder=" Ex: John"
                  id="first_name"
                  name="first_name"
                  className="bg-transparent border border-green-400 rounded-md outline-none p-3"
                />
              </div>
              <div className="flex flex-col  gap-2">
                <label htmlFor="last_name">First Name</label>
                <input
                  type="text"
                  placeholder=" Ex: Cena "
                  id="last_name"
                  name="last_name"
                  className="bg-transparent border border-green-400 rounded-md outline-none p-3"
                />
              </div>
              <div className="flex flex-col  gap-2">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  placeholder=" Ex: 12 Street - New Youk"
                  id="address"
                  name="address"
                  className="bg-transparent border border-green-400 rounded-md outline-none p-3"
                />
              </div>
              <div className="flex flex-col  gap-2">
                <label htmlFor="University/School">University / School</label>
                <input
                  type="text"
                  placeholder=" University of Harvard "
                  id="University/School"
                  name="University/School"
                  className="bg-transparent border border-green-400 rounded-md outline-none p-3"
                />
              </div>
              <div className="flex flex-col  gap-2 col-span-2">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  placeholder="Ex: write your description here"
                  id="description"
                  name="description"
                  className="bg-transparent border border-green-400 rounded-md outline-none p-3"
                />
              </div>
              <div className="flex flex-col  gap-2">
                <label htmlFor="work">Your Work</label>
                <input
                  type="text"
                  placeholder=" Ex: 123 Company"
                  id="work"
                  name="work"
                  className="bg-transparent border border-green-400 rounded-md outline-none p-3"
                />
              </div>
              <MyProfileButton
                routing={false}
                className="w-[150px] h-[50px] self-end justify-self-end"
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <p>Edit</p>
                )}
              </MyProfileButton>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditInfo;
