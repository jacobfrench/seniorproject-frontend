import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { store } from 'app/src/redux/store';
import { Card } from 'react-native-elements';
import api from 'app/src/api';

class BusinessBioScreen extends React.Component {
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
					<Card title='About Us'>
						<Text>
							{this.state.about}
						</Text>
					</Card>
					<Card title='Contact Information'>
						<Text>
							{this.state.street}{'\n'}
							{this.state.city} {this.state.state} {this.state.zip}{'\n'}
							{this.state.primaryPhone}
						</Text>
					</Card>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default BusinessBioScreen;