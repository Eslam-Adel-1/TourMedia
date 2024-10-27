import mongoose, { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    content: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const CommentSchema =
  models.CommentSchema || model("CommentSchema", commentSchema);

export default CommentSchema;
