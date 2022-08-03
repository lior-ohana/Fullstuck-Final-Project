import PostApi from "./post_api"
import { UserCredentials } from "./user_model";


export type Post = {
  postID: string;
  senderID:string;
  text: string;
  imageUrl: string;
};

const getAllPosts = async () => {
    const posts = await PostApi.getAllPosts()
    return posts
  };

const getUserPosts = async (usID: string) => {
    const posts= await PostApi.getUserPosts(usID)
    return posts
};

  export default {
    getAllPosts,
    getUserPosts
}