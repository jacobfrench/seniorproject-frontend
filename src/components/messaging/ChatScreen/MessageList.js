import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import Message from './Message';

var currentUserId = 0;

class MessageList extends Component {
  
  _renderMessages = ({item}) => {
      return(
        <Message 
          text={item.text} 
          isSender={item.senderId == currentUserId ? true : false}
        />
      );
  }
  
  render() {
    return(
      <FlatList
        data={this.props.messages}
        renderItem={this._renderMessages}
        keyExtractor={(item, index) => item.id}
        extraData={this.state}
        inverted
        style={this.props.style}
      />
    );
  }
}

export default MessageList;