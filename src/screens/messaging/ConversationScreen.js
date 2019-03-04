import React, { Component } from 'react';
import { 
    StyleSheet, 
    KeyboardAvoidingView, 
    LayoutAnimation, 
    SafeAreaView, 
    View, 
    Text 
} from 'react-native';
import { List } from 'react-native-paper';
import Conversation from 'app/src/components/messaging/Conversation';
import uuidv4 from 'uuid/v4';
import MessageList from 'app/src/components/messaging/ChatScreen/MessageList';
import MessageListFooter from 'app/src/components/messaging/ChatScreen/MessageListFooter';
import messages from './dummyData/messages';
// import { List } from 'react-native-elements';

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
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Conversation
                    name='jacob French'
                    message='MESSAGE.'
                    date='03/04/19'
                    time='11:02 AM'
                />
                {/* <List.Item
                    title='Kuljit Singh'
                    description='Makes sense.'
                    left={props => <List.Icon {...props} 
                        icon={({ size, color }) => (
                            <View style={{
                                height: 40,
                                width: 40,
                                borderRadius: 40/2,
                                backgroundColor: '#6200ee',
                                justifyContent:'center',
                                alignItems:'center',
                            }}>
                                <Text style={{
                                    color:'white',
                                    fontSize:18,
                                }}>KS</Text>
                            </View>
                        )}
                    />}
                    right={props =>
                        <View style={{
                            justifyContent: 'center'
                        }}> 
                            <Text>02/07/19</Text>
                            <Text>02:12 PM</Text>
                        </View>
                    }
                    onPress={()=> this.props.navigation.navigate('ChatScreen')}
                    style={{backgroundColor: 'white', borderRadius:2}}
                /> */}
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
