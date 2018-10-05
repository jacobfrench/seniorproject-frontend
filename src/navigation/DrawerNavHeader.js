import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { store } from 'app/src/redux/store';
import { logoutUser, revokeAuthToken } from "app/src/redux/actions";
import Ionicons from "@expo/vector-icons/Ionicons";
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';

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

      <LinearGradient
          style={styles.container}
          colors={[theme.primary, theme.primary_dark]}
        >
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require("app/assets/icons/person.png")}
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
            activeTintColor={theme.text}
            inactiveTintColor={theme.selected}
            activeBackgroundColor={theme.selected}
            
            {...this.props} 
            />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity 
          style={styles.logoutButton}
          onPress={this.signOut.bind(this)}
          >
            <Ionicons name="md-log-out" size={24} color={theme.danger}/>          
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        </LinearGradient>
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
    backgroundColor: theme.primary
  },
  header: {
    height: "25%",
    backgroundColor: "transparent",
    elevation: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  body: {
    backgroundColor: 'transparent'
  },
  footer: {
    height: "15%",
    backgroundColor: 'transparent',
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexDirection: 'column'
  },
  image: {
    margin: 10,
    width: 80,
    height: 80
  },
  logoutButton: {
    backgroundColor: "transparent",
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center'
  },
  logoutButtonText: {
    color: theme.danger,
    fontSize: 18,
    marginLeft: 10
  },
  drawerItems: {
    backgroundColor: theme.primary_dark,
  },
  name: {
    fontSize: 16,
    color: theme.selected,
  },
  email: {
    fontSize: 14,
    color: theme.selected,
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
