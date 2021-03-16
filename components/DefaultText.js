import React from "react";
import { Text, StyleSheet } from "react-native";

// Accepts a string and returns a text component in open-sans font
const DefaultText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});

export default DefaultText;
