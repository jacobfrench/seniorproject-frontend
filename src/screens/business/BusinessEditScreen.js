import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	TextInput
} from 'react-native';
import { store } from 'app/src/redux/store';
import { Button } from 'app/src/components/common/Button';
import api from "app/src/api";


class BusinessEditScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			phoneNum: '',
			email: '',
		}
	}

	onSavePress = () => {
		api.postNewBusiness(this.state);
	}

	render() {
		return (
			<View style={styles.container}>

				<ScrollView style={styles.body}>
					<View style={styles.textInputContainer}>
						<TextInput
							style={styles.textinput}
							placeholder={'Name'}
							underlineColorAndroid={'transparent'}
							onChangeText={(name) => this.setState({ name })}
						/>
						<TextInput
							style={styles.textinput}
							placeholder={'Address'}
							underlineColorAndroid={'transparent'}
							onChangeText={(text) => this.setState({ address: text })}
						/>
						<TextInput
							style={styles.textinput}
							keyboardType='numeric'
							placeholder={'Phone Number'}
							underlineColorAndroid={'transparent'}
							onChangeText={(text) => this.setState({ phoneNum: text })}
						/>
						<TextInput
							style={styles.textinput}
							placeholder={'Email'}
							keyboardType='email-address'
							underlineColorAndroid={'transparent'}
							onChangeText={(text) => this.setState({ email: text })}
						/>
					</View>
				</ScrollView>

				<View style={styles.footer}>
					<Button
						text='Save'
						onPress={this.onSavePress}
						style={styles.saveButton}
					/>
				</View>

			</View>
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
	body: {
		backgroundColor: theme.text,
		width: '100%',
		flex: 0.9
	},
	textinput: {
		width: '90%',
		margin: 10,
		padding: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 5
	},
	textInputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	saveButton: {
		backgroundColor: theme.primary_dark,
		margin: 5,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'

	},
	footer: {
		flex: 1,
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

