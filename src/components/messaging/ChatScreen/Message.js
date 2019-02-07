import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { store } from 'app/src/redux/store';
const theme = store.getState().settings.theme;

class Message extends Component {
  _determineContainerStyles() {
    return this.props.isSender ? styles.senderContainer
                      : styles.receiverContainer
  }
  
  _determineTextStyles() {
    return this.props.isSender ? styles.senderMessageText : styles.receiverMessageText;
  }
  
  render(){
    return(
        <View style={[this._determineContainerStyles(), styles.container]}>
          <Text style={[styles.messageText, this._determineTextStyles()]}>{this.props.text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.2,
    maxWidth: '66%',
    elevation: 2,
  },
  senderContainer: {
    alignSelf: 'flex-end', 
    backgroundColor: theme.primary//'rgba(255,255,255,0.6)'
  },
  receiverContainer: {
    alignSelf: 'flex-start', 
    backgroundColor: theme.background
  },
  messageText: {
    padding: 10,
    fontSize: 15,
  },
  senderMessageText: {
    color: 'white'
  }, 
  receiverMessageText: {
  }
})

export default Message;