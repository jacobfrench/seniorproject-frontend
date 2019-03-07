import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Card,
  Divider,
  Title,
  Paragraph,
  withTheme,
  Button
} from 'react-native-paper';
import { store } from 'app/src/redux/store';
import api from '../api';
import { IconRow, ImageRow, MenuRow } from '../components';
import { Constants } from 'expo';

 class BusinessTestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      about: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      primaryPhone: '',
      altPhone: '',
      email: '',
      menus: []
    }
  }

  componentWillMount() {
    const {businessId} = this.props.navigation.state.params;


    if(!businessId) {
      let userId = store.getState().user.info.id;
      api.getBusinessByUserId(userId)
        .then(res => {
          this.setState(res);
        });
    } else {
      api.getBusinessById(businessId)
        .then(res =>{
          this.setState(res);
        })
      
    }

  }

  phoneFormat = (phoneNum) => {
    return '(' + phoneNum.substring(0, 3) + ') ' + phoneNum.substring(3, 6) + '-' + phoneNum.substring(6, 11);
  }

  render() {
    const {colors} = this.props.theme;
    console.log('from businesstestscreen')
    console.log(this.state)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0}}>
            <ImageBackground
              source={{ uri: 'https://indycarpetcleaning.com/wp-content/uploads/2013/12/steam-carpet-cleaning-services-1-1500x630.jpg' }}
              style={styles.header}
            >
              <View
                style={{
                  width: '100%',
                  paddingRight: 115,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <View style={styles.status}></View>
                <Title style={styles.title}>{this.state.name}</Title>
              </View>
            </ImageBackground>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View
              style={{
                marginBottom: 10,
                justifyContent: 'flex-start',
                marginTop: 10,
                flexDirection: 'row'
              }}
            >

              <Button
                mode={'text'}
                icon={'message'}
                uppercase={false}
              >
                Message
              </Button>

              <Button
                mode={'text'}
                icon={'favorite'}
                uppercase={false}
              >
                Favorite
              </Button>
   
            </View>
            <View style={styles.profilePicture}>
              <Image
                source={{ uri: 'https://freedesignfile.com/upload/2017/10/Square-arrow-business-logo-vector.jpg' }}
                style={styles.picture}
              />
            </View>
            <Card style={styles.card}>
              <Card.Content>
                <Title>Contact Us</Title>
                <Divider style={styles.divider} />
                <View>
                  <IconRow icon="ios-call" text={this.phoneFormat(this.state.primaryPhone)} />
                  <IconRow text={this.phoneFormat(this.state.altPhone)} style={{ marginBottom: 5 }} />
                  <IconRow icon="ios-pin" text={this.state.street} />
                  <IconRow text={this.state.city + ', ' + this.state.state} />
                  <IconRow text={this.state.zip} />
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content>
                <Title>About Us</Title>
                <Divider style={styles.divider} />
                <Paragraph>{this.state.about}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={[styles.card, styles.lastCard]}>
              <Card.Content>
                <Title>Menu</Title>
                <Divider style={styles.divider} />
         
            {
							this.state.menus.map((menu, i) => (
								<MenuRow
									key={menu.title + i}
									imageUrl={menu.imageUrl}
									title={menu.title}
									description={menu.description}
								/>
							))

						}
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fafafa'
  },
  header: {
    alignItems: 'flex-end',
    aspectRatio: 16 / 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    textAlign: 'right',
    marginLeft: 10
  },
  profilePicture: {
    right: 10,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: 100,
    justifyContent: 'center',
    marginTop: -50,
    width: 100
  },
  picture: {
    alignSelf: 'center',
    borderRadius: 90,
    height: 90,
    width: 90
  },
  status: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 10,
    width: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  card: {
    marginTop: 10
  },
  lastCard: {
    paddingBottom: 10
  },
  divider: {
    marginBottom: 5,
    marginTop: 5
  }
});

export default withTheme(BusinessTestScreen);