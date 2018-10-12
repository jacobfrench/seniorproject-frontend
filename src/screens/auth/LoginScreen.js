import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo';
import IconTextInput from 'app/src/components/common/IconTextInput';
import { Button } from 'app/src/components/common/Button';
import api from 'app/src/api';
import { connect } from 'react-redux';
import { loginUser, setUserEmail, fetchUserInfoByEmail } from 'app/src/redux/actions';
import { store } from 'app/src/redux/store';



//images
const emailIcon = require('app/assets/icons/email.png');
const keyIcon = require('app/assets/icons/key.png');
const logo2 = require('app/assets/icons/logo.png');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }
  onLoginPress() {
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
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={[theme.primary, theme.primaryVariant]}
      >
        <View style={styles.header}>
          <Image source={logo2} resizeMode='contain' />
        </View>

        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior='padding'
          enabled
        >
          <IconTextInput
            src={emailIcon}
            placeholder='E-mail'
            style={styles.inputUsername}
            onChangeText={text => this.props.setUserEmail(text)}
            keyboardType='email-address'
          />
          <IconTextInput
            src={keyIcon}
            placeholder='Password'
            secureTextEntry
            style={styles.inputPassword}
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            text='Forgot your password?'
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            textStyle={styles.forgotPasswordText}
            style={styles.forgotPasswordButton}
          />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <Button
              text='Login'
              onPress={() => this.onLoginPress()}
              style={styles.signInButton}
            />
            <Button
              text='Sign Up'
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={styles.signUpButton}
            />
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
  inputUsername: {
    marginBottom: 20,
    borderColor: theme.onPrimary
  },
  inputPassword: {
    borderColor: theme.onPrimary,
    marginBottom: 20
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderColor: theme.onPrimary,
    borderWidth: 2,
    width: '45%',
    marginRight: 5,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
  },
  signUpButton: {
    backgroundColor: theme.secondary,
    borderRadius: 100,
    width: '45%',
    marginLeft: 5,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
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
    fontSize: 15
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
