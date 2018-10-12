import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform
} from "react-native";
import { LinearGradient } from "expo";
import { store } from 'app/src/redux/store';
import IconTextInput from "app/src/components/common/IconTextInput";
import { Button, IconButton } from "app/src/components/common/Button";
import api from "app/src/api";

//images
const facebookIcon = require("app/assets/icons/facebook-logo.png");
const googleIcon = require("app/assets/icons/google-plus.png");

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: ""
    };
  }

  signUp() {
    let pass1 = this.state.password;
    let pass2 = this.state.confirmPassword;
    let passwordsMatch = pass1 != "" && pass2 != "" && pass1 === pass2;
    if (passwordsMatch) {
      api.createNewUser(this.state);
      if(Platform.OS == 'android')
        ToastAndroid.show("Signup successful.", ToastAndroid.LONG);
      this.props.navigation.goBack();
    } else {
      alert("Passwords must match and be at least 6 characters long.");
    }
  }

  signUpWithFacebook() {}

  signUpWithGoogle() {}

  render() {
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={[theme.primary, theme.primaryVariant]}
      >
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior="padding"
          enabled
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
          </View>
          <IconTextInput
            placeholder="Email"
            style={styles.inputUsername}
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            selectionColor={theme.onPrimary}
          />
          <IconTextInput
            placeholder="First Name"
            style={styles.inputUsername}
            onChangeText={text => this.setState({ firstName: text })}
            keyboardType="email-address"
            selectionColor={theme.onPrimary}
          />
          <IconTextInput
            placeholder="Last Name"
            style={styles.inputUsername}
            onChangeText={text => this.setState({ lastName: text })}
            keyboardType="email-address"
            selectionColor={theme.onPrimary}
          />
          <IconTextInput
            placeholder="Password"
            secureTextEntry
            style={styles.inputPassword}
            onChangeText={text => this.setState({ password: text })}
            selectionColor={theme.onPrimary}
          />
          <IconTextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.inputPassword}
            onChangeText={text => this.setState({ confirmPassword: text })}
            selectionColor={theme.onPrimary}
          />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <Button
              text="Sign Up"
              onPress={() => this.signUp()}
              style={styles.signUpButton}
            />
          </View>
          <View style={styles.buttonContainer}>
            <IconButton
              icon={facebookIcon}
              onPress={() => this.signUpWithFacebook()}
              style={styles.facebookButton}
            />
            <IconButton
              icon={googleIcon}
              onPress={() => this.signUpWithGoogle()}
              style={styles.googleButton}
            />
          </View>
          <Button
            text="Already have an account?"
            onPress={() => this.props.navigation.navigate("Login")}
            textStyle={styles.forgotPasswordText}
            style={styles.forgotPasswordButton}
          />
        </View>
      </LinearGradient>
    );
  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inputUsername: {
    marginBottom: 20,
    borderColor: theme.onPrimary
  },
  inputPassword: {
    borderColor: theme.onPrimary,
    marginBottom: 20
  },
  signInButton: {
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 100,
    borderColor: theme.secondary,
    borderWidth: 1,
    width: "45%",
    marginRight: 5,
    elevation: 1
  },
  signUpButton: {
    backgroundColor: theme.onSecondary,
    borderRadius: 100,
    width: "85%",
    marginLeft: 5,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
  },
  header: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 32,
    color: theme.onPrimary,
    marginTop: 25,
    marginBottom: 35
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 6
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 2
  },
  forgotPasswordText: {
    fontSize: 15
  },
  forgotPasswordButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  facebookButton: {
    backgroundColor: 'blue',
    marginRight: 10,
    elevation: 1,
    padding: 10,
    borderRadius: 10
  },
  googleButton: {
    backgroundColor: 'blue',
    marginLeft: 10,
    elevation: 1,
    padding: 10,
    borderRadius: 10
  }
});
