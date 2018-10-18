import FAB from 'react-native-fab';
import React from 'react';
import { Modal, StyleSheet, View, ScrollView, SafeAreaView, Text, Alert } from 'react-native';
import { store } from 'app/src/redux/store';
// import { Button } from 'app/src/components/common/Button';
import { Input, Card, Button, Icon } from 'react-native-elements'

class MenuEditScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			menuItems: [{
				title: 'some pizza',
				desc: 'nummy pizza stuff',
				price: '15.90'
			}],

			title:'',
			desc:'',
			price:''
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
							<Input
								label={'Title'}
								containerStyle={styles.input}
								placeholder={'Title'}
								onChangeText={(title) => this.setState({ title: title })}
								style={styles.inputStyle}
							/>

							<Input
								label={'Description'}
								containerStyle={styles.input}
								placeholder={'Description'}
								onChangeText={(desc) => this.setState({ desc: desc })}
								style={styles.inputStyle}
							/>

							<Input
								label={'Price'}
								containerStyle={styles.input}
								placeholder={'Price'}
								onChangeText={(price) => this.setState({ price: price })}
								style={styles.inputStyle}
							/>

							<Button
								title='Save'
								onPress={this.onSavePress}
								style={styles.saveButton}
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
								<Text style={{ marginBottom: 10 }}>
									{item.price}
  						</Text>
								<Button
									icon={<Icon name='code' color='#ffffff' />}
									backgroundColor='#03A9F4'
									buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
									title='VIEW NOW' />
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
		padding: 150
	},
	modalInner: {
		justifyContent: 'center',
		backgroundColor: 'white',
		height: '95%',
		width: '95%',
		borderRadius: 5,
	},
	modalOuter: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		marginBottom: 10,
		padding: 10
	},
	saveButton: {
		backgroundColor: theme.primaryVariant,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		padding: 10
	},
	scrollView: {
		flex: 1,
		width:'100%'
	}
});

const mapStateToProps = state => {
	return {
		isLoading: state.user.isLoading,
		email: state.user.info.username
	};
};

export default MenuEditScreen;