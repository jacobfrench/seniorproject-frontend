import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { store } from 'app/src/redux/store';
import { Input } from 'react-native-elements';
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
			email: ''
		}
	}

	componentWillMount(){
		let userId = store.getState().user.info.id;
		api.getBusinessByUserId(userId)
			.then(res => this.setState(res));
		
	}

	onSavePress = () => {
		let email = store.getState().user.info.username;
		api.postNewBusiness(this.state, email)
		.then(response => {
			console.log(response)
		})
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView>
					<ScrollView style={styles.scrollView}>
						<View style={styles.inputContainer}>

							<Input
								label={'Name'}
								containerStyle={styles.input}
								placeholder={'Name'}
								onChangeText={(name) => this.setState({ name: name })}
								style={styles.inputStyle}
								value={this.state.name}
							/>

							<Input
								label={'Email'}
								containerStyle={styles.input}
								placeholder={'Email'}
								onChangeText={(email) => this.setState({ email: email })}
								value={this.state.email}
							/>

							<Input
								label={'Primary Phone'}
								containerStyle={styles.input}
								placeholder={'Primary Phone'}
								onChangeText={(primaryPhone) => this.setState({ primaryPhone: primaryPhone })}
								value={this.state.primaryPhone}
							/>

							<Input
								label={'Alt. Phone'}
								containerStyle={styles.input}
								placeholder={'Alt. Phone'}
								onChangeText={(altPhone) => this.setState({ altPhone: altPhone })}
								value={this.state.altPhone}								
							/>

							<Input
								label={'Street'}
								containerStyle={styles.input}
								placeholder={'Street'}
								onChangeText={(street) => this.setState({ street: street })}
								value={this.state.street}																		
							/>

							<Input
								label={'City'}
								containerStyle={styles.input}
								placeholder={'City'}
								onChangeText={(city) => this.setState({ city: city })}
								value={this.state.city}								
							/>

							<Input
								label={'State'}
								containerStyle={styles.input}
								placeholder={'State'}
								onChangeText={(state) => this.setState({ state: state })}
								value={this.state.state}
							/>

							<Input
								label={'Zip Code'}
								containerStyle={styles.input}
								placeholder={'Zip Code'}
								onChangeText={(zip) => this.setState({ zip: zip })}
								value={this.state.zip}								
							/>

						</View>

						<TouchableOpacity style={styles.saveButton} onPress={this.onSavePress}>
							<Text style={styles.buttonText}>Publish</Text>
						</TouchableOpacity>

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
		margin: 10,
		padding: 10
	},
	inputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 1
	},
	input: {
		marginBottom: 10
	},
	saveButton: {
		backgroundColor: theme.primary,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		padding: 5,
		borderRadius: 2
	},
	buttonText: {
		color: 'white',
		padding: 10,
		fontSize: 22
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default BusinessEditScreen;
