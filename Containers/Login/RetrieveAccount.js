import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class RetrieveAccount extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>RetrieveAccount</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D22284',
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

export default RetrieveAccount;
