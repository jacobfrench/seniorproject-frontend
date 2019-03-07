// import FAB from 'react-native-fab';
import React from 'react';
import { Modal, StyleSheet, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { store } from 'app/src/redux/store';
import api from '../api';
import { FAB, TextInput, Button, Title, Headline, Paragraph, Divider } from 'react-native-paper';
import { MenuRow } from '../components';


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
			editMode: false,
			modalTitle: 'Add New Menu'
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

	onEditPress(item) {
		this.setState({ modalTitle: 'Edit Menu' })
		this.setState({ editMode: true });
		this.setState({ newMenu: item })
		this.setState({ addMenuModalVisible: true });
	}

	onDeletePress() {
		api.deleteMenu(this.state.newMenu.id).then((res) => { console.log(res) })
		this.hideAllModalsAndClearData();

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
								<Title style={{ marginBottom: 10 }}>{this.state.modalTitle}</Title>
								<TextInput
									label='Title'
									value={this.state.newMenu.title}
									onChangeText={(title) => this.setState({ newMenu: { ...this.state.newMenu, title: title } })}
									style={styles.input}
									mode={'flat'}
									placeholder={'Name'}
								/>

								<TextInput
									label='Description'
									value={this.state.newMenu.description}
									onChangeText={(desc) => this.setState({ newMenu: { ...this.state.newMenu, description: desc } })}
									style={styles.input}
									mode={'flat'}
									multiline={true}
									placeholder={'Description'}
								/>

								<TextInput
									label='Image Url'
									value={this.state.newMenu.imageUrl}
									onChangeText={(imageUrl) => this.setState({ newMenu: { ...this.state.newMenu, imageUrl: imageUrl } })}
									style={styles.input}
									mode={'flat'}
									placeholder={'http://yourimage.jpg'}
								/>
								<Button
									style={styles.saveButton}
									mode="contained"
									onPress={this.onAddMenuSavePress}>
									Save
  							</Button>

								<Button
									style={styles.saveButton}
									mode="contained"
									onPress={this.onDeletePress.bind(this)}>
									Delete
  						</Button>
							</View>
						</View>
					</View>

				</Modal>


				{/* if this.state.menus is empty */}
				{!isMenusEmpty ? (
					<ScrollView contentContainerStyle={styles.scrollView}>
						{
							this.state.menus.map((menu, i) => (
								<MenuRow
									key={menu.title + i}
									onLongPress={this.onEditPress.bind(this, menu)}
									onPress={() => this.props.navigation.navigate('EditMenuItems', menu)}
									imageUrl={menu.imageUrl}
									title={menu.title}
									description={menu.description}
								/>
							))

						}



					</ScrollView>
				) : (
						<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
							<Headline>You Don't Have Any Menus!</Headline>
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
		justifyContent: 'center',
		backgroundColor: theme.background
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
		elevation: 2,
		backgroundColor: theme.background,
		elevation: 5,
		borderRadius: 2,
		width: '95%',
		margin: 5
	},
	scrollView: {
		flex: 1,
		width: '100%',

	},
	formContainer: {
		alignItems: 'center'
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
