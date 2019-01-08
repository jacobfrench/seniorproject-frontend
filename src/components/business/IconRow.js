import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class IconRow extends React.Component {
  constructor(props) {
    super(props)
  }
  
  displayIcon() {
    if (this.props.icon) {
      return (
        <View style={[styles.iconContainer, this.props.style]}>
          <Ionicons name={this.props.icon} color={'black'} size={20} style={styles.icon} />
        </View>
      );
    } else {
      return (<View style={styles.iconContainer}></View>);
    }
  }

  render() {
    return (
      <View style={[styles.row, this.props.style]}>
        {this.displayIcon()}
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    alignSelf: 'center'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 15,
    width: 15
  }
});