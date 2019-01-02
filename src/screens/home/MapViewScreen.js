import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { store } from 'app/src/redux/store';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Button } from 'react-native-paper';
import { ThemeProvider } from '@callstack/react-theme-provider';


class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: {
        latitude: 35.355239,
        longitude: -119.05878,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      isLoading: true

    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setMyLocation(position.coords);
      this.setState({ isLoading: false });
    })
    


  }


  setMyLocation(coords) {
    this.setState({
      myLocation: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : (
            <MapView
              style={styles.mapView}
              initialRegion={this.state.myLocation}
              region={this.state.myLocation}
            >
              <MapView.Marker
                coordinate={this.state.myLocation}
                title={'My Location'}
              />
            </MapView>
          )}

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
  },
  mapView: {
    ...StyleSheet.absoluteFillObject
  }

});

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    email: state.user.info.username
  };
};

export default connect(mapStateToProps)(MapViewScreen);