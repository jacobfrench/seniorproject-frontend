import React from "react";
import { StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Surface, Paragraph, Title, Divider, Card, Button } from 'react-native-paper';


const CategoryCard = (props) => {
  return (
    <TouchableOpacity onPress={() => console.log('onPress action here...')} style={styles.topHorizonalCard}>
      <ImageBackground
        style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}
        imageStyle={{ borderRadius: 2 }}
        source={{ uri: props.image }}
      >
        <Surface style={{flex: 1, backgroundColor: 'rgba(0,0,0,.5)', borderRadius: 2 }}>
          <Title style={{ color: 'white', paddingLeft: 5, elevation: 5, fontSize: 18 }}>{props.title}</Title>
          <Paragraph style={{ color: 'white', fontSize: 9, paddingLeft: 5, elevation: 5 }}>{props.subtext}</Paragraph>
          <Divider style={{ width: '100%', padding: 10 }} />
        </Surface>
      </ImageBackground>
    </TouchableOpacity>
  );

};

const BusinessCard = (props) => {
  return (
    <Card style={{ marginTop: 15, elevation: 5}}>
      <Card.Content>
        <Card.Cover source={{ uri: props.image }} />
        <Title>{props.name}</Title>
        <Paragraph>{props.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log('pressed card...')}>View</Button>
      </Card.Actions>
    </Card>
  );

};



const styles = StyleSheet.create({
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
    backgroundColor: '#6200ee',
    margin: 10,
    width: 120,
    height: 170,
    borderRadius: 2,
    elevation: 10
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
    backgroundColor: '#6200ee',
    margin: 10,
    width: 120,
    height: 170,
    borderRadius: 2,
    elevation: 10
  }

});

export { CategoryCard, BusinessCard };