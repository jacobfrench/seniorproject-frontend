import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { store } from 'app/src/redux/store';
import { Divider, Avatar, Text, ButtonGroup } from 'react-native-elements';
import api from 'app/src/api';
import { Ionicons } from '@expo/vector-icons';

class BusinessBioScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			about: '',
			street: '4900 University Way',
			city: 'Bakersfield',
			state: 'CA',
			zip: '93301',
			primaryPhone: '(661) 555-5213',
			altPhone: '(661) 555-1234',
			email: 'SomeCompany@gmail.com',
		}
	}

	componentWillMount() {
	}

	render() {
		const buttons = [
			<Ionicons name='md-heart' size={28} color={theme.onBackground} />,
			<Ionicons name='md-paper-plane' size={28} color={theme.onBackground} />,
			<Ionicons name='md-create' size={28} color={theme.onBackground} />
		];
		const { selectedIndex } = this.state;
		return (
			<SafeAreaView stysty={styles.container}>

				<ImageBackground
					style={styles.header}
					source={{ uri: ('http://www.camranhbaync.com/wp-content/uploads/2014/01/main-header.jpg') }}
				>
					<View style={styles.avatarView}>
						<Avatar
							style={styles.avatar}
							medium
							source={{ uri: "https://cdn2.unrealengine.com/Epic+Games+Node%2Fxlarge_whitetext_blackback_epiclogo_504x512_1529964470588-503x512-ac795e81c54b27aaa2e196456dd307bfe4ca3ca4.jpg" }}
							onPress={() => console.log("Works!")}
							activeOpacity={0.7}
						/>
						<View styles={styles.headerTextView}>
							<Text h3 style={styles.nameText}>Business Name</Text>
							<Text h4 style={styles.subText}>Subtext</Text>
						</View>
					</View>
				</ImageBackground>

				<ButtonGroup
					onPress={() => console.log(selectedIndex)}
					selectedIndex={selectedIndex}
					buttons={buttons}
					containerStyle={{ height: 50 }}
				/>

				<ScrollView style={styles.scrollView}>
					<View style={styles.infoCard}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.onBackground }}>
							Contact Info
						</Text>
						<Divider style={{ backgroundColor: theme.onBackground, marginBottom: 10 }} />
						<Text style={styles.aboutText}>Phone: {this.state.primaryPhone}</Text>
						<Text style={styles.aboutText}>Alt Phone: {this.state.altPhone}</Text>
						<Text style={styles.aboutText}>Email: {this.state.email}</Text>
						<Text style={styles.aboutText}>{this.state.street}</Text>
						<Text style={styles.aboutText}>{this.state.city}, {this.state.state} {this.state.zip}</Text>
					</View>
					<View style={styles.infoCard}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.onBackground }}>
							About
						</Text>
						<Divider style={{ backgroundColor: theme.onBackground, marginBottom: 10 }} />
						<Text style={styles.aboutText}>{this.state.about}</Text>
					</View>
				</ScrollView>

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
	scrollView: {
		width: '100%',
		marginBottom: 100
	},
	avatar: {
		width: 80,
		height: 80,
		marginRight: 10
	},
	avatarView: {
		margin: 10,
		flexDirection: 'row'
	},
	header: {
		width: '100%',
		height: 200,
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	nameText: {
		color: theme.onPrimary,
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		marginBottom: 5,
		fontSize: 28
	},
	subText: {
		color: theme.onPrimary,
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontSize: 20
	},
	headerTextView: {
		flexDirection: 'row',
		marginLeft: 10
	},
	infoCard: {
		flex: 1,
		backgroundColor: theme.background,
		padding: 10,
		margin: 10,
		elevation: 5,
		shadowColor: 'rgba(0, 0, 0, 1)',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 5,
		borderRadius: 10
	},
	aboutText: {
		color: theme.onBackground
	}
});

export default BusinessBioScreen;