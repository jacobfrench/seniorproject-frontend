import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

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