import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import { Title, Divider, Paragraph} from 'react-native-paper';


const MenuRow = (props) => {
  return (
    <TouchableOpacity 
        style={[styles.listItemContainer, props.style]}
        onLongPress={props.onLongPress}
        onPress={props.onPress}
    >
    <View style={styles.listItemImageContainer}>
      <Image
        style={{ flex: 1, borderRadius: 5 }}
        source={{ uri: props.imageUrl }}
      />
    </View>
    <View style={styles.listItemDescriptionContainer}>
      <Title>{props.title}</Title>
      <Divider />
      <Paragraph>{props.description}</Paragraph>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	listItemContainer: {
		width: '100%',
		height: 100,
		borderRadius: 2,
		flexDirection: 'row',
		margin: 5,
		elevation: 5,
		backgroundColor: '#FAFAFA'
	},
	listItemImageContainer: {
		backgroundColor: 'blue',
		borderRadius: 5,
		flex: 1
	},
	listItemDescriptionContainer: {
		backgroundColor: '#FAFAFA',
		borderRadius: 5,
		padding: 5,
		flex: 3.5
	}
});

export default MenuRow;