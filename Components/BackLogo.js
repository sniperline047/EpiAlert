import React from 'react';
import {Image, StyleSheet} from 'react-native';

class HeaderLogo extends React.Component {
  render() {
    return (
      <Image source={require('../Images/back.png')} style={styles.image} />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
});

export default HeaderLogo;
