import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { FAB, Portal, Text, Modal } from 'react-native-paper';
import { store } from 'app/src/redux/store';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import api from 'app/src/api';
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
      isLoading: true,
      nearbyBusinesses: [],
      searchRadius: 5, //in miles
      searchIndustry: 'Technology',
      searchModalVisble: false

    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setMyLocation(position.coords);
      this.findNearyby();
    })

  }

  onSearchPress() {
    this.setState({ isLoading: true });
    this.findNearyby();
  }

  findNearyby() {
    data = {
      latitude: this.state.myLocation.latitude,
      longitude: this.state.myLocation.longitude,
      radius: this.state.searchRadius,
      industry: this.state.searchIndustry
    }
    api.findBusinessesByDistance(data).then((res) => {
      this.setState({ nearbyBusinesses: res });
      this.setState({ isLoading: false });
      console.log(res)
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
              showsUserLocation={true}
            >

              {
                this.state.nearbyBusinesses.map((user, i) => (
                  <Marker
                    key={'pin_' + i}
                    coordinate={{ latitude: user.latitude, longitude: user.longitude }}
                    title={user.business.name}
                  />
                ))
              }
            </MapView>


          )}
        <FAB
          style={styles.fab}
          large
          color={'white'}
          icon='search'
          onPress={() => this.setState({ searchModalVisble: true })}
        />

        <Portal.Host>
          <Portal>
            <Modal 
            visible={this.state.searchModalVisble} 
            onDismiss={() => this.setState({ searchModalVisble: false })}
            style={styles.searchModal}
            >
              <View style={styles.searchModal}>
                <Text style={styles.searchHeader}>Search Options</Text>
              </View>
            </Modal>
          </Portal>
        </Portal.Host>

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
  controlsContainer: {
    flex: 1
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.primary,
  },
  searchModal: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    elevation: 5
    
  }

});

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    email: state.user.info.username
  };
};

export default connect(mapStateToProps)(MapViewScreen);