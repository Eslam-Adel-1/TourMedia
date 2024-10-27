import BasicContainer from "../BasicContainer";
import Form from "@/Components/Form";
import User from "@/MongoDB/Schemas/User";
import { auth } from "@clerk/nextjs/server";

//=================================================

const AddPost = async () => {
  let user;
  try {
    const { userId } = auth();

    if (!userId) throw new Error("you need to be authenticated");

    user = await User.findOne({ userId });
  } catch (err) {
    throw new Error("something went wrong");
  }
  //=================================================

  return (
    <BasicContainer>
      <Form userImage={user.imageUrl} />
    </BasicContainer>
  );
};

export default AddPost;
