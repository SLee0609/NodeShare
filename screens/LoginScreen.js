import React, { useState } from "react";
import { firebase } from "../firebase/config";
import {
  Image,
  Text,
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
import Colors from "../constants/Colors";

// Screen where users can log in
const LoginScreen = (props) => {
  // states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // checks email and password if user clicks "log in" button
  const onLoginPress = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            if (!user.emailVerified) {
              Alert.alert("Email not verified");
              firebase.auth().signOut();
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
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
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
    margin: 5,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#5063b3",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#5063b3",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
