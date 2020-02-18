import React from 'react';
import {View, StatusBar} from 'react-native';
import AppContainer from './Components/Navigation';

class App extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="transparent" translucent />
        <AppContainer />
      </View>
    );
  }
}

export default App;
