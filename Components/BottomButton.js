import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';

const BottomButton = ({onButtonPress}) => {
  return (
    <View style={styles.btnArea}>
      <TouchableHighlight onPress={onButtonPress} style={styles.button}>
        <Image source={require('../Images/forward.png')} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  btnArea: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#000',
    width: wp('15%'),
    height: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withNavigation(BottomButton);
