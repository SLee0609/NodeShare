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

import { DefaultText, normalize } from "../components/DefaultText";
import Colors from "../constants/Colors";
import { storeUserData } from "../functions/io";

// Screen where users can register an account
const RegistrationScreen = (props) => {
  // states for name, email, and password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // switches to login page if user clicks the "login" button
  const onFooterLinkPress = () => {
    props.navigation.navigate("Login");
  };

  // saves account information in Firebase when user clicks "Create account" button
  const onRegisterPress = () => {
    if (!firstName || !lastName) {
      Alert.alert("Enter first and last names");
      return;
    }
    if (!email) {
      Alert.alert("No email provided");
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
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let s = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.sendEmailVerification().then(() => {
              Alert.alert("Verification email sent");
              storeUserData(user.uid, firstName, lastName, email.toLowerCase());
              firebase
                .auth()
                .signOut()
                .then(props.navigation.navigate("Login"));
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
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.firstNameInput}
            placeholder="First Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFirstName(text)}
            onEndEditing={(e) => setFirstName(e.nativeEvent.text.trim())}
            value={firstName}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.lastNameInput}
            placeholder="Last Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setLastName(text)}
            onEndEditing={(e) => setLastName(e.nativeEvent.text.trim())}
            value={lastName}
            underlineColorAndroid="transparent"
          />
        </View>
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
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
          <DefaultText style={styles.buttonTitle}>Create account</DefaultText>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <DefaultText style={styles.footerText}>
            Already got an account?{" "}
            <DefaultText onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </DefaultText>
          </DefaultText>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

RegistrationScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => null,
    cardStyle: { backgroundColor: Colors.logoBlue },
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
  nameContainer: {
    flexDirection: "row",
  },
  firstNameInput: {
    flex: 1,
    height: normalize(48, "height"),
    borderRadius: normalize(5, "width"),
    overflow: "hidden",
    backgroundColor: "white",
    marginVertical: normalize(10, "height"),
    marginLeft: normalize(30, "width"),
    marginRight: normalize(10, "width"),
    paddingLeft: normalize(16, "width"),
    fontSize: normalize(14, "width"),
  },
  lastNameInput: {
    flex: 1,
    height: normalize(48, "height"),
    borderRadius: normalize(5, "width"),
    overflow: "hidden",
    backgroundColor: "white",
    marginVertical: normalize(10, "height"),
    marginLeft: normalize(10, "width"),
    marginRight: normalize(30, "width"),
    paddingLeft: normalize(16, "width"),
    fontSize: normalize(14, "width"),
  },
  input: {
    height: normalize(48, "height"),
    borderRadius: normalize(5, "width"),
    overflow: "hidden",
    backgroundColor: "white",
    marginVertical: normalize(10, "height"),
    marginLeft: normalize(30, "width"),
    marginRight: normalize(30, "width"),
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
  },
  footerLink: {
    color: "#5063b3",
    fontWeight: "bold",
    fontFamily: "System",
    fontSize: 16,
  },
});

export default RegistrationScreen;
