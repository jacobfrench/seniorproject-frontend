import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { OptionTile } from '../components'

export default class BusinessOptionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <OptionTile
          name='md-information-circle'
          label='Edit Information'
          onPress={() => this.props.navigation.navigate('EditBusiness')}
        />

        <OptionTile
          name='md-list-box'
          label='Edit Menus'
          onPress={() => this.props.navigation.navigate('EditMenus')}
        />

        <OptionTile
          name='md-phone-portrait'
          label='Preview Page'
          onPress={() => this.props.navigation.navigate('PreviewBusiness', {businessId: null})}
        />

        <OptionTile
          name='md-person-add'
          label='Add Employee'
        />


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