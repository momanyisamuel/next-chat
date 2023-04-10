import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);
    const idToAdd = await fetchRedis("get", `user:email:${emailToAdd}`) as string;
    
    if (!idToAdd) {
      return new Response("No such user exists", { status: 400 });
    }

    //get current user fro session

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("Users not allowed to add themselves as a friend", {
        status: 400,
      });
    }

    //check if user is already added
    const isAlreadyAdded = await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    ) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("User already added", { status: 400 });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    ) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("User already in friend list", { status: 400 });
    }

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

    return new Response("OK", { status: 200});
  } catch (error) {
    if(error instanceof z.ZodError) {
        return new Response("Invalid request payload", {status: 422})
    }

    return new Response("Invalid request", {status:400})
  }
}
