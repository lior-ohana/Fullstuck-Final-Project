import apiClient from "./api_client";
import { User, UserCredentials } from "./user_model";

const getAllUsers = async () => {
  const res = await apiClient.get("/user/");
  const users = Array<User>()
  
  if(res.data){
    res.data.forEach((item: { userName: any; password: any; imgUri: any; }) => {
      const user:User ={
        email: item.userName,
        password: item.password,
        imageUrl:item.imgUri
      }
      users.push(user)
    });
  }
  else {
    console.log("getAllUser fail");
    
  }
  return users
};

const getuserById = async (id:string) => {
    console.log("UserAPI " + id);
    const res = await apiClient.get("/user/"+id);
    const user:User = {
      email:"",
      password:"",
      imageUrl:""
    }
    if(res.data){
      user.email = res.data.email,
      user.password = res.data.password,
      user.imageUrl =res.data.imgUrl
      }
      else{
      console.log("getUserById failed");
        
      }
    return user
  };

const addUser = async (us: User) => {
    const res = await apiClient.post("/post", {
        email: us.email,
        password: us.password,
        imageUrl: us.imageUrl
    })
    if (res.ok) {
        console.log("user added successfully")
    } else {
        console.log("user add failed!")
    }
} 

const updateUser = async (us: User, oldEmail:string) => {
    if(us.email === res.data.email){
        const res = await apiClient.post("/user/edit",{
            oldEmail: oldEmail,
            newEmail: us.email,
            password: us.password,
            imageUrl: us.imageUrl
        });
        if (res.ok){
            console.log("User updated successfully");
        }
        else{
            console.log("User update failed!");
        }
    }
}

const uploadImage = async (imageUrl:string, access_token: string) => {
    console.log("uploadImage")
    const formData = new FormData()
    formData.append('file',{name: 'name', type:'iamge/jpeg', uri: imageUrl})
    let url = '/file/file'
    const res = await apiClient.post(url,formData)
    if (res.ok){
        console.log("uploadImage passed " + res.data)
        return res.data.url
    }else{
        console.log("save failed " + res.problem)
    }
}

const loginUser = async (us:User) => {
    const res = await apiClient.post("/auth/login",{
        email: us.email,
        password: us.password
    });
    if (res.ok){
        console.log(res.data)
        const usrC:UserCredentials = {
          access_token:res.data.access_token,
          refresh_token:res.data.refresh_token,
          _id:res.data._id
        }
        console.log("Login success "+usrC._id);
        return usrC
      }
      else {
        console.log("Login fail");
        return null
    }
};

export default {
    getAllUsers,
    getuserById,
    addUser,
    updateUser,
    uploadImage,
    loginUser
}