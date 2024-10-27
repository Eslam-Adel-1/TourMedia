import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: "string", unique: true, required: true },
    first_name: { type: "string" },
    last_name: { type: "string" },
    imageUrl: { type: "string" },
    coverImgUrl: { type: "string" },
    city: { type: "string" },
    work: { type: "string" },
    school: { type: "string" },
    description: { type: "string" },
    userId: { type: "string", unique: true, required: true },
    active: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
