import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const CardButton = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.button}>
			<Ionicons
				name={props.icon}
				size={30}
				color={'black'}
			/>
			<Text style={{marginTop: 6}}>{props.label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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

export { CardButton };