import BasicContainer from "../BasicContainer";
import StoryContainer from "./StoryContainer";
import AddStory from "./AddStory";
import Story from "@/MongoDB/Schemas/Story";
import User from "@/MongoDB/Schemas/User";

const StoriesContainer = async () => {
  let stories = [];
  let userStories = [];
  let processedUserStories = [];

  try {
    stories = await Story.find({});

    userStories = stories.map((item) => {
      return User.findOne({ userId: item.userId });
    });

    processedUserStories = await Promise.all(userStories);
  } catch (err) {
    throw new Error(`something went wrong in stories --- ${err.message}`);
  }

  /*a good way to make your design responsive try using calc function with the vw and vh units to make the design responsive based on the device dimensions ..... example in the tailwind classes below */
  return (
    <BasicContainer>
      <div>
        <h3 className="font-medium text-gray-400">Stories</h3>
      </div>
      <div className="overflow-x-scroll scrollbar-hidden p-2 scroll-smooth w-[calc(100vw-10vw)] sm:w-[calc(100vw-20vw)] md:w-[calc(100vw-40vw)] lg:w-[calc(100vw-58vw)] responsiveStoriesContainer">
        <div className="flex items-center gap-2 h-full w-[250px] sm:w-[400px] min-w-fit ">
          <AddStory />
          {stories.length === 0 ? (
            <div className="xl:w-[400px] lg:w-[300px] rounded-lg py-10 xl:ml-9 lg:ml-5 md:ml-10 sm:ml-14 ml-10">
              <p className="text-2xl text-gray-300 text-center">
                No Stories Available
              </p>
            </div>
          ) : (
            <>
              {stories.map((item, index) => {
                const userInfo = processedUserStories.find(
                  (item2) => item.userId === item2.userId
                );
                return (
                  <StoryContainer
                    key={index}
                    userImage={userInfo.imageUrl}
                    storyImg={item.storyImgUrl}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </BasicContainer>
  );
};

export default StoriesContainer;
