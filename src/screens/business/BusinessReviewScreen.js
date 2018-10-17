import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { store } from 'app/src/redux/store';
import { Card } from 'react-native-elements';
import api from 'app/src/api';

class BusinessReviewScreen extends React.Component {
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
					<Text>Reviews</Text>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default BusinessReviewScreen;