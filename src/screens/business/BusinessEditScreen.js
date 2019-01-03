import React from 'react';
import {
	StyleSheet, View, ScrollView,
	SafeAreaView, KeyboardAvoidingView, TouchableOpacity,
	Text, Platform, ToastAndroid, ActivityIndicator
} from 'react-native';
import { store } from 'app/src/redux/store';
import { FormInput, FormLabel } from 'react-native-elements';
import { TextInput, Button } from 'react-native-paper';
import api from 'app/src/api';

class BusinessEditScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			about: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			primaryPhone: '',
			altPhone: '',
			email: '',
			owner: { "id": store.getState().user.info.id }
		}
	}

	componentWillMount() {
		let userId = store.getState().user.info.id;
		api.getBusinessByUserId(userId)
			.then(res => {
				console.log('from business edit')
				console.log(res)
				if (res.id !== '')
					this.setState(res);

			});
	}

	onPublishPress = () => {
		let email = store.getState().user.info.username;
		console.log('publish press')
		console.log(this.state)
		if (this.state.id === '') {
			// post new business if business doesn't exist
			api.postNewBusiness(this.state, email)
				.then(response => {
					this.setState(response);
					console.log('response:')
					console.log(response)
					ToastAndroid.show('Published.', ToastAndroid.SHORT);
				})
		} else {
			// update business if business exists.
			api.updateBusiness(this.state)
				.then(response => {
					console.log('update press')
					console.log(response);
					if (Platform.OS != 'ios') {
						this.setState(response)
						ToastAndroid.show('Published.', ToastAndroid.SHORT);
					}
				})
		}

	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<View style={styles.inputContainer}>
							<TextInput
								label='Name'
								value={this.state.name}
								onChangeText={(name) => this.setState({ name: name })}
								style={styles.input}
								mode={'flat'}
								placeholder={'Name'}
							/>

							<TextInput
								label='Email'
								value={this.state.email}
								onChangeText={(email) => this.setState({ email: email })}
								style={styles.input}
								mode={'flat'}
								placeholder={'Email'}
							/>

							<TextInput
								label='Primary Phone'
								value={this.state.primaryPhone}
								onChangeText={(phone) => this.setState({ primaryPhone: phone })}
								style={styles.input}
								mode={'flat'}
								keyboardType={'phone-pad'}
								maxLength={10}
								placeholder={'Primary Phone'}
							/>

							<TextInput
								label='Alt. Phone'
								value={this.state.altPhone}
								onChangeText={(altPhone) => this.setState({ altPhone: altPhone })}
								style={styles.input}
								mode={'flat'}
								keyboardType={'phone-pad'}
								maxLength={10}
								placeholder={'Alt. Phone'}
							/>

							<TextInput
								label='Street'
								value={this.state.street}
								onChangeText={(street) => this.setState({ street: street })}
								style={styles.input}
								mode={'flat'}
								placeholder={'Street'}
							/>

							<TextInput
								label='City'
								value={this.state.city}
								onChangeText={(city) => this.setState({ city: city })}
								style={styles.input}
								mode={'flat'}
								placeholder={'City'}
							/>

							<TextInput
								label='State'
								value={this.state.state}
								onChangeText={(state) => this.setState({ state: state })}
								style={styles.input}
								mode={'flat'}
								placeholder={'State'}
							/>

							<TextInput
								label='Zip Code'
								value={this.state.zip}
								onChangeText={(zip) => this.setState({ zip: zip })}
								style={styles.input}
								mode={'flat'}
								keyboardType={'numeric'}
								placeholder={'Zip Code'}
							/>

							<TextInput
								label='About Us'
								value={this.state.about}
								onChangeText={(about) => this.setState({ about: about })}
								style={styles.input}
								mode={'flat'}
								multiline={true}
								placeholder={'About Us'}
							/>

						</View>

						<Button 
							style={styles.saveButton}
							mode="contained" 
							onPress={this.onPublishPress}>
							Publish
  					</Button>

					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollView: {
		backgroundColor: theme.background,
		margin: 5,
		padding: 10,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
		padding: 5,
		width: '100%'
	},
	input: {
		elevation: 2,
		backgroundColor: theme.background,
		elevation: 5,
		borderRadius: 5,
		width: '100%',
		margin: 5
	},
	saveButton: {
		backgroundColor: theme.primary,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		padding: 5,
		borderRadius: 2,
		width: '95%'
	},
	buttonText: {
		color: 'white',
		padding: 10,
		fontSize: 22
	},
	picker: {
		marginBottom: 10,
		width: '100%',
		padding: 5,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
	},
	pickerView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '95%',
		height: 50,
		elevation: 5,
		paddingTop: 5,
		backgroundColor: 'white',
		borderRadius: 5,
		margin: 10

	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default BusinessEditScreen;
