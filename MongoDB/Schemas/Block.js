import { Schema, model, models } from "mongoose";

const blockSchema = new Schema(
  {
    blocker: {
      type: "string",
      required: true,
    },
    blocked: {
      type: "string",
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Block = models.Block || model("Block", blockSchema);

export default Block;
