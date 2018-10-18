import FAB from 'react-native-fab';
import React from 'react';
import { Modal, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { store } from 'app/src/redux/store';
import { Input, Card, Button, Text } from 'react-native-elements'

class MenuEditScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			menuItems: [{
				title: 'Combination Pizza',
				desc: 'Cheese, pepperoni, olives...',
				price: '15.00'
			}],

			title: '',
			desc: '',
			price: ''
		}
	}

	onSavePress = () => {
		//do stuff here
		item = []
		item = {
			title: this.state.title,
			desc: this.state.desc,
			price: this.state.price
		};

		this.state.menuItems.push(item);
		this.setState({ modalVisible: false });
	}

	componentWillMount() {

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
							<View style={styles.formContainer}>
								<Input
									label={'Title'}
									containerStyle={styles.input}
									placeholder={'Title'}
									onChangeText={(title) => this.setState({ title: title })}
								/>

								<Input
									label={'Description'}
									containerStyle={styles.input}
									placeholder={'Description'}
									onChangeText={(desc) => this.setState({ desc: desc })}
								/>

								<Input
									label={'Price'}
									containerStyle={styles.input}
									placeholder={'Price'}
									onChangeText={(price) => this.setState({ price: price })}
								/>
							</View>

							<Button
								title='Save'
								buttonStyle={{ backgroundColor: theme.primaryVariant, elevation: 0, padding: 5, marginLeft: 10, marginRight: 10 }}
							/>
						</View>
					</View>

				</Modal>

				<ScrollView style={styles.scrollView}>
					{
						this.state.menuItems.map((item, i) => (
							<Card
								key={'_item'+i}
								title={item.title}
								image={{ uri: ('https://qph.fs.quoracdn.net/main-qimg-c83dbd658e39bdb824bc720ea2cd54a2') }}>
								<Text>{item.desc}</Text>
								<Text>${item.price}</Text>
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
		width:'100%'
	},
	formContainer: {
		alignItems: 'center'
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default MenuEditScreen;