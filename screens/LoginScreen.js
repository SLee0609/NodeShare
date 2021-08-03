import React, { useState } from "react";
import { firebase } from "../firebase/config";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DefaultText, normalize } from "../components/DefaultText";
import Colors from "../constants/Colors";

// Screen where users can log in
const LoginScreen = (props) => {
  // states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function called to resend verification email
  const resendVerification = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let s = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.sendEmailVerification().then(() => {
              Alert.alert("Verification email sent again");
            });
          }
        });
        s();
      })
      .catch((error) => {
        if (Platform.OS === "ios") {
          Alert.alert(error.message);
        } else {
          Alert.alert("", error.message);
        }
        return;
      });
  };
  const onForgotPassword = () => {
    if (!email) {
      Alert.alert("Enter email above");
      return;
    }
    if (email.split("@").length - 1 != 1) {
      Alert.alert("Not a valid email");
      return;
    }
    if (!email.toLowerCase().endsWith("@loomis.org")) {
      Alert.alert("Not a Loomis Chaffee email");
      return;
    }
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(Alert.alert("Password reset email sent"))
      .catch(function (error) {
        if (Platform.OS === "ios") {
          Alert.alert(error.message);
        } else {
          Alert.alert("", error.message);
        }
      });
  };
  // checks email and password if user clicks "log in" button
  const onLoginPress = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let s = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            if (!user.emailVerified) {
              firebase.auth().signOut();
              Alert.alert("Email not verified", "Resend verification email?", [
                { text: "No", style: "destructive" },
                { text: "Yes", onPress: resendVerification },
              ]);
              return;
            } else {
              // locally storing user ID
              AsyncStorage.setItem("userId", user.uid).then(
                props.navigation.navigate("App")
              );
              return;
            }
          }
        });
        s();
      })
      .catch((error) => {
        if (Platform.OS === "ios") {
          Alert.alert(error.message);
        } else {
          Alert.alert("", error.message);
        }
        return;
      });
  };

  // navigates to registration screen if user clicks "sign up" button
  const onFooterLinkPress = () => {
    props.navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        extraScrollHeight={normalize(60, "height")}
      >
        <Image
          style={styles.logo}
          source={require("../assets/icontransparent.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="School E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text.replace(" ", ""))}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onLoginPress}>
          <DefaultText style={styles.buttonTitle}>Log in</DefaultText>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <DefaultText style={styles.footerText}>
            Don't have an account?{" "}
            <DefaultText onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </DefaultText>
          </DefaultText>
          <DefaultText onPress={onForgotPassword} style={styles.footerLink}>
            Forgot Password?
          </DefaultText>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

LoginScreen.navigationOptions = (navData) => {
  return {
    cardStyle: { backgroundColor: Colors.logoBlue },
    headerLeft: () => null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.7,
    alignSelf: "center",
    margin: normalize(5, "width"),
  },
  input: {
    height: normalize(48, "height"),
    borderRadius: normalize(5, "width"),
    overflow: "hidden",
    backgroundColor: "white",
    marginVertical: normalize(10, "height"),
    marginHorizontal: normalize(30, "width"),
    paddingLeft: normalize(16, "width"),
    fontSize: normalize(14, "width"),
  },
  button: {
    backgroundColor: "#5063b3",
    marginHorizontal: normalize(30, "width"),
    marginTop: normalize(20, "height"),
    height: normalize(48, "height"),
    borderRadius: normalize(5, "width"),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "System",
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: normalize(20, "height"),
    marginBottom: normalize(50, "height"),
  },
  footerText: {
    fontSize: 16,
    fontFamily: "System",
    color: "#2e2e2d",
    marginBottom: normalize(20, "height"),
  },
  footerLink: {
    color: "#5063b3",
    fontFamily: "System",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
