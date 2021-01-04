import React from "react";
import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from "@expo/vector-icons";

import YourPostsScreen from "../screens/YourPostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AllPostsScreen from "../screens/AllPostsScreen";
import InformationScreen from "../screens/post-types/InformationScreen";
import ServicesScreen from "../screens/post-types/ServicesScreen";
import SalesScreen from "../screens/post-types/SalesScreen";
import TradingScreen from "../screens/post-types/TradingScreen";
import FunScreen from "../screens/post-types/FunScreen";
import OtherScreen from "../screens/post-types/OtherScreen";
import Colors from "../constants/Colors";

// nav options for stack that configures header style
const defaultStackNavOptions = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
      height: Dimensions.get("window").height * 0.12,
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
      fontSize: 20,
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
    headerTintColor: Colors.accentColor,
  };
};

// create stack navigators for each screen
const YourPostsNav = createStackNavigator(
  {
    YourPosts: YourPostsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions("Your Posts"),
  }
);
const CreatePostsNav = createStackNavigator(
  {
    CreatePosts: CreatePostsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions("Create Posts"),
  }
);
const MessagesNav = createStackNavigator(
  {
    Messages: MessagesScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions("Messages"),
  }
);
const SettingsNav = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions("Settings"),
  }
);
const AllPostsNav = createStackNavigator(
  {
    AllPosts: AllPostsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const InformationNav = createStackNavigator(
  {
    Information: InformationScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const ServicesNav = createStackNavigator(
  {
    Services: ServicesScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const SalesNav = createStackNavigator(
  {
    Sales: SalesScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const TradingNav = createStackNavigator(
  {
    Trading: TradingScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const FunNav = createStackNavigator(
  {
    Fun: FunScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const OtherNav = createStackNavigator(
  {
    Other: OtherScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// drawer navigation for filtering posts
const PostFilteringNavigator = createDrawerNavigator(
  {
    AllPosts: {
      screen: AllPostsNav,
      navigationOptions: {
        drawerLabel: "All Posts",
      },
    },
    Information: {
      screen: InformationNav,
      navigationOptions: {
        drawerLabel: "Information",
      },
    },
    Services: {
      screen: ServicesNav,
      navigationOptions: {
        drawerLabel: "Services",
      },
    },
    Sales: {
      screen: SalesNav,
      navigationOptions: {
        drawerLabel: "Sales",
      },
    },
    Trading: {
      screen: TradingNav,
      navigationOptions: {
        drawerLabel: "Trading",
      },
    },
    Fun: {
      screen: FunNav,
      navigationOptions: {
        drawerLabel: "Fun",
      },
    },
    Other: {
      screen: OtherNav,
      navigationOptions: {
        drawerLabel: "Other",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
      },
    },
  }
);

// main app navigator
const Navigator = createBottomTabNavigator(
  {
    Posts: {
      screen: PostFilteringNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <AntDesign name="home" size={25} color={tabInfo.tintColor} />;
        },
        tabBarOnPress: (navData) => {
          navData.navigation.navigate({ routeName: "AllPosts" });
          navData.defaultHandler();
        },
      },
    },
    YourPosts: {
      screen: YourPostsNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <AntDesign name="user" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    CreatePosts: {
      screen: CreatePostsNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign name="plussquareo" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Messages: {
      screen: MessagesNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign name="message1" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Settings: {
      screen: SettingsNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign name="setting" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "black",
    },
  }
);

export default createAppContainer(Navigator);
