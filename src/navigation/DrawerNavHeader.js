import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Switch
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { store } from "app/src/redux/store";
import { logoutUser, revokeAuthToken } from "app/src/redux/actions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      online: false
    };
  }

  componentWillMount() { }

  switchChange() {
    this.setState({ online: (this.state.online) ? false : true });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("app/assets/header.jpg")}
            style={{ width: "100%" }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}
            >
              <Avatar
                style={styles.avatar}
                medium
                source={{
                  uri:userInfo.avatarLink
                }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Switch
                style={{
                  transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                  marginRight: 15
                }}
                thumbTintColor={theme.background}
                value={this.state.online}
                onValueChange={this.switchChange.bind(this)}
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.name}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
              <Text style={styles.email}>{userInfo.username}</Text>
            </View>
          </ImageBackground>

          <ScrollView style={styles.body}>
            <DrawerItems
              style={styles.drawerItems}
              activeTintColor={theme.onBackground}
              inactiveTintColor={theme.onBackground}
              activeBackgroundColor={theme.selected}
              {...this.props}
            />
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this.signOut.bind(this)}
            >
              <Ionicons name="md-log-out" size={24} color={theme.error} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  signOut() {
    this.props.revokeAuthToken();
    this.props.logoutUser();
  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background
  },
  header: {
    height: "25%",
    backgroundColor: theme.primary,
    elevation: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    elevation: 10
  },
  body: {
    backgroundColor: "transparent"
  },
  footer: {
    height: "15%",
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  avatar: {
    margin: 20,
    width: 80,
    height: 80,
    elevation: 10,
  },
  logoutButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 10,
    justifyContent: "center"
  },
  logoutButtonText: {
    color: theme.danger,
    fontSize: 18,
    marginLeft: 10
  },
  drawerItems: {
    backgroundColor: theme.primaryVariant
  },
  name: {
    fontSize: 16,
    color: theme.background,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  email: {
    fontSize: 14,
    color: theme.background,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingBottom: 10
  },
  headerTextContainer: {
    marginLeft: 10
  }
});

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    userInfo: state.user.info
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser,
    revokeAuthToken
  }
)(CustomDrawerContentComponent);
