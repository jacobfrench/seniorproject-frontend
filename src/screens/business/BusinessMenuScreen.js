import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Surface } from 'react-native-paper';

class BusinessMenuScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			about: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			primaryPhone: '',
			altPhone: '',
			email: ''
		}
	}
	render() {
		return (
			<SafeAreaView>
				<Surface>
					<Text>Menu Screen</Text>
				</Surface>
			</SafeAreaView>
		);
	}
}

export default BusinessMenuScreen;