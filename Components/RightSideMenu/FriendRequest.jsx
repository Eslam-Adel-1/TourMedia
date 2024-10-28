import FriendRequestButton from "../FriendRequestButton";
import IgnoreFriend from "../IgnoreFriend";
import AddFriendButton from "../AddFriendButton";

const FriendRequest = ({ name, avatar, id }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <FriendRequestButton id={id} avatar={avatar} name={name} />
      <div className="text-green-400 flex items-center gap-2">
        <AddFriendButton id={id} />
        <IgnoreFriend id={id} />
      </div>
    </div>
  );
};

export default FriendRequest;
