import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CardButton } from 'app/src/components/business';

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
        screen: 'PreviewBusiness'
      },
      {
        title: 'Add Employee',
        icon: 'person',
        screen: ''
      },
    ]

    return (
      <SafeAreaView style={styles.container}>
      {
        list.map((item, i) => (
          <CardButton
            key={item.title + i}
            label={item.title}
            icon={item.icon}
            onPress={() => this.props.navigation.navigate(item.screen)}
          />
        ))
      }
      {/*
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('EditBusiness')}
        >
          <Ionicons
              name="md-information-circle"
              size={30}
              color={'black'}
          />
          <Text style={{marginTop: 6}}>Edit Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('EditMenus')}
        >
          <Ionicons
            name="md-list-box"
            size={30}
            color={'black'}
          />
          <Text style={{marginTop: 6}}>Edit Menus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('PreviewBusiness')}
        >
          <Ionicons
            name="md-phone-portrait"
            size={30}
            color={'black'}
          />
          <Text style={{marginTop: 6}}>Preview Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="md-person-add"
            size={30}
            color={'black'}
          />
          <Text style={{marginTop: 6}}>Add Employee</Text>
        </TouchableOpacity>
      */}
      </SafeAreaView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    marginTop: 6,
    height: '35%',
    flexBasis: '49%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});