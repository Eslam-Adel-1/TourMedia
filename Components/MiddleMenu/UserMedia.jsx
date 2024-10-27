import Image from "next/image";
import BasicContainer from "../BasicContainer";
import PostSchema from "@/MongoDB/Schemas/PostSchema";

const UserMedia = async ({ id }) => {
  let posts;
  try {
    if (!id) {
      throw new Error("The user is not authenticated");
    } else {
      posts = await PostSchema.find({ userId: id });
    }
  } catch (err) {
    throw new Error("something went wrong");
  }

  return (
    <BasicContainer>
      <h3 className="text-gray-400 font-semibold mb-2">User Media</h3>
      <div className=" w-full h-[1px] bg-gray-200 mb-2 mt-1"></div>
      <div className="flex items-center flex-wrap gap-2">
        {posts?.length !== 0 &&
          posts?.map((item, index) => {
            return (
              item.postImgUrl !== null && (
                <div className="w-[30%] overflow-hidden rounded-lg" key={index}>
                  <Image
                    src={item?.postImgUrl}
                    alt="media-image"
                    width={500}
                    height={500}
                    className="h-[80px] object-fill"
                  />
                </div>
              )
            );
          })}
      </div>
    </BasicContainer>
  );
};

export default UserMedia;
