import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { store } from 'app/src/redux/store';
import { Button } from 'app/src/components/common/Button';
import { Input } from 'react-native-elements'
import api from 'app/src/api';

class BusinessEditScreen extends React.Component {
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
			email: '',
		}
	}

	onSavePress = () => {
		api.postNewBusiness(this.state);
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={styles.textInputContainer} behavior={'padding'} enabled>
					<ScrollView style={styles.scrollview}>
						<View style={styles.textInputContainer}>

							<Input
								label={'Name'}
								containerStyle={styles.input}
								placeholder={'Name'}
								onChangeText={(name) => this.setState({ name: name })}
							/>

							<Input
								label={'Email'}
								containerStyle={styles.input}
								placeholder={'Email'}
								onChangeText={(email) => this.setState({ email: email })}
							/>

							<Input
								label={'Primary Phone'}
								containerStyle={styles.input}
								placeholder={'Primary Phone'}
								onChangeText={(primaryPhone) => this.setState({ primaryPhone: primaryPhone })}
							/>

							<Input
								label={'Alt. Phone'}
								containerStyle={styles.input}
								placeholder={'Alt. Phone'}
								onChangeText={(altPhone) => this.setState({ altPhone: altPhone })}
							/>

							<Input
								label={'Street'}
								containerStyle={styles.input}
								placeholder={'Street'}
								onChangeText={(street) => this.setState({ street: street })}
							/>

							<Input
								label={'City'}
								containerStyle={styles.input}
								placeholder={'City'}
								onChangeText={(city) => this.setState({ city: city })}
							/>

							<Input
								label={'State'}
								containerStyle={styles.input}
								placeholder={'State'}
								onChangeText={(_state) => this.setState({ state: _state })}
							/>

							<Input
								label={'Zip Code'}
								containerStyle={styles.input}
								placeholder={'Zip Code'}
								onChangeText={(zip) => this.setState({ zip: zip })}
							/>

							<Button
								text='Save'
								onPress={this.onSavePress}
								style={styles.saveButton}
							/>
						</View>

					</ScrollView>
				</KeyboardAvoidingView>


			</SafeAreaView>
		);
	}
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollview: {
		backgroundColor: theme.onPrimary,
		flex: 1
	},
	input: {
		paddingBottom: 10,
	},
	textInputContainer: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		width: '100%',
		margin: 10,
		padding: 5
	},
	saveButton: {
		backgroundColor: theme.primaryVariant,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	footer: {
		flexDirection: 'row',
		flex: 0.1
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default BusinessEditScreen;
