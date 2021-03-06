import React from 'react';
import { Picker, Platform, Text, PickerIOS } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Surface } from 'react-native-paper';

const industryChoices = [
	{ label: "Cannabis", value: "cannabis" },
	{ label: "I.T.", value: "computer" },
	{ label: "Food", value: "food" },
	{ label: "Pest Control", value: "pest" },
	{ label: "Carpet Cleaners", value: "carpetcleaning" },
	{ label: "Plumber", value: "plumber" },
	{ label: "HVAC", value: "hvac" },
	{ label: "Landscaper", value: "landscaper" },
	{ label: "Pet Groomers", value: "animal" },
	{ label: "Real Estate", value: "realestate" },
	{ label: "Pool", value: "pool" }
]

const IndustryPicker = (props) => {

	const _renderPicker = () => {
		if (Platform.OS === 'android') {
			return _renderAndroid();
		} else if (Platform.OS === 'ios') {
			return _renderIOS();
		}
	}

	const _renderAndroid = () => {
		return (
			<Surface style={{ height: 50, width: '100%', elevation: 5, borderRadius: 2, margin: 10 }}>
				<Picker {...props}>
					{/* TODO: Use industryChoices variable with loop to render Picker.Items */}
					{/* All picker values must be lower case */}
					<Picker.Item label="Select Industry..." value="" />
					<Picker.Item label="Cannabis" value="cannabis" />
					<Picker.Item label="I.T." value="computer" />
					<Picker.Item label="Food" value="food" />
					<Picker.Item label="Pest Control" value="pest" />
					<Picker.Item label="Carpet Cleaners" value="carpetcleaning" />
					<Picker.Item label="Plumber" value="plumber" />
					<Picker.Item label="HVAC" value="hvac" />
					<Picker.Item label="Landscaper" value="landscaper" />
					<Picker.Item label="Pet Groomers" value="animal" />
					<Picker.Item label="Real Estate" value="realestate" />
					<Picker.Item label="Pool" value="pool" />
				</Picker>
			</Surface>
		)
	}

	const _renderIOS = () => {
		return (
			<Surface style={{ height: 50, width: '100%', elevation: 5, borderRadius: 2, margin: 10 }}>
				<RNPickerSelect
					style={{inputIOS: {
						height: '100%',
						paddingLeft: 10,
					}}}
					placeholder={{ label: 'Select Industry...', value:""}}
					onValueChange={props.onValueChange}
					items={industryChoices}
				/>
			</Surface>
		)
	}

	return (
		_renderPicker()
	);
};

const StatePicker = (props) => {
	return (
		<Surface style={{ height: 50, width: '100%', elevation: 5, borderRadius: 5, margin: 10 }}>
			<Picker {...props}>
				<Picker.Item label="Select State..." value="" />
				<Picker.Item label="Alabama" value="AL" />
				<Picker.Item label="Alaska" value="AK" />
				<Picker.Item label="Arizona" value="AZ" />
				<Picker.Item label="Arkansas" value="AR" />
				<Picker.Item label="California" value="CA" />
				<Picker.Item label="Colorado" value="CO" />
				<Picker.Item label="Connecticut" value="CT" />
				<Picker.Item label="Delaware" value="DE" />
				<Picker.Item label="Florida" value="FL" />
				<Picker.Item label="Georgia" value="GA" />
				<Picker.Item label="Hawaii" value="HI" />
				<Picker.Item label="Idaho" value="ID" />
				<Picker.Item label="Illnois" value="IL" />
				<Picker.Item label="Indiana" value="IN" />
				<Picker.Item label="Iowa" value="IA" />
				<Picker.Item label="Kansas" value="KS" />
				<Picker.Item label="Kentucky" value="KY" />
				<Picker.Item label="Louisiana" value="LA" />
				<Picker.Item label="Maine" value="ME" />
				<Picker.Item label="Maryland" value="MD" />
				<Picker.Item label="Massachusetts" value="Boston" />
				<Picker.Item label="Michigan" value="MI" />
				<Picker.Item label="Minnesota" value="MN" />
				<Picker.Item label="Mississippi" value="MS" />
				<Picker.Item label="Missouri" value="MO" />
				<Picker.Item label="Montana" value="MT" />
				<Picker.Item label="Nebraska" value="NE" />
				<Picker.Item label="Nevada" value="NV" />
				<Picker.Item label="New Hampshire" value="NH" />
				<Picker.Item label="New Jersey" value="NJ" />
				<Picker.Item label="New Mexico" value="NM" />
				<Picker.Item label="New York" value="NY" />
				<Picker.Item label="N. Carolina" value="NC" />
				<Picker.Item label="N. Dakota" value="ND" />
				<Picker.Item label="Ohio" value="OH" />
				<Picker.Item label="Oklahoma" value="OK" />
				<Picker.Item label="Oregon" value="OR" />
				<Picker.Item label="Pennsylvania" value="PA" />
				<Picker.Item label="Rhode Island" value="RI" />
				<Picker.Item label="S. Carolina" value="SC" />
				<Picker.Item label="S. Dakota" value="SD" />
				<Picker.Item label="Tennessee" value="TN" />
				<Picker.Item label="Texas" value="TX" />
				<Picker.Item label="Utah" value="UT" />
				<Picker.Item label="Vermont" value="VT" />
				<Picker.Item label="Virginia" value="VA" />
				<Picker.Item label="W. Virginia" value="WV" />
				<Picker.Item label="Wisconsin" value="WI" />
				<Picker.Item label="Wyoming" value="WY" />
			</Picker>
		</Surface>
	);
}


export { StatePicker, IndustryPicker };