import React from 'react';
import { StyleSheet, View, ScrollView, 
				 SafeAreaView, KeyboardAvoidingView, TouchableOpacity, 
				 Text, Platform, ToastAndroid, ActivityIndicator
				} from 'react-native';
import { store } from 'app/src/redux/store';
import { FormInput, FormLabel } from 'react-native-elements';
import {StatePicker} from 'app/src/components/common';
import { TextInput } from 'react-native-paper';
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
			owner:{"id":store.getState().user.info.id}
		}
	}

	componentWillMount(){
		let userId = store.getState().user.info.id;
		api.getBusinessByUserId(userId)
			.then(res => {
				console.log('from business edit')
				console.log(res)
				if(res.id !== '')
					this.setState(res);
				
      });
	}

	onPublishPress = () => {
		let email = store.getState().user.info.username;
		console.log('publish press')
		console.log(this.state)
    if(this.state.id === ''){
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
				if(Platform.OS != 'ios'){
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

							{/* <FormLabel>Company Name</FormLabel>
							<FormInput
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Company Name'}
								onChangeText={(name) => this.setState({ name: name })}
								style={styles.inputStyle}
								value={this.state.name}
							/> */}
							<TextInput
        				label='Name'
        				value={this.state.name}
								onChangeText={(name) => this.setState({ name: name })}
								style={styles.input}
								mode={'flat'}
								placeholder={'Name'}
								/>

							<FormLabel>Email</FormLabel>
							<FormInput
								label={'Email'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Email'}
								onChangeText={(email) => this.setState({ email: email })}
								value={this.state.email}
							/>
							<FormLabel>Primary Phone</FormLabel>
							<FormInput
								label={'Primary Phone'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Primary Phone'}
								onChangeText={(primaryPhone) => this.setState({ primaryPhone: primaryPhone })}
								value={this.state.primaryPhone}
								keyboardType='phone-pad'
								maxLength={10}
							/>
							<FormLabel>Alt. Phone</FormLabel>
							<FormInput
								label={'Alt. Phone'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Alt. Phone'}
								onChangeText={(altPhone) => this.setState({ altPhone: altPhone })}
								value={this.state.altPhone}
								keyboardType='phone-pad'
								maxLength={10}	
							/>
							<FormLabel>Street</FormLabel>
							<FormInput
								label={'Street'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Street'}
								onChangeText={(street) => this.setState({ street: street })}
								value={this.state.street}																		
							/>
							<FormLabel>City</FormLabel>
							<FormInput
								label={'City'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'City'}
								onChangeText={(city) => this.setState({ city: city })}
								value={this.state.city}								
							/>

							<FormLabel>State</FormLabel>
							<View style={styles.pickerView}>
								<StatePicker 
									style={styles.picker}
									selectedValue={this.state.state}
									underlineColorAndroid={'transparent'}
									onValueChange={(value) => this.setState({state: value})}
									prompt={'Select State'}
									mode='dialog'
								/>
							</View>

							<FormLabel>Zip Code</FormLabel>
							<FormInput
								label={'Zip Code'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Zip Code'}
								onChangeText={(zip) => this.setState({ zip: zip })}
								value={this.state.zip}
								maxLength={5}	
								keyboardType='numeric'
							/>

							<FormLabel>About Us</FormLabel>
							<FormInput
								label={'About'}
								containerStyle={styles.input}
								underlineColorAndroid={'transparent'}
								placeholder={'Tell us about your company.'}
								onChangeText={(about) => this.setState({ about: about })}
								value={this.state.about}
								multiline
								maxLength={255}
								numberOfLines={5}
							/>

						</View>

						<TouchableOpacity style={styles.saveButton} onPress={this.onPublishPress}>
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
	},
	input: {
		padding: 5,
		elevation: 2,
		backgroundColor: theme.background,
		elevation: 5,
		borderRadius: 5,
		width: '100%'
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
	picker:{
		marginBottom: 10,
		width: '100%',
		padding: 5,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
	},
	pickerView:{
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
