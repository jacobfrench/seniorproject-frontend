import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { Surface, Headline, Paragraph, Title, Divider } from 'react-native-paper';



export default class NearbyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.mainScrollView}>
          <Surface style={styles.surfaceTop}>

            <Surface style={{ margin: 5, alignContent: 'flex-start', width: '100%' }}>
              <Headline style={styles.headline}>Near Me Now</Headline>
              <Paragraph style={styles.subtext}>Some subtext about the things in this card.</Paragraph>
              <ScrollView horizontal style={styles.topHorizontalScrollView}>
                {/*browsing category list */}
                <TouchableOpacity onPress={() => console.log('onPress action here...')} style={styles.topHorizonalCard}>
                  <ImageBackground
                    style={{flex: 1, flexDirection:'row', alignItems: 'flex-end' }}
                    imageStyle={{borderRadius: 2}}
                    source={{uri: 'https://img.huffingtonpost.com/asset/5af9ef08200000f202b9175b.jpeg?cache=lciqaj47qq&ops=scalefit_720_noupscale'}}
                  >
                  <Surface style={{backgroundColor: 'transparent'}}>
                    <Title style={{color: 'white', paddingLeft: 5, elevation: 5}}>Plumbing</Title>
                    <Paragraph style={{color:'white', fontSize: 9, paddingLeft: 5, elevation: 5}}>Find nearby plumbers.</Paragraph>
                    <Divider style={{width: '100%', padding: 10}}/>
                  </Surface>
                  </ImageBackground>
                </TouchableOpacity>
              </ScrollView>
            </Surface>


          </Surface>
        </ScrollView>
      </SafeAreaView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  mainScrollView: {
    flex: 1,
    width: '100%',
    padding: 5
  },
  surfaceTop: {
    width: '100%',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  headline: {
    marginLeft: 5,
    color: '#2c3e50'
  },
  subtext: {
    marginLeft: 5,
    color: '#bdc3c7'
  },
  topHorizontalScrollView: {
    width: '100%',
  },
  topHorizonalCard: {
    backgroundColor: 'red',
    margin: 10,
    width: 120,
    height: 170,
    borderRadius: 2,
    elevation: 5
  }

});