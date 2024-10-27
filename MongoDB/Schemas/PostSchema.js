import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    content: { type: "string" },
    postImgUrl: { type: "string" },
    postVidUrl: { type: "string" },
  },
  {
    timestamps: true,
  }
);

const PostSchema = models.PostSchema || model("PostSchema", postSchema);

export default PostSchema;
