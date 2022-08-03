import apiClient from "./api_client";
import {Post} from "./post_model";
import { User, UserCredentials } from "./user_model";

const renewToken = async (userC:UserCredentials)=>{
    console.log("Refreshing token");
    
    apiClient.addAsyncRequestTransform(request =>async () => {
      request.headers['authorization'] = "barer " + userC.refresh_token
    })
    const res = await apiClient.get("/auth/refresh",{
      _id:userC._id
    });
  
    console.log(res.ok + " " + res.data);
    if(res.ok){
      return ({
        _id:res.data._id,
        access_token:res.data.access_token,
        refresh_token:res.data.refresh_token
      })
    }
    
  };

const getAllPosts = async () => {
    const res = await apiClient.get("/post/");
    let posts = Array<Post>()
    
    if(res.data){
      res.data.forEach((item) => {
        const p:Post ={
          id: item.sender,
          text: item.message,
          imageUrl: item.imgUrl
        }
        posts.push(p)
      });
    }
    else {
      console.log("Get all posts failed!");
      
    }
    return posts
};

const getUserPosts = async (usID:string) =>{
    const res = await apiClient.get("/post/");
    let posts = Array<Post>()
    if(res.data.id===usID){
      res.data.forEach((item) => {
        const p:Post ={
          id: item.sender,
          text: item.text,
          imageUrl: item.imageUrl
        }
        posts.push(p)
      });
    }else {
      console.log("getUserPosts fail");
      
    }
    return posts
;}

  export default {
    getAllPosts,
    getUserPosts
};
