import React, { useState } from "react";
import { firebase } from "../firebase/config";
//import { database } from '@react-native-firebase/database';

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
import Colors from "../constants/Colors";

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
    // if (!email.toLowerCase().endsWith("@loomis.org")) {
    //   Alert.alert("Not a Loomis Chaffee email");
    //   return;
    // }
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
      .then(()=>{
        s=firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            user.sendEmailVerification()
              .then(()=>{
                Alert.alert("Verification email sent");
                firebase
                  .database()
                  .ref(`users/${user.uid}`)
                  .set({ firstName: firstName, lastName: lastName })
                  .catch((error) => {
                    Alert.alert(error.message);
                    return;
                  })
                  .then(()=>{
                    firebase.auth().signOut();
                    props.navigation.navigate("Login")
                  });
              })
          }
        })
        s();
      })
      .catch((error)=>{
        switch (error.code) {
          case 'auth/email-already-in-use':
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(()=>{
                s=firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    if(user.emailVerified){
                      Alert.alert("Email already in use");
                    }else{
                      Alert.alert("Email not verified 2");
                    }
                  }
                })
                s();
              })
              .catch((error)=>{
                Alert.alert(error.message);
              })
            /*firebase
              .auth()
              .getUserByEmail(email)
              .then((userRecord) => {
                if(userRecord.emailVerified){
                  Alert.alert("Email already in use");
                }else{
                  Alert.alert("Email not verified. Send again?");
                }
              })
              .catch((error) => {
                Alert.alert(error.message);
              });*/
            break;
          default:
            if (Platform.OS === "ios") {
              Alert.alert(error.message);
            } else {
              Alert.alert("", error.message);
            }
            break;
        }
      });
    
    /*firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(()=>{
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            if(user.emailVerified){
              Alert.alert("Email already in use")
            }else{
              Alert.alert("Email not verified, ")
            }
          }
        }
      })
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert("Email already in use")
            break;
          default:
            if (Platform.OS === "ios") {
              Alert.alert(error.message);
            } else {
              Alert.alert("", error.message);
            }
            break;
        }
        /*if (Platform.OS === "ios") {
          Alert.alert(error.message);
        } else {
          Alert.alert("", error.message);
        }
      });
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            if (!user.emailVerified) {
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebase
                    .auth()
                    .currentUser.sendEmailVerification()
                    .then(() => {
                      Alert.alert("Verification email sent");
                      firebase
                        .database()
                        .ref(`users/${user.uid}`)
                        .set({ firstName: firstName, lastName: lastName })
                        .catch((error) => {
                          Alert.alert(error.message);
                          return;
                        })
                        .then(props.navigation.navigate("Login"));
                    })
                    .catch((error) => {
                      Alert.alert(error.message);
                      return;
                    });
                  // User is signed in.
                }
              });
              firebase.auth().signOut();
              return;
            } else {
              // locally storing user ID
              
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
      });*/
      
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
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
    margin: 5,
  },
  nameContainer: {
    flexDirection: "row",
  },
  firstNameInput: {
    flex: 1,
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 10,
    paddingLeft: 16,
  },
  lastNameInput: {
    flex: 1,
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 30,
    paddingLeft: 16,
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

export default RegistrationScreen;
