import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { store } from 'app/src/redux/store';
import { connect } from 'react-redux';
import { changeTheme } from "app/src/redux/actions";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

  }


  changeTheme = () => {
    this.props.changeTheme();
  }

  render() {
    return ( 
    <View style = {styles.container}>  
      <ScrollView style={styles.body}>
        <Text>This is the settings screen.</Text>
        <TouchableOpacity
          onPress={this.changeTheme}
        > 
          <Text>Change Theme</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
    );
  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: theme.text,
    width: '100%',
  },
  name:{
    fontSize: 18,
    color: theme.text,
    paddingTop: 10
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    email: state.user.info.username
  };
};

export default connect(mapStateToProps, {
  changeTheme  
})(SettingsScreen);