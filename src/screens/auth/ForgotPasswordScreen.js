import React from "react";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo";
import { store } from 'app/src/redux/store';


const theme = store.getState().settings.theme;
export default class ForgotPasswordScreen extends React.Component {


  render() {
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={[theme.primary, theme.primaryVariant]}
      >
        <Text>Forgot password screen </Text>

      </LinearGradient>
    );
  }
}

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

});
