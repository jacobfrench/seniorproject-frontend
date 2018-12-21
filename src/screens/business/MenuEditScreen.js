// import FAB from 'react-native-fab';
import React from 'react';
import { Modal, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { store } from 'app/src/redux/store';
import api from 'app/src/api';
import { FormInput, Card, Button, Text, List, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';


class MenuEditScreen extends React.Component {
	constructor(props) {
		super(props);
		console.disableYellowBox = true
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
				title: '',
				description: '',
				imageUrl: '',
				price: ''
			},
			editMode: false
		}
	}

	onAddMenuSavePress = () => {
		if (this.state.editMode) {
			api.updateMenu(this.state.newMenu)
				.then(res => {
					for (let i = 0; i < this.state.menus.length; i++) {
						if (this.state.menus[i].id === res.id) {
							this.state.menus[i] = res;
							this.setState({ menus: this.state.menus });
							break;
						}
					}
				})
		} else {
			let userId = store.getState().user.info.id;
			api.postNewMenu(this.state.newMenu, userId)
				.then(res => {
					this.state.menus.push(res);
					this.setState({ menus: this.state.menus });

				});
		}
		this.hideAllModalsAndClearData();

	}

	onAddItemSave() {
		this.hideAllModalsAndClearData();
	}

	onEditPress(item) {
		this.setState({ editMode: true });
		this.setState({ newMenu: item })
		this.setState({ addMenuModalVisible: true });
	}

	onDeletePress() {
		api.deleteMenu(this.state.newMenu.id).then((res) => {console.log(res)})

	}

	hideAllModalsAndClearData() {
		this.setState({ newMenu: {} })
		this.setState({ newItem: {} });
		this.setState({ addMenuModalVisible: false });
		this.setState({ addItemModalVisible: false });
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
		let isMenusEmpty = this.state.menus.length < 1;
		return (
			<SafeAreaView style={styles.container}>
				<Modal
					animationType="fade"
					style={styles.modal}
					transparent={false}
					visible={this.state.addMenuModalVisible}
					onRequestClose={this.hideAllModalsAndClearData.bind(this)}
				>

					<View style={styles.modalOuter}>
						<View style={styles.modalInner}>
							<View style={styles.formContainer}>
								<Text>Edit Menu</Text>
								<FormInput
									label={'Title'}
									containerStyle={styles.input}
									placeholder={'Title'}
									onChangeText={(title) => this.setState({ newMenu: { ...this.state.newMenu, title: title } })}
									value={this.state.newMenu.title}
								/>

								<FormInput
									label={'Description'}
									containerStyle={styles.input}
									placeholder={'Description'}
									onChangeText={(desc) => this.setState({ newMenu: { ...this.state.newMenu, description: desc } })}
									value={this.state.newMenu.description}
								/>

								<FormInput
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
								onPress={this.onAddMenuSavePress}
							/>

							<Button
								title='Delete'
								buttonStyle={styles.saveButton}
								onPress={this.onDeletePress.bind(this)}
							/>
						</View>
					</View>

				</Modal>

				<Modal
					animationType="fade"
					style={styles.modal}
					transparent={false}
					visible={this.state.addItemModalVisible}
					onRequestClose={this.hideAllModalsAndClearData.bind(this)}
				>

					<View style={styles.modalOuter}>
						<View style={styles.modalInner}>
							<View style={styles.formContainer}>
								<FormInput
									label={'Title'}
									containerStyle={styles.input}
									placeholder={'Title'}
									onChangeText={(title) => this.setState({ newItem: { ...this.state.newItem, title: title } })}
									value={this.state.newItem.title}
								/>

								<FormInput
									label={'Description'}
									containerStyle={styles.input}
									placeholder={'Description'}
									onChangeText={(desc) => this.setState({ newItem: { ...this.state.newItem, description: desc } })}
									value={this.state.newItem.description}
								/>

								<FormInput
									label={'Image Url'}
									containerStyle={styles.input}
									placeholder={'example: http://yourimage.jpg'}
									onChangeText={(imageUrl) => this.setState({ newItem: { ...this.state.newItem, imageUrl: imageUrl } })}
									value={this.state.newItem.imageUrl}
								/>

								<FormInput
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
								onPress={this.onAddItemSave.bind(this)}
							/>


						</View>
					</View>

				</Modal>

				{/* if this.state.menus is empty */}
				{!isMenusEmpty ? (
					<ScrollView style={styles.scrollView}>
						<List containerStyle={{ marginBottom: 20 }}>
							{

								this.state.menus.map((menu, i) => (
									<ListItem
										roundAvatar
										avatar={{ uri: menu.imageUrl }}
										key={menu.title + i}
										title={menu.title}
										subtitle={menu.description}
										onLongPress={this.onEditPress.bind(this, menu)}
										onPress={() => this.props.navigation.navigate('EditMenuItems', menu)}
									>
									</ListItem>
								))

							}
						</List>

					</ScrollView>
				) : (
						<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
							<Text>You Don't Have Any Menus!</Text>
						</View>

					)
				}

				<FAB
					style={styles.fab}
					large
					color={'white'}
					icon='add'
					onPress={() => this.setState({ addMenuModalVisible: true })}
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
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: theme.primary,
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
		marginBottom: 15,
		elevation: 5
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