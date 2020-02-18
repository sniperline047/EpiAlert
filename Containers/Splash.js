import React from 'react';
import {View, StyleSheet, Text, StatusBar, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Splash extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.logo}>
          <Image source={require('../Images/Logo.png')} style={styles.pic} />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Epi/Alert</Text>
          <Text style={styles.infoText}>An Epilepsy Detection Module</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>©All Rights Reserved</Text>
          <Text style={styles.footerText}>2020-2024</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('50%'),
  },
  pic: {
    width: wp('70%'),
    height: wp('70%'),
  },
  title: {
    height: hp('30%'),
  },
  titleText: {
    fontFamily: 'Dancing Script',
    textAlign: 'center',
    fontSize: wp('12%'),
  },
  infoText: {
    fontFamily: 'Dancing Script',
    fontSize: wp('5%'),
    textAlign: 'center',
  },
  footer: {
    paddingTop: 60,
    height: hp('20%'),
  },
  footerText: {
    color: 'grey',
    fontSize: wp('3%'),
    textAlign: 'center',
  },
});

export default Splash;
