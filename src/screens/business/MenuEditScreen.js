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
			addMenuModalVisible: false,
			addItemModalVisible: false,
			menus: [],
			newMenu: {
				id: '',
				title: '',
				description: '',
				imageUrl: ''
			},
			newItem: {
				title:'',
				description: '',
				imageUrl: '',
				price:''
			},
			lastRefresh: Date(Date.now()).toString(),
			editMode: false


		}
	}

	onSavePress = () => {
		if (this.state.editMode) {
			console.log("CALL PUT METHOD HERE!!!");
			console.log(this.state.newMenu)

		} else {
			let userId = store.getState().user.info.id;
			api.postNewMenu(this.state.newMenu, userId)
				.then(res => {
					this.state.menus.push(res);
					this.setState({ menus: this.state.menus });

				});
		}

		this.setState({ editMode: false });
		this.setState({ addMenuModalVisible: false });
		this.setState({ lastRefresh: Date(Date.now()).toString() })
		this.setState({newMenu: {}})

	}

	onEditPress(item) {
		this.setState({ newMenu: item })
		this.setState({ editMode: true });
		this.setState({ addMenuModalVisible: true });
	}

	hideAllModals(){
		this.setState({ newMenu: {} });
		this.setState({ newItem: {} });
		this.setState({ addMenuModalVisible: false });
		this.setState({itemMenuModalVisible: false});
		this.setState({ editMode: false });
	}

	componentWillMount() {
		let userId = store.getState().user.info.id;
		api.getMenusByUserId(userId)
			.then((data) => {
				if (Array.isArray(data))
					this.setState({ menus: data });
			})

	}

	render() {
		var isMenusEmpty = this.state.menus.length < 1;
		return (
			<SafeAreaView style={styles.container}>
				<Modal
					animationType="fade"
					style={styles.modal}
					transparent={false}
					visible={this.state.addMenuModalVisible}
					onRequestClose={this.hideAllModals.bind(this)}>

					<View style={styles.modalOuter}>
						<View style={styles.modalInner}>
							<View style={styles.formContainer}>
								<Input
									label={'Title'}
									containerStyle={styles.input}
									placeholder={'Title'}
									onChangeText={(title) => this.setState({ newMenu: { ...this.state.newMenu, title: title } })}
									value={this.state.newMenu.title}
								/>

								<Input
									label={'Description'}
									containerStyle={styles.input}
									placeholder={'Description'}
									onChangeText={(desc) => this.setState({ newMenu: { ...this.state.newMenu, description: desc } })}
									value={this.state.newMenu.description}
								/>

								<Input
									label={'Image Url'}
									containerStyle={styles.input}
									placeholder={'example: http://yourimage.jpg'}
									onChangeText={(imageUrl) => this.setState({ newMenu: { ...this.state.newMenu, imageUrl: imageUrl } })}
									value={this.state.newMenu.imageUrl}
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

				<Modal
					animationType="fade"
					style={styles.modal}
					transparent={false}
					visible={this.state.addItemModalVisible}
					onRequestClose={this.hideAllModals.bind(this)}>


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

								<Input
									label={'Price'}
									containerStyle={styles.input}
									placeholder={'$0.00'}
									onChangeText={(price) => this.setState({ newItem: { ...this.state.newItem, price: price } })}
									value={this.state.newItem.price}
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




				{!isMenusEmpty ? (
					<ScrollView style={styles.scrollView}>
						{
							this.state.menus.map((item, i) => (
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
											onPress={this.onEditPress.bind(this, item)}
											buttonStyle={styles.button}
										/>
										<Button
											title='Add'
											buttonStyle={styles.button}
											onPress={() => this.setState({addItemModalVisible: true})}
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
				) : (
						<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
							<Text>You Don't Have Any Menus!</Text>
						</View>

					)
				}


				<FAB
					buttonColor={theme.primary}
					iconTextColor={theme.surface}
					onClickAction={() => this.setState({ addMenuModalVisible: true })}
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
		backgroundColor: theme.primary,
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