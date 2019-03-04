import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, LayoutAnimation, SafeAreaView } from 'react-native';
import uuidv4 from 'uuid/v4';
import MessageList from 'app/src/components/messaging/ChatScreen/MessageList';
import MessageListFooter from 'app/src/components/messaging/ChatScreen/MessageListFooter';
import messages from './dummyData/messages';
import { Header } from 'react-navigation';

const currentUserId = 0;
const receiverId = 1;

const CustomLayoutAnimation = {
    duration: 300,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.linear
    },
};

export default class ChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [...messages],
            messageInputText: '',
            sendButtonDisabled: true,
            reRenderList: true
        }
    }

    _handleMessageSubmitButton() {
        let newState = [this._createNewMessage(), ...this.state.messages];
        LayoutAnimation.configureNext(CustomLayoutAnimation);
        this.setState({ messages: newState }, () => {
            this.setState({ messageInputText: '' }, () => {
                this.setState({ sendButtonDisabled: true });
            });
        });
    }

    _handleUserInput(messageInputText) {
        this.setState({ messageInputText }, () => {
            if (this.state.messageInputText.length > 0)
                this.setState({ sendButtonDisabled: false })
            else if (this.state.messageInputText.length == 0)
                this.setState({ sendButtonDisabled: true })
        });
    }

    _createNewMessage() {
        return {
            text: this.state.messageInputText,
            id: uuidv4(),
            senderId: currentUserId,
            receiverId: receiverId,
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={Header.HEIGHT + 24}
                >
                    <MessageList
                        messages={this.state.messages}
                    />
                    <MessageListFooter
                        messageInputText={this.state.messageInputText}
                        sendButtonDisabled={this.state.sendButtonDisabled}
                        _handleUserInput={this._handleUserInput.bind(this)}
                        _handleMessageSubmitButton={this._handleMessageSubmitButton.bind(this)}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight
    },
});
