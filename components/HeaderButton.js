import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { normalize } from "../components/DefaultText";

// Header button for ionicon icons; see usage in AllPostsScreen
const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={normalize(30, "width")}
      color="black"
    />
  );
};

export default CustomHeaderButton;
