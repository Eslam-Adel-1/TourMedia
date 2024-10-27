import { Schema, model, models } from "mongoose";

const storySchema = new Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    storyImgUrl: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const Story = models.Story || model("Story", storySchema);

export default Story;
