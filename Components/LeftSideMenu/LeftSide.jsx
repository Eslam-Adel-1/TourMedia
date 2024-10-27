import EventsList from "./EventsList";
import MyProfile from "./MyProfile";
import SponseredAds from "../SponseredAds";

const LeftSide = ({ page }) => (
  <div className="hidden flex-[0.2] lg:block">
    {page === "userProfile" && <MyProfile />}
    <EventsList />
    <SponseredAds side="left" />
  </div>
);

export default LeftSide;
