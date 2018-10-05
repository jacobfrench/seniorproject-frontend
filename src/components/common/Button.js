import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { store } from 'app/src/redux/store';

class Button extends React.Component {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.buttonStyle, this.props.style]}
        {...this.props}
      >
        <Text style={[styles.textStyle, this.props.textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

class IconButton extends React.Component {
  render() {
    const { icon } = this.props;
    return (
      <TouchableOpacity
        style={[styles.iconButtonStyle, this.props.style]}
        {...this.props}
      >
        <Image source={icon} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  }
}

export { Button, IconButton };

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: theme.text,
    textAlign: "center",
    padding: 10
  },
  buttonStyle: {
    backgroundColor: theme.primary,
    borderRadius: 100,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    alignSelf: "baseline"
  },
  iconButtonStyle: {
    backgroundColor: theme.primary,
    borderRadius: 100,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  iconStyle: {
    width: 25,
    height: 25
  }
});
