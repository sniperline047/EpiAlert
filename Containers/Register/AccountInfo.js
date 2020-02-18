import React from 'react';
import {StyleSheet, Text, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class AccountInfo extends React.Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.1}}
        colors={['#167cca', '#f968c0']}
        style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <Text style={styles.titleText}>AccountInfo</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginTop: 60,
    fontSize: 40,
    textAlign: 'center',
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  infoText: {
    fontSize: 20,
  },
});

export default AccountInfo;
