import { Schema, model, models } from "mongoose";

const followerSchema = new Schema(
  {
    followerId: {
      type: "string",
      unique: true,
      required: true,
    },
    followedId: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Follower = models.Follower || model("Follower", followerSchema);

export default Follower;
