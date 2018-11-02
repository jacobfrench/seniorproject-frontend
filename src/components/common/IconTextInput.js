import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';
import { store } from 'app/src/redux/store';

export default class IconTextInput extends React.Component {
	render() {
		return (
			<View style={[styles.textInput, this.props.style]}>
				<View style={styles.iconContainer}>
					<Image
						source={this.props.src}
						style={styles.inputIcon}
						resizeMode="contain"
					/>
				</View>
				<TextInput
					{...this.props}
					underlineColorAndroid='transparent'
					style={[styles.input, styles.inputFont]}
					placeholderTextColor={theme.background}
					selectionColor={theme.background}
				/>
			</View>
		);
	}

}

IconTextInput.propTypes = {
	onChangeText: PropTypes.func.isRequired,
};

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
	inputFont: {
		color: 'white',
	},
	input: {
		fontSize: 18,
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderColor: 'white',
		width: '70%'
	},
	iconContainer: {
		paddingHorizontal: 15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	textInput: {
		flexDirection: 'row',
		borderWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'white',
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 100,
		height: 45,
	},
	inputIcon: {
		width: 25,
		height: 25,
	}
});
