import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Surface, Headline, Paragraph} from 'react-native-paper';



export default class NearbyScreen extends React.Component{

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.mainScrollView}>
          <Surface style={styles.surfaceTop}>
            <Paragraph>Test...</Paragraph>
          
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
  },
  mainScrollView: {
    flex:1
  },
  surfaceTop: {
    margin: 10
  }

});