import React, { useState } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import Navigator from "./navigation/Navigator";

// Optimize navigation performances
enableScreens();

// Ignore warning that is thrown about usage of old version of react-navigation
LogBox.ignoreLogs([
  "It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens",
]);

// // Ignore warning that is thrown - remove when react-navigation releases an update (warns about future incompatibility when expo is upgraded to SDK 41)
// LogBox.ignoreLogs([
//   "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
// ]);

// Function to load fonts
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // State to check if font is loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // Main app starts here - Navigator is the top layer componenet
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
}
