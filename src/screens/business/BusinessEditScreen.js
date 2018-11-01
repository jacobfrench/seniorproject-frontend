import React from 'react';
import { Platform, StyleSheet, View, ScrollView, SafeAreaView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { store } from 'app/src/redux/store';
import { Button } from 'app/src/components/common/Button';
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
		.then((data) => {
			this.setState(data);
		});
	}

	onSavePress = () => {
		let email = store.getState().user.info.username;
		api.postNewBusiness(this.state, email);
	}

	render() {
		// const { userInfo } = this.props;
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

						<Button
							text='Save'
							onPress={this.onSavePress}
							style={styles.saveButton}
						/>

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
		backgroundColor: theme.onPrimary,
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
		backgroundColor: theme.primaryVariant,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		padding: 5
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default BusinessEditScreen;
