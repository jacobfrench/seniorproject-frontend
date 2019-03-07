import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { store } from "app/src/redux/store";
import { connect } from "react-redux";
import api from "../business/api";

class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      hasFavorites: false
    };
  }

  componentWillMount() {
    let username = store.getState().user.info.username;
    api
      .getFavorites(username)
      .then((favorites) => this.setState({ favorites: favorites }))
      .then( this.setState({hasFavorites: true}));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          {this.state.hasFavorites ? (
            this.state.favorites.map((item, i) => (
              <Text key={item.name+i}>{item.name}</Text>
            ))
          ) : (
            <Text>No items</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10
  },
  body: {
    backgroundColor: theme.background,
    width: "100%"
  },
  name: {
    fontSize: 18,
    color: theme.onPrimary,
    paddingTop: 10
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    email: state.user.info.username
  };
};

export default connect(mapStateToProps)(FavoritesScreen);
