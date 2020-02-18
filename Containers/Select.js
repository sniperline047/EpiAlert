import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Select extends React.Component {
  render() {
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
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnText}>Existing Member</Text>
          </TouchableHighlight>
          <Text style={styles.orText}>────────  or  ────────</Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.btnText}>Create New</Text>
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
    height: hp('50%'),
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
  buttonView: {
    height: hp('50%'),
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

export default Select;
