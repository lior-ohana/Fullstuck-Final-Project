import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";

import ActivityIndicator from "./component/custom_activity_indicator"
import PostModel, { Post } from "../model/post_model"
import COLORS from "../constants/colors";
import UserModel,{ UserCredentials } from "../model/user_model";

const [data, setData] = useState<Array<Post>>();
const [isLoading, setIsLoading] = useState<boolean>(false);
const [userId,setUserId] = useState<string>("")
const [accessToken, setAccessToken] = useState<string>("");
const [refreshToken, setRefreshToken] = useState<string>("");

const PosttListRow: FC<{ post:Post, onItemClick: (id:string)=>void }> = ({ post, onItemClick }) => {
  return (
      <TouchableHighlight
          onPress={()=>{onItemClick(post.postID)}}
          underlayColor={COLORS.clickBackground}>
          <View style={styles.list_row_container}>
              { post.imageUrl != "" &&  <Image source={{uri: post.imageUrl.toString()}} style={styles.list_row_image}></Image>}
              { post.imageUrl == "" &&  <Image source={require("../assets/avatar.jpeg")} style={styles.list_row_image}></Image>}
              <View style={styles.list_row_text_container}>
                  <Text style={styles.list_row_name}>{post.text}</Text>
                  <Text style={styles.list_row_id}>{post.postID}</Text>
              </View>
          </View>
      </TouchableHighlight>
  )
}

const Home: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const TopBarAddButton: FC<{ onClick: () => void }> = ({ onClick }) => {
        return (
          <TouchableHighlight
            onPress={() => {
              onClick();
            }}
            underlayColor={COLORS.clickBackground}
          >
            <Ionicons name={"add-outline"} size={40} color={"grey"} />
          </TouchableHighlight>
        );
}};



const styles = StyleSheet.create({
  home_container: {
      flex: 1
  },
  list_row_container: {
      height: 150,
      // width: "100%",
      // backgroundColor: "grey",
      flexDirection: "row",
      elevation: 4,
      borderRadius: 3,
      marginLeft: 8,
      marginRight: 8
  },
  list_row_image: {
      height: 130,
      width: 130,
      margin: 10,
      borderRadius: 15
  },
  list_row_text_container: {
      justifyContent: "center"
  },
  list_row_name: {
      fontSize: 30,
      marginBottom: 10
  },
  list_row_id: {
      fontSize: 25
  },
  activity_indicator:{
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",      
      position: "absolute"
  }
});

export default Home;