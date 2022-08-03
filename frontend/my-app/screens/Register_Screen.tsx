import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight, ScrollView, TextInput } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";

import COLORS from "../constants/colors";
import UserModel,{ User, UserCredentials } from "../model/user_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import local_cache from "../model/local_cache";

const Add_User: FC<{ navigation: any; route: any }> = ({
    navigation,
    route,
  }) => {
    const [isLoading,setIsLoading] =useState<boolean>(false)
    const [UserName,setUserName] = useState<string>("")
    const [Password,setPassword] = useState<string>("")
    const [imageUri,setImageUri] = useState<string>("")


    const onSave = async ()=>{
      setIsLoading(true)
      if(UserName!="" && Password !="" ){
        const user:User = {
          email:UserName,
          password:Password,
          imageUrl: ''
        }
        const usrC = await UserModel.addUser(user)
        if(imageUri != ""){
          console.log("saving image")
          const url = await UserModel.uploadImage(imageUri,usrC?.access_token)
          user.imageUrl = url
          console.log("saving image : " + url) 
      }
        setIsLoading(false)
        if(usrC==null){
          alert("Somthing went wrong")
        }else{
          local_cache.saveUserEmail(UserName.toString())
          navigation.navigate("Home",{_id:usrC._id,accessToken:usrC.access_token,refreshToken:usrC.refresh_token})
        }
      }
    }

    const onImageSelected = (uri:string)=>{
      console.log("onImageSelected " + uri)
      setImageUri(uri)
  }
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.image} >
         <CustomImagePicker onImageSelected={onImageSelected}></CustomImagePicker>
      </View>
      <TextInput style={styles.textInput} onChangeText={setUserName} placeholder="UserName" keyboardType="default"></TextInput>
      <TextInput style={styles.textInput} onChangeText={setPassword} placeholder="Password" keyboardType="default"></TextInput>

      <TouchableHighlight
        underlayColor={COLORS.clickBackground} 
        onPress={()=>{ 
          onSave()
        }} 
        style={styles.button}>
         <Text style={styles.buttonText}>Save</Text>
       </TouchableHighlight>
       <View style={styles.activity_indicator}>
        <ActivityIndicator visible ={isLoading}></ActivityIndicator> 
       </View>
      </View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
      container:{
        flex:1
      },
      image:{
        width:"100%",
        height:250,
        resizeMode:"contain",
      },
      textInput:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10,
        borderColor:"grey",
      },
      button:{
        margin:12,
        backgroundColor:"grey",
        borderRadius:50
      },
      buttonText:{
        fontSize:40,
        color:"white",
        textAlign: "center",
        marginTop:3,
        marginBottom:3
      },
      activity_indicator:{
        position:"absolute",
    justifyContent:"center",
    width:"100%",
    height:"100%",
    alignItems:"center"
      }
});

  export default Add_User;