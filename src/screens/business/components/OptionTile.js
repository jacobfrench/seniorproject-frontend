import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const OptionTile = (props) => {
  console.log(props)
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.button}>
			<Ionicons
				name={props.name}
				size={30}
				color={'#6200ee'}
			/>
			<Title style={{marginTop: 15, color: '#6200ee'}}>{props.label}</Title>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		elevation: 2,
		borderRadius: 2,
		marginTop: 6,
		height: '25%',
		flexBasis: '49%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default OptionTile;