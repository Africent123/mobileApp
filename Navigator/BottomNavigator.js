import React from "react";

import { createBottomTabNavigator } from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";

import Profile from "../screens/Movies/Profile";
import Bookmark from "../screens/Movies/Bookmark";

import ActivityStack from "./ActivityStack";
import Movies from "../screens/Movies/Movies";

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Movies,
      navigationOption: ({ navigation }) => {
        return {
          // headerTransparent: true,
        };
      }
    },
    Bookmark : Bookmark,
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Bookmark") {
          iconName = `ios-bookmark`;
        } else if (routeName === "Profile") {
          iconName = `ios-person`;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#01C851",
      inactiveTintColor: "rgba(255, 255, 255, 0.6)",
      style: {
        backgroundColor: "#C4C4C4"
      }
    }
  }
);

export default BottomNavigator;
