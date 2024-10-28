import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import User from "@/MongoDB/Schemas/User";
import { connect } from "../../../MongoDB/mongoConnect";
import PostSchema from "@/MongoDB/Schemas/PostSchema";
import CommentSchema from "@/MongoDB/Schemas/CommentSchema";
import Like from "@/MongoDB/Schemas/Likes";
import FollowRequest from "@/MongoDB/Schemas/FollowRequest";
import Follower from "@/MongoDB/Schemas/Follower";

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}\n`);
  console.log("Webhook body:", body);

  //===============  Mongo-Section  =======================================

  const bodyJson = JSON.parse(body);
  try {
    connect();
    if (eventType === "user.created") {
      try {
        const user = new User({
          email: bodyJson.data.email_addresses[0].email_address,
          first_name: bodyJson.data.first_name,
          last_name: bodyJson.data.last_name,
          imageUrl: bodyJson.data.image_url,
          userId: bodyJson.data.id,
          active: true,
        });

        await user.save();
      } catch (err) {
        console.error(err.message);
      }
    }

    //=============================
    else if (eventType === "user.updated") {
      try {
        const user = await User.updateOne(
          { userId: bodyJson.data.id },
          { imageUrl: bodyJson.data.image_url }
        );
        if (!user) {
          console.error("No user in the database");
        }
        console.log(body);
      } catch (err) {
        console.error(err.message);
      }
    }
    //=============================
    else if (eventType === "user.deleted") {
      try {
        const user = await User.deleteOne({ userId: bodyJson.data.id });
        if (!user) {
          console.error("No user in the database");
        }
        await PostSchema.deleteMany({ userId: bodyJson.data.id });
        await CommentSchema.deleteMany({ userId: bodyJson.data.id });
        await Like.deleteMany({ userId: bodyJson.data.id });
        await FollowRequest.deleteMany({ sender: bodyJson.data.id });
        await FollowRequest.deleteMany({ receiver: bodyJson.data.id });
        await Follower.deleteMany({ followerId: bodyJson.data.id });
        await Follower.deleteMany({ followedId: bodyJson.data.id });
      } catch (err) {
        console.error(err.message);
      }
    }

    //=============================
    if (eventType === "session.created") {
      try {
        const user = await User.updateOne(
          { userId: bodyJson.data.user_id },
          { $set: { active: true } }
        );
        if (!user) {
          console.error("No user found in the datab ase");
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    //=============================
    else if (eventType === "session.ended") {
      try {
        const user = await User.updateOne(
          { userId: bodyJson.data.user_id },
          { $set: { active: false } }
        );
        if (!user) {
          console.error("No user found in the database");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  } catch (err) {
    console.error(err.message);
  }

  //===============  Mongo-Section   =======================================

  return new Response("", { status: 200 });
}
