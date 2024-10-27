import mongoose, { Schema, model, models } from "mongoose";

const likeSchema = new Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = models.Like || model("Like", likeSchema);

export default Like;
