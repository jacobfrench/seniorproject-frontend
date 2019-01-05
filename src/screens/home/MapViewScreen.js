import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View, Slider } from 'react-native';
import { FAB, Portal, Text, Modal, Button, Headline, Divider, Surface, Title } from 'react-native-paper';
import { store } from 'app/src/redux/store';
import { IndustryPicker } from 'app/src/components/common';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import api from 'app/src/api';

const markerImg = require('app/assets/icons/map-marker.png');

class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },

      isLoading: true,
      nearbyBusinesses: [],
      searchRadius: 1, //in miles 
      searchIndustry: 'Select Industry...',
      searchModalVisble: false,

    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setMyLocation(position.coords);
    });
  }

  onSearchPress() {
    this.setState({ isLoading: true });
    this.findNearyby();
    this.setState({ searchModalVisble: false });

  }

  findNearyby() {
    data = {
      latitude: this.state.myLocation.latitude,
      longitude: this.state.myLocation.longitude,
      radius: this.state.searchRadius,
      industry: this.state.searchIndustry
    }
    api.findBusinessesByDistance(data).then((res) => {
      this.setState({ nearbyBusinesses: res }, () => {
        this.setState({ isLoading: false });
      });
    });
  }


  setMyLocation(coords) {
    this.setState({
      myLocation: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }, () => {
      this.setState({ isLoading: false });
    })

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? (
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={{ margin: 5, color: theme.primary }}>Finding Your Location...</Text>
          </View>
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
                    image={markerImg}
                    coordinate={{ latitude: user.latitude, longitude: user.longitude }}
                  >
                    <Callout onPress={() => console.log(user)}>
                      <Surface style={{ padding: 5, elevation: 5 }}>
                        <Title>{user.business.name}</Title>
                        <Text>{user.firstName} {user.lastName}</Text>
                      </Surface>
                    </Callout>
                  </Marker>
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
                <Headline style={styles.headline}>Search</Headline>
                <Divider style={styles.divider} />

                <IndustryPicker
                  selectedValue={this.state.searchIndustry}
                  style={{ height: 50, width: '90%', elevation: 5 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ searchIndustry: itemValue })}>
                </IndustryPicker>

                <View style={{ width: '90%', margin: 10 }}>
                  <Text style={{ color: theme.primary }}>Search Distance</Text>
                </View>

                <Slider
                  style={styles.slider}
                  thumbTintColor={theme.primary}
                  minimumTrackTintColor={theme.primary}
                  minimumValue={1}
                  maximumValue={20}
                  onValueChange={(value) => this.setState({ searchRadius: value })}
                  value={this.state.searchRadius}
                  step={1}>
                </Slider>

                <View style={{ width: '90%', margin: 10 }}>
                  <Text>{this.state.searchRadius} Miles.</Text>
                </View>

                <Divider style={styles.divider} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Button
                    style={styles.searchButton}
                    icon="close"
                    mode="text"
                    onPress={() => this.setState({ searchModalVisble: false })}>
                    Cancel
                  </Button>

                  <Button
                    style={styles.searchButton}
                    icon="search"
                    mode="text"
                    onPress={() => this.onSearchPress()}>
                    Search
                </Button>
                </View>


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
    backgroundColor: theme.primary
  },
  searchModal: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  headline: {
    margin: 5,
    padding: 5
  },
  searchButton: {
    margin: 15,
  },
  searchButton: {
    margin: 5,
  },
  divider: {
    width: '100%'
  },
  slider: {
    width: '100%',
    padding: 10,
    margin: 10
  }


});

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    email: state.user.info.username
  };
};

export default connect(mapStateToProps)(MapViewScreen);