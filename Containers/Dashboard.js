import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Dashboard</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC75F',
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

export default Dashboard;
