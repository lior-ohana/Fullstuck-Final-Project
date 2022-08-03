import UserApi from "./user_api";

export type User = {
  email: string;
  password: string;
  imageUrl: string;
};

export type UserCredentials = {
    access_token: string;
    refresh_token: string;
    _id: string;
  };

  const getAllUsers = async () => {
    const users = await UserApi.getAllUsers();
    return users;
  };

  const getUserById = async (id:string) => {
    return await UserApi.getuserById(id);
  };

  const addUser = async (us: User) => {
    const users = await UserApi.addUser(us);
    
  };

  const updateUser = async (us:User, oldEmail:string) => {
    await UserApi.updateUser(us,oldEmail);
  };

  const uploadImage = async (imageUrl:string, access_token: string) => {
    console.log("User upload image ");
    return await UserApi.uploadImage(imageUrl,access_token);
  }

  const loginUser = async (us:User) => {
    console.log("user_model loginUser " + us.email + " " + us.password);
    return await UserApi.loginUser(us);
  };

  export default {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    uploadImage,
    loginUser
}