import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo";
import { TextInput, Button, Headline } from 'react-native-paper';
import api from "app/src/api";


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
      if (Platform.OS == 'android')
        ToastAndroid.show("Signup successful.", ToastAndroid.LONG);
      this.props.navigation.goBack();
    } else {
      alert("Passwords must match and be at least 6 characters long.");
    }
  }

  signUpWithFacebook() { }

  signUpWithGoogle() { }

  render() {
    return (
      <SafeAreaView styles={{flex: 1}}>
      <LinearGradient
        style={styles.linearGradient}
        colors={['#6200ee', '#6200ee']}
      >
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior="padding"
          enabled
        >
          <View style={styles.header}>
            <Headline style={[styles.headerText, {color: 'white'}]}>Sign Up</Headline>
          </View>

          <TextInput
            label='Email'
            placeholder='Email'
            style={styles.input}
            onChangeText={text => this.setState({ email: text })}
            keyboardType='email-address'
            mode={'flat'}
            underlineColor={'transparent'}
          />
          <TextInput
            label='First Name'
            placeholder='First Name'
            style={styles.input}
            onChangeText={text => this.setState({ firstName: text })}
            mode={'flat'}
            underlineColor={'transparent'}
          />
          <TextInput
            label='Last Name'
            placeholder="Last Name"
            style={styles.input}
            onChangeText={text => this.setState({ lastName: text })}
            mode={'flat'}
            underlineColor={'transparent'}
          />
          <TextInput
            label='Password'
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            mode={'flat'}
            underlineColor={'transparent'}
          />

          <TextInput
            label='Password'
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            onChangeText={text => this.setState({ confirmPassword: text })}
            mode={'flat'}
            underlineColor={'transparent'}
          />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <Button
              mode='contained'
              onPress={() => this.signUp()}
              style={[styles.signUpButton, {backgroundColor: '#2ecc71'}]}
            >
              Sign Up
            </Button>
          </View>

          <Button
            text="Already have an account?"
            mode='text'
            color='white'
            onPress={() => this.props.navigation.navigate("Login")}
            style={[styles.forgotPasswordButton]}
          >
            Already have an account?
          </Button>
        </View>
      </LinearGradient>
      </SafeAreaView>
    );
  }
}

// const theme = store.getState().settings.theme;
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
  },
  inputPassword: {
    marginBottom: 20
  },
  signInButton: {
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 100,
    borderWidth: 1,
    width: "45%",
    marginRight: 5,
  },
  signUpButton: {
    borderRadius: 5,
    width: "85%",
    margin: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    padding: 10
  },
  header: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 32,
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
  },
  input: {
    marginBottom: 20,
    borderRadius: 5,
    height: 55,
    width: '85%',
    elevation: 5
  }
});
