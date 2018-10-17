import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SimpleButton } from 'app/src/components/common';
import { store } from 'app/src/redux/store';
const theme = store.getState().settings.theme;

class MessageListFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.props._handleUserInput}
          value={this.props.messageInputText}
          placeholder="Type a Message"
          // placeholderTextColor={theme.onBackground}
          multiline
        />
        <SimpleButton
          style={[styles.sendButton, this.props.sendButtonDisabled ? styles.disabledButton : null]}
          textStyle={[styles.sendButtonText, this.props.sendButtonDisabled ? styles.sendButtonTextDisabled : styles.sendButtonTextEnabled]}
          onPress={this.props._handleMessageSubmitButton}
          disabled={this.props.sendButtonDisabled}
        >
          Send
        </SimpleButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
  },
  input: {
    padding: 10,
    borderRadius: 20,
    flex: 4,
    backgroundColor: 'lightgrey',
    fontSize: 16,
    margin: 6,
    marginRight: 3,
    justifyContent: 'center',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    flex: 1,
    margin: 5,
    marginLeft: 2
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  sendButtonTextEnabled: {
    color: theme.primary,  // Colors.flat.white,
  },
  sendButtonTextDisabled: {
    color: 'gray',  // Colors.flat.white,
  },
  disabledButton: {
    // backgroundColor: 'rgba(15, 15, 15, 0.5)',
  }
});
export default MessageListFooter;