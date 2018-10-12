import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { store } from "app/src/redux/store";
import { logoutUser, revokeAuthToken } from "app/src/redux/actions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";
import { LinearGradient } from "expo";

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  componentWillMount() {}

  render() {
    const { userInfo } = this.props;
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View
          style={styles.container}
        >
          <View style={styles.header}>
            <Avatar
              style={styles.avatar}
              medium
              source={{
                uri:
                  "data:image/png;base64,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"
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.name}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
              <Text style={styles.email}>{userInfo.username}</Text>
            </View>
          </View>

          <ScrollView style={styles.body}>
            <DrawerItems
              style={styles.drawerItems}
              activeTintColor={theme.onPrimary}
              inactiveTintColor={theme.onBackground}
              activeBackgroundColor={theme.primary}
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
    backgroundColor: "transparent",
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
    margin: 10,
    width: 80,
    height: 80,
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
    color: theme.selected
  },
  email: {
    fontSize: 14,
    color: theme.selected
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
