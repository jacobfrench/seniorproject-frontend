import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

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
				<ScrollView>
					<Text>Menu Screen</Text>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default BusinessMenuScreen;