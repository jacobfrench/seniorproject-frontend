import React, { Component } from 'react';
import { 
    StyleSheet, 
    LayoutAnimation, 
    View, 
    Text 
} from 'react-native';
import { List } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <List.Item
                title={this.props.name}
                description={this.props.message}
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
                            }}>{this.props.name.split(' ').map(function(item){return item[0]}).join('').toUpperCase()}</Text>
                        </View>
                    )}
                />}
                right={props =>
                    <View style={{
                        justifyContent: 'center'
                    }}> 
                        <Text>{this.props.date}</Text>
                        <Text>{this.props.time}</Text>
                    </View>
                }
                onPress={()=> this.props.navigation.navigate('ChatScreen')}
                style={{backgroundColor: 'white', borderRadius:2}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight
    },
});

export default withNavigation(Conversation);