import React, { useState, useEffect, useRef } from "react";
import { AppState, LogBox, StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Asset } from "expo-asset";
import * as Notifications from 'expo-notifications';
import { setHandler, registerNotifications, sendNotificationMessage, exitChatScreen, enterChatScreen } from "./functions/notifications";
import Navigator from "./navigation/Navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optimize navigation performances
enableScreens();

// Ignore warning that is thrown about usage of old version of react-navigation
LogBox.ignoreLogs([
  "It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens",
]);

// Ignore warning that is thrown - remove when react-navigation releases an update (warns about future incompatibility when expo is upgraded to SDK 41)
LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
]);

// Ignore warning from setting a timer for a long period of time
LogBox.ignoreLogs(["Setting a timer"]);

// Function to load assets
const loadAssets = async () => {
  const imageAssets = Asset.loadAsync([
    require("./assets/icontransparent.png"),
    require("./assets/splash.png"),
    require("./assets/cameraicon.png"),
    require("./assets/defaultprofilepicture.png"),
  ]);
  const fontAssets = Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  await Promise.all([imageAssets, fontAssets]);
};

// notification setup stuff
Notifications.setNotificationHandler({
  handleNotification: async () => ({
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
  }),
});

export default function App() {
  // State to check if assets are loaded
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // notification setup
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const appState = useRef(AppState.currentState);

  // more notifications setup
  useEffect(() => {
    registerNotifications().then(token => setExpoPushToken(token));

    // tracks the current app state (foreground or background)
    AppState.addEventListener('change', _handleAppStateChange);

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
      Notifications.removeNotificationSubscription(notificationListener.current);
    }
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    // get locally stored userId
    // check if user is logged in
    const checkUserId = await AsyncStorage.getItem("userId");
    
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // app has come to foreground
      if (checkUserId != null) {
        currScreenState = await AsyncStorage.getItem('focusedUser');
        if (currScreenState != '') {
          enterChatScreen(currScreenState);
      }
      } else {
        if (checkUserId != null) {
          exitChatScreen();
        }
      }
    } else {
      // app has gone to background
      if (checkUserId != null) {
        exitChatScreen();
      }
    }

    appState.current = nextAppState;
  };

  // Load fonts
  if (!assetsLoaded) {
    return (
      <AppLoading
        startAsync={loadAssets}
        onFinish={() => setAssetsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // Main app starts here - Navigator is the top layer component
  return (
    <SafeAreaProvider style={styles.container} >
      <Navigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
