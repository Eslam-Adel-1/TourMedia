import SponseredAds from "../SponseredAds";
import FriendRequests from "./FriendRequests";
import UserInformation from "../RightSideMenu/UserInformation";
import UserMedia from "../MiddleMenu/UserMedia";

const RightSide = ({ page, id }) => (
  <div className="hidden flex-[0.25] md:block md:flex-[0.35] lg:flex-[0.25]">
    {page === "userProfile" ? (
      <>
        <UserInformation id={id} />
        <UserMedia id={id} />
      </>
    ) : (
      page === "mainPage" && <FriendRequests />
    )}
    <SponseredAds />
  </div>
);

export default RightSide;
