import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import { store } from 'app/src/redux/store';



export default class MenuItemEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {}

    }


  }

  componentWillMount() {
    this.setState({ menu: this.props.navigation.state.params });

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
        <ImageBackground
          source={{ uri: this.state.menu.imageUrl }}
          style={styles.header}
        >
          <View style={styles.headerContainer}>
            <View>
              <Text h3 style={styles.headerText}>{this.state.name}</Text>
              <Text h4 style={styles.headerText}>{this.state.menu.title}</Text>
            </View>
          </View>
        </ImageBackground>

        <ScrollView style={styles.ScrollView}>

        </ScrollView>

        </View>

      </SafeAreaView>
    );
  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  innerContainer:{
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  ScrollView:{
    flex: 5,
    width: '100%'
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  headerText: {
    color: 'white',
    textShadowOffset: {
      width: 0.5,
      height: 1
    },
    textShadowColor: '#000000',
    textShadowRadius: 5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },

});