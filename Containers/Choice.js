import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from '../Components/Carousel';

class Choice extends React.Component {
  render() {
    const images = [
      {
        source: require('../Images/1.jpeg'),
        id: 1,
        length: wp('80%'),
      },
      {
        source: require('../Images/2.jpg'),
        id: 2,
        length: wp('80%'),
      },
      {
        source: require('../Images/3.jpeg'),
        id: 3,
        length: wp('80%'),
      },
    ];
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.1}}
        colors={['#167cca', '#f968c0']}
        style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Epi/Alert</Text>
          <Text style={styles.infoText}>An Epilepsy Detection Module</Text>
        </View>
        <View style={styles.carouselBox}>
          <Carousel images={images} />
        </View>
        <Text style={styles.secText}>Who are you?</Text>
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Select')}>
            <Text style={styles.btnText}>Patient</Text>
          </TouchableHighlight>
          <Text style={styles.orText}>────────  or  ────────</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnText}>Caretaker</Text>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    height: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Dancing Script',
    textAlign: 'center',
    fontSize: wp('12%'),
    color: 'white',
  },
  infoText: {
    fontFamily: 'Dancing Script',
    fontSize: wp('5%'),
    textAlign: 'center',
    color: 'white',
  },
  carouselBox: {
    width: '95%',
    height: hp('35%'),
    backgroundColor: 'rgba(0,0,0,0.33)',
    justifyContent: 'center',
    borderRadius: 22,
  },
  secText: {
    fontFamily: 'Dancing Script',
    fontSize: wp('8%'),
    textAlign: 'center',
    color: 'black',
    paddingTop: 20,
  },
  buttonView: {
    height: hp('30%'),
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
    width: wp('60%'),
    padding: 10,
    margin: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  orText: {
    fontSize: wp('5%'),
    color: 'white',
  },
});

export default Choice;
