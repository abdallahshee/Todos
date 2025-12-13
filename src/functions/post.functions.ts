import { authMiddleware } from "@/middlewares/authMiddleware";
import { yupValidator } from "@/middlewares/yupValidator";
import { connectDB } from "@/models/Database";
import { Post, PostModel } from "@/models/post.model";
import { PostSchema} from "@/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";

export const createPost = createServerFn({ method: "POST" })
 .inputValidator(yupValidator(PostSchema))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    try {
      await connectDB();
      const newPost: Post = {
        _id: nanoid(7), // already a string
        userId: context?.currentUser?._id,
        createdBy: context.currentUser.firstName,
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      };
      const item = await PostModel.create(newPost);
      return JSON.stringify(item);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });

export const getMyPosts = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Post[] | undefined> => {
    const userId = context.currentUser._id;
    try {
      await connectDB();
      const myPosts = (await PostModel.find({
        userId: userId,
      }).lean()) as Post[];
      return myPosts;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });
