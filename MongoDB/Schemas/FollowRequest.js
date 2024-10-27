import { Schema, model, models } from "mongoose";

const followRequestSchema = new Schema(
  {
    sender: {
      type: "string",
      required: true,
    },
    receiver: {
      type: "string",
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FollowRequest =
  models.FollowRequest || model("FollowRequest", followRequestSchema);

export default FollowRequest;
