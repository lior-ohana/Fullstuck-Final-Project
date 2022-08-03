//import { StatusBar } from 'expo-status-bar';
import {FC} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './screens/Home_Screen';
import COLORS from "./constants/colors"

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const ToBarAddButton:FC<{onClick:()=>void}>=({onClick})=>{
  return(
      <TouchableHighlight onPress={()=>{onClick()}}
          underlayColor={COLORS.clickBackground}>
          <Ionicons name={"add-outline"} size={40} color={'gray'} />
      </TouchableHighlight>
  )
};

const HomeStackScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const openAddStudent = ()=>{
      navigation.navigate("AddStudent")
  }
  return (
      <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={Home} 
              options={{
                  headerRight: ()=><ToBarAddButton onClick={()=>openAddStudent()}></ToBarAddButton>
              }} />
      </HomeStack.Navigator>
  );
}

const App: FC = () => {
  return (
      <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'About') {
                      iconName = focused ? 'information-circle' : 'information-circle-outline';
                  } else if (route.name === 'HomeStack') {
                      iconName = focused ? 'home' : 'home-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
          })}>
              <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }}></Tab.Screen>
          </Tab.Navigator>
      </NavigationContainer>
  )
}

/*
const App:FC = () => {
  return(
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
};*/

const styles = StyleSheet.create({});

export default App;
