import React from 'react';
import api from 'app/src/api';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { store } from 'app/src/redux/store';
import { StyleSheet, View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { loginUser, setUserEmail, fetchUserInfoByEmail } from 'app/src/redux/actions';
import { TextInput, Button, Text, Headline } from 'react-native-paper';

// images
const logo2 = require('app/assets/icons/logo.png');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };

  }

  onLoginPress = () => {
    console.log(this.props);
    api.login(this.props.email, this.state.password)
      .then(() => this.authenticate());
  }

  authenticate() {
    if (this.props.authToken) {
      this.props.loginUser();
      this.props.fetchUserInfoByEmail(this.props.email);
    }
  }

  render() {
    // const {colors} = this.props.theme;
    return (
      <LinearGradient
        style={styles.linearGradient}
        // colors={['#00d2ff', '#3a7bd5']}
        colors={['#6200ee', '#6200ee']}
      >
        <View style={styles.header}>
          <Image source={logo2} resizeMode='contain' />
          <Headline style={{fontFamily: 'sans-serif-condensed', padding:15, color: 'white'}}>Lynx</Headline>
        </View>

        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior='padding'
          enabled
        >

            <TextInput
              label='E-mail'
              placeholder='E-Mail'
              style={styles.input}
              onChangeText={text => this.props.setUserEmail(text)}
              keyboardType='email-address'
              mode={'flat'}
              underlineColor={'transparent'}
            />

          <TextInput
            label='Password'
            placeholder='Password'
            style={styles.input}
            onChangeText={(password) => this.setState({ password: password })}
            mode={'flat'}
            underlineColor={'transparent'}
            secureTextEntry={true}
          />

          <TouchableOpacity
            text='Forgot your password?'
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              dark={false}
              style={styles.loginButton}
              onPress={this.onLoginPress}>
              Login
            </Button>

            <Button 
              mode="contained" 
              style={styles.signUpButton}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              Sign Up
            </Button>
          </View>
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
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginBottom: 20,
    borderRadius: 5,
    height: 55,
    width: '85%',
    elevation: 5
  },
  loginButton: {
    backgroundColor: '#fff',
    width: '45%',
    marginRight: 5,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    padding: 5,
  },
  signUpButton: {
    backgroundColor: theme.primary,
    width: '45%',
    marginLeft: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    padding: 5
  },
  header: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 6
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  forgotPasswordText: {
    fontSize: 15,
    color: 'white'
  },
  forgotPasswordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    authToken: state.authToken,
    email: state.user.info.username
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    setUserEmail,
    fetchUserInfoByEmail,
  }
)(LoginScreen);
