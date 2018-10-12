import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { store } from 'app/src/redux/store';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return ( 
    <View style = {styles.container}>
      <ScrollView style={styles.body}>
        <Text>Content goes here.</Text>
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
  header: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
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

export default connect(mapStateToProps)(HomeScreen);