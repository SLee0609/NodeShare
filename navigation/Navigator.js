import React from "react";
import { Dimensions, Platform } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { normalize } from "../components/DefaultText";
import LoadingScreen from "../screens/LoadingScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import SavedPostsScreen from "../screens/SavedPostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SetUpProfileScreen from "../screens/SetUpProfileScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import AllPostsScreen from "../screens/AllPostsScreen";
import InformationScreen from "../screens/post-types/InformationScreen";
import ServicesScreen from "../screens/post-types/ServicesScreen";
import SalesScreen from "../screens/post-types/SalesScreen";
import TradingScreen from "../screens/post-types/TradingScreen";
import FunScreen from "../screens/post-types/FunScreen";
import OtherScreen from "../screens/post-types/OtherScreen";
import Colors from "../constants/Colors";

// Default nav options for stack navigators
const defaultStackNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: Dimensions.get("window").height * 0.14,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: normalize(25, "width"),
  },
  headerTintColor: Colors.accentColor,
  headerBackTitleVisible: false,
  cardStyle: { backgroundColor: "black" },
};

const defaultStackNavOptionsWithoutHeader = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: normalize(114, "height"),
  },
  headerShown: false,
  cardStyle: { backgroundColor: "black" },
};

// Create stack navigators for each screen
const LoadingNav = createStackNavigator(
  {
    Loading: LoadingScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptionsWithoutHeader,
  }
);
const LoginNav = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const RegistrationNav = createStackNavigator(
  {
    Registration: RegistrationScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const SavedPostsNav = createStackNavigator(
  {
    SavedPosts: SavedPostsScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const CreatePostsNav = createStackNavigator(
  {
    CreatePosts: CreatePostsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const MessagesNav = createStackNavigator(
  {
    Messages: MessagesScreen,
    Chat: ChatScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const ProfileNav = createStackNavigator(
  {
    Profile: ProfileScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const SetUpProfileNav = createStackNavigator(
  {
    SetUpProfile: SetUpProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const AllPostsNav = createStackNavigator(
  {
    AllPosts: AllPostsScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const InformationNav = createStackNavigator(
  {
    Information: InformationScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const ServicesNav = createStackNavigator(
  {
    Services: ServicesScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const SalesNav = createStackNavigator(
  {
    Sales: SalesScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const TradingNav = createStackNavigator(
  {
    Trading: TradingScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const FunNav = createStackNavigator(
  {
    Fun: FunScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const OtherNav = createStackNavigator(
  {
    Other: OtherScreen,
    PostDetail: PostDetailScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

// Drawer navigation default content options
const defaultDrawerContentOptions = {
  activeTintColor: Colors.primaryColor,
  itemsContainerStyle:
    Platform.OS === "android"
      ? { paddingTop: normalize(50, "height") }
      : { paddingTop: 0 },
  itemStyle: { marginVertical: normalize(3, "height") },
  labelStyle: {
    fontFamily: "open-sans-bold",
    fontSize: normalize(20, "width"),
  },
};

// Drawer navigation for filtering posts
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
    drawerWidth: Dimensions.get("window").width * 0.75,
    contentOptions: defaultDrawerContentOptions,
  }
);

// BottomTabNavigator navigator is the bottom tab navigator with 5 icons
const BottomTabNavigator = createBottomTabNavigator(
  {
    Posts: {
      screen: PostFilteringNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign
              name="home"
              style={{
                height: normalize(25, "width"),
                width: normalize(25, "width"),
              }}
              size={normalize(25, "width")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    SavedPosts: {
      screen: SavedPostsNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesome
              style={{
                height: normalize(25, "width"),
                width: normalize(25, "width"),
              }}
              name={"bookmark-o"}
              size={normalize(25, "width")}
              color={"white"}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    CreatePost: {
      screen: CreatePostsNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign
              style={{
                height: normalize(25, "width"),
                width: normalize(25, "width"),
              }}
              name="plussquareo"
              size={normalize(25, "width")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Messages: {
      screen: MessagesNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign
              name="message1"
              style={{
                height: normalize(25, "width"),
                width: normalize(25, "width"),
              }}
              size={normalize(25, "width")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <AntDesign
              name="user"
              style={{
                height: normalize(25, "width"),
                width: normalize(25, "width"),
              }}
              size={normalize(25, "width")}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    initialRouteName: "Posts",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "black",
        height: normalize(25, "width") + normalize(30, "height"),
        width: "100%",
        borderTopColor: Colors.gray,
        borderTopWidth: normalize(1, "height"),
      },
      activeTintColor: "white",
      keyboardHidesTabBar: true,
    },
  }
);

// AuthStackNavigator navigates between login / registration screens
const AuthStackNavigator = createStackNavigator(
  {
    Registration: RegistrationNav,
    Login: LoginNav,
  },
  {
    defaultNavigationOptions: defaultStackNavOptionsWithoutHeader,
  }
);

// Main app navigator
const Navigator = createSwitchNavigator(
  {
    Loading: LoadingNav,
    SetUpProfile: SetUpProfileNav,
    App: BottomTabNavigator,
    Authentication: AuthStackNavigator,
  },
  {
    initialRouteName: "Loading",
  }
);

export default createAppContainer(Navigator);
