import React from 'react';
import { Picker } from 'react-native';
import { Surface } from 'react-native-paper';

const StatePicker = (props) => {
	return (
		<Picker {...props} >
			<Picker.Item label="Select State" value="" />
			<Picker.Item label="AL" value="AL" />
			<Picker.Item label="AK" value="AK" />
			<Picker.Item label="AZ" value="AZ" />
			<Picker.Item label="AR" value="AR" />
			<Picker.Item label="CA" value="CA" />
			<Picker.Item label="CO" value="CO" />
			<Picker.Item label="CT" value="CT" />
			<Picker.Item label="DE" value="DE" />
			<Picker.Item label="FL" value="FL" />
			<Picker.Item label="GA" value="GA" />
			<Picker.Item label="HI" value="HI" />
			<Picker.Item label="ID" value="ID" />
			<Picker.Item label="IL" value="IL" />
			<Picker.Item label="IN" value="IN" />
			<Picker.Item label="IA" value="IA" />
			<Picker.Item label="KS" value="KS" />
			<Picker.Item label="KY" value="KY" />
			<Picker.Item label="LA" value="LA" />
			<Picker.Item label="ME" value="ME" />
		</Picker>
	);
};

const IndustryPicker = (props) => {
	return (
		<Surface style={{ height: 50, width: '90%', elevation: 5, borderRadius: 5, margin: 10 }}>
			<Picker {...props}>
				{/* All picker values must be lower case */}
				<Picker.Item label="Select Industry..." value="" />
				<Picker.Item label="Cannabis" value="cannabis" />
				<Picker.Item label="I.T." value="computer" />
				<Picker.Item label="Pest Control" value="pestcontrol" />
			</Picker>
		</Surface>
	);
}


export { StatePicker, IndustryPicker };