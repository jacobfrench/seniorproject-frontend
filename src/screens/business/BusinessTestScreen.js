import React from 'react';
import { SafeAreaView, ScrollView, View, ImageBackground, StyleSheet } from 'react-native';
import { store } from 'app/src/redux/store';
import { Avatar, Text, Divider, ButtonGroup } from 'react-native-elements';
import api from 'app/src/api';
import { Ionicons } from '@expo/vector-icons';

class BusinessTestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Business Name',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi nisi, consequat eget magna sed, aliquam semper urna. Integer condimentum est nec risus rutrum mattis. Sed quis lectus congue, porttitor metus et, facilisis lorem.',
      street: '4900 University Way',
      city: 'Bakersfield',
      state: 'CA',
      zip: '93301',
      primaryPhone: '(661) 555-5213',
      altPhone: '(661) 555-1234',
      email: 'somecompany@gmail.com'
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
      <SafeAreaView style={styles.container}>

        <ImageBackground
          source={{ uri: 'http://www.camranhbaync.com/wp-content/uploads/2014/01/main-header.jpg' }}
          style={styles.header}
        >

          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                medium
                source={{ uri: 'https://cdn2.unrealengine.com/Epic+Games+Node%2Fxlarge_whitetext_blackback_epiclogo_504x512_1529964470588-503x512-ac795e81c54b27aaa2e196456dd307bfe4ca3ca4.jpg' }}
                containerStyle={styles.avatar}
                onPress={() => console.log("Works!")}
              />
            </View>
            <View>
              <Text h3 style={styles.headerText}>{this.state.name}</Text>
              <Text h4 style={styles.headerText}>Subtext</Text>
            </View>
          </View>
        </ImageBackground>

        <ButtonGroup
          onPress={() => console.log("pressed")}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.buttonContainer}
        />

        <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>

          <View style={styles.card}>
            <Text h4 style={{ color: theme.onBackground }}>Contact Information</Text>
            <Divider style={styles.cardDivider} />
            <View style={styles.contactField}>
              <View style={styles.iconLabel}>
                <Ionicons name='md-create' size={20} color={theme.onBackground} />
              </View>
              <View style={styles.textLabel}>
                <Text>{this.state.primaryPhone}</Text>
              </View>
            </View>
            <View style={styles.contactField}>
              <View style={styles.iconLabel}>
                <Ionicons name='md-mail' size={20} color={theme.onBackground} />
              </View>
              <View style={styles.textLabel}>
                <Text>{this.state.email}</Text>
              </View>
            </View>
            <View style={styles.contactField}>
              <View style={styles.iconLabel}>
                <Ionicons name='md-home' size={20} color={theme.onBackground} />
              </View>
              <View style={styles.longTextLabel}>
                <Text>{this.state.street}</Text>
                <Text>{this.state.city}, {this.state.state} {this.state.zip}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text h4 style={{ color: theme.onBackground }}>About Us</Text>
            <Divider style={styles.cardDivider} />
            <Text>{this.state.about}</Text>
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
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end'
  },
  headerText: {
    color: 'white',
    textShadowOffset: {
      width: 0.5,
      height: 1
    },
    textShadowColor: '#000000',
    textShadowRadius: 5
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginTop: 10,
    padding: 10,
    elevation: 1
  },
  cardDivider: {
    backgroundColor: '#bdc6cf',
    height: 1,
    marginTop: 5,
    marginBottom: 10
  },
  iconLabel: {
    flex: 0.1,
    width: 20,
    height: 20,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    flex: 0.9,
    height: 20,
    justifyContent: 'center'
  },
  longTextLabel: {
    flex: 0.9,
    height: 40,
    justifyContent: 'center'
  },
  contactField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  avatarContainer: {
    height: 80,
    width: 80,
    elevation: 15,
    marginRight: 5,
  },
  buttonContainer: {
    backgroundColor: theme.background,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 3,
    elevation: 1
  },
  avatar: {
    height: 80,
    width: 80,
    elevation: 15
  }
});

export default BusinessTestScreen;