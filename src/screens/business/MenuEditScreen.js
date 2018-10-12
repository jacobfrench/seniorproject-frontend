import FAB from 'react-native-fab';
import React from 'react';
import { Modal, StyleSheet, View, ScrollView, SafeAreaView, Text, Alert } from 'react-native';
import { store } from 'app/src/redux/store';
import { Button } from 'app/src/components/common/Button';
import { Input } from 'react-native-elements'



class MenuEditScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false
		}
	}



	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Modal
					animationType="fade"
					style={styles.modal}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false })
					}}>

					<View style={styles.modalOuter}>
						<View style={styles.modalInner}>

							<Text>Hello World!</Text>

						</View>
					</View>

				</Modal>

				<FAB
					buttonColor={theme.secondary}
					iconTextColor={theme.onSecondary}
					onClickAction={() => this.setState({ modalVisible: true })}
					visible={true}
				/>


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
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 150
	},
	modalInner: {
		justifyContent: 'center',
		backgroundColor: 'white',
		height: '95%',
		width: '95%',
		borderRadius: 5
	},
	modalOuter: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	}

});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default MenuEditScreen;
