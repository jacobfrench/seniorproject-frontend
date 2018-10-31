import FAB from 'react-native-fab';
import React from 'react';
import { Modal, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { store } from 'app/src/redux/store';
import api from 'app/src/api';
import { Input, Card, Button, Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';


class MenuEditScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			menuItems: [],
			newItem: {
				title: '',
				description: '',
				imageUrl: ''
			},
			lastRefresh: Date(Date.now()).toString(),
			editMode: false


		}
	}

	onSavePress = () => {
		if (this.state.editMode) {
			console.log("CALL PUT METHOD HERE!!!")

		} else {
			let userId = store.getState().user.info.id;
			api.postNewMenu(this.state.newItem, userId);
			this.setState({ modalVisible: false });
			this.setState({ lastRefresh: Date(Date.now()).toString() })
		}

		this.setState({ editMode: false });
	}

	showModal(item) {
		this.setState({ modalVisible: true });
		this.setState({ newItem: { ...this.state.newItem, title: item.title } });
		this.setState({ newItem: { ...this.state.newItem, description: item.description } });
		this.setState({ newItem: { ...this.state.newItem, imageUrl: item.imageUrl } });
		this.setState({ editMode: true });


	}

	hideModal = () => {
		this.setState({ modalVisible: false });
	}

	componentWillMount() {
		let userId = store.getState().user.info.id;
		api.getMenusByUserId(userId)
			.then((data) => {
				this.setState({ menuItems: data });
			})

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
						this.hideModal();
					}}>

					<View style={styles.modalOuter}>
						<View style={styles.modalInner}>
							<View style={styles.formContainer}>
								<Input
									label={'Title'}
									containerStyle={styles.input}
									placeholder={'Title'}
									onChangeText={(title) => this.setState({ newItem: { ...this.state.newItem, title: title } })}
									value={this.state.newItem.title}
								/>

								<Input
									label={'Description'}
									containerStyle={styles.input}
									placeholder={'Description'}
									onChangeText={(desc) => this.setState({ newItem: { ...this.state.newItem, description: desc } })}
									value={this.state.newItem.description}
								/>

								<Input
									label={'Image Url'}
									containerStyle={styles.input}
									placeholder={'example: http://yourimage.jpg'}
									onChangeText={(imageUrl) => this.setState({ newItem: { ...this.state.newItem, imageUrl: imageUrl } })}
									value={this.state.newItem.imageUrl}
								/>
							</View>

							<Button
								title='Save'
								buttonStyle={styles.saveButton}
								onPress={this.onSavePress}
							/>
						</View>
					</View>

				</Modal>

				<ScrollView style={styles.scrollView}>
					{
						this.state.menuItems.map((item, i) => (
							<Card
								key={'_item' + i}
								title={item.title}
								image={{ uri: item.imageUrl }}>
								<Text>{item.description}</Text>
								<View style={styles.controlButtonContainer}>
									<Button
										title='View'
										buttonStyle={styles.button}
									/>
									<Button
										title='Edit'
										onPress={(item) => this.showModal(item)}
										buttonStyle={styles.button}
									/>
									<Button
										title='Add'
										buttonStyle={styles.button}
									/>
									<Button
										title='Delete'
										buttonStyle={styles.button}
									/>
								</View>

							</Card>
						))
					}

				</ScrollView>


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
		justifyContent: 'center'
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
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
		alignItems: 'center'
	},
	input: {
		marginBottom: 15
	},
	scrollView: {
		flex: 1,
		width: '100%'
	},
	formContainer: {
		alignItems: 'center'
	},
	saveButton: {
		backgroundColor: theme.primaryVariant,
		elevation: 0,
		padding: 5,
		marginLeft: 10,
		marginRight: 10
	},
	controlButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		padding: 5,
		margin: 5
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default MenuEditScreen;