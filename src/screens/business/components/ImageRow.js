import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

export default class ImageRow extends React.Component {
  constructor(props) {
    super(props)
  }
  
  displayImage() {
    if (this.props.imageSource) {
      return (
        <View style={[styles.imageContainer, this.props.style]}>
          <Image
            source={this.props.imageSource}
            style={styles.image}
          />
        </View>
      );
    } else {
      return (<View style={styles.imageContainer}></View>);
    }
  }

  render() {
    return (
      <View style={styles.row}>
        {this.displayImage()}
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
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 15,
    resizeMode: 'cover',
    width: 15
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: 7.5,
    justifyContent: 'center',
    marginRight: 5,
    width: 15,
    height: 15
  }
});