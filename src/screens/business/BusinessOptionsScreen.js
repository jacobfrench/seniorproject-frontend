import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { store } from 'app/src/redux/store';

export default class BusinessOptionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const list = [
      {
        title: 'Edit Information',
        icon: 'info',
        screen: 'EditBusiness'
      },
      {
        title: 'Edit Menus',
        icon: 'assignment',
        screen: 'EditMenus'
      },
      {
        title: 'Preview Page',
        icon: 'pageview',
        screen: 'PreViewBusiness'
      },
      {
        title: 'Add Employee',
        icon: 'person',
        screen: ''
      },
    ]

    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <List>
          {
            list.map((item) => (
              <ListItem
              key={item.title}
              title={item.title}
              leftIcon={{name: item.icon}}
              onPress={() => this.props.navigation.navigate(item.screen)}
              />
            ))
          }
          </List>
          </ScrollView>

      </SafeAreaView>
    );

  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    width: '100%'
  }

});