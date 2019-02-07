import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Surface, Headline, Paragraph} from 'react-native-paper';
import { CategoryCard, BusinessCard } from 'app/src/components/common';



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
              <Headline style={styles.headline}>Popular Categories</Headline>
              <Paragraph style={styles.subtext}>Find popular businesses near you.</Paragraph>
              <ScrollView horizontal style={styles.topHorizontalScrollView}>

                <CategoryCard
                  image={'https://all4humor.com/images/files/Cool%20Plumber.jpg'}
                  title={'Plumbing'}
                  subtext={'Find nearby plumbers.'}
                />
                <CategoryCard
                  image={'https://d3ciwvs59ifrt8.cloudfront.net/7c5d28c7-80ec-47b5-8c03-17cba7a88c3b/c282dbbc-56a6-4de3-982a-18803bcade8c_l.jpg'}
                  title={'Cannabis'}
                  subtext={'The stickiest of the ickiest'}
                />
                <CategoryCard
                  image={'https://ih1.redbubble.net/image.427712605.8856/flat,550x550,075,f.jpg'}
                  title={'I.T.'}
                  subtext={'Computer Repair'}
                />
                <CategoryCard
                  title={'Food'}
                  image={'http://www.whetstonestation.com/wp-content/uploads/2018/03/Food-Truck-Mockup-Front.jpg'}
                  subtext={'fdfkjdjdfj'}
                />
                <CategoryCard
                  title={'Pest Control'}
                  image={'http://eaglepestandchemical.com/files/bigstock/2014/08/pest-control-33382259.jpg?w=316&h=237&a=t'}
                  subtext={'fdfkjdjdfj'}
                />

                <CategoryCard
                  title={'Carpets'}
                  image={'https://centurionservices.com/images/services/carpet.jpg'}
                  subtext={'fdfkjdjdfj'}
                />

                <CategoryCard
                  title={'Landscaping'}
                  image={'https://www.careers.govt.nz/assets/jobs/gardener/gardener.jpg'}
                  subtext={'fdfkjdjdfj'}
                />

                <CategoryCard
                  title={'Grooming'}
                  image={'https://petlifetoday.com/wp-content/uploads/2018/06/dog-grooming-clippers.jpg'}
                  subtext={'fdfkjdjdfj'}
                />

                <CategoryCard
                  title={'Pools'}
                  image={'https://fundbox.com/blog/wp-content/uploads/2016/06/shutterstock_242808139-940x467.jpg'}
                  subtext={'fdfkjdjdfj'}
                />

                <CategoryCard
                  title={'HVAC'}
                  image={'https://www.gridpoint.com/wp-content/uploads/2017/06/HVAC-Maintenance_smaller.jpg'}
                  subtext={'fdfkjdjdfj'}
                />

                <CategoryCard
                  title={'Real Estate'}
                  image={'https://techcrunch.com/wp-content/uploads/2018/01/gettyimages-200066800-001-1.jpg?w=730&crop=1'}
                  subtext={'fdfkjdjdfj'}
                />

              </ScrollView>

            </Surface>
          </Surface>

          <Surface style={styles.separator}>
            <Headline style={styles.headline}>Near Me Now</Headline>
            <Paragraph style={styles.subtext}>Some subtext about the things in this card.</Paragraph>
          </Surface>


          <BusinessCard 
            name={'business name'}
            description={'description'}
            image={'https://www.careers.govt.nz/assets/jobs/gardener/gardener.jpg'}
          />
          

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
    marginLeft: 10,
    color: '#2c3e50'
  },
  subtext: {
    marginLeft: 10,
    color: '#bdc3c7',
    paddingBottom: 10
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
    elevation: 10
  },
  separator: { 
    marginTop: 15, 
    elevation: 5, 
    borderRadius: 2, 
    alignContent: 'flex-start', 
    width: '100%' 
  }

});