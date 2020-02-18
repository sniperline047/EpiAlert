import React from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  AppRegistry,
  Platform,
  PermissionsAndroid,
  NativeEventEmitter,
  NativeModules,
  Button,
  ToastAndroid,
  FlatList,
  Alert,
} from 'react-native';
import BottomButton from '../Components/BottomButton';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BleManager from 'react-native-ble-manager'; // for talking to BLE peripherals
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); // create an event emitter for the BLE Manager module

import {stringToBytes} from 'convert-string'; // for converting string to byte array
import RandomId from 'random-id'; // for generating random user ID
import bytesCounter from 'bytes-counter'; // for getting the number of bytes in a string
import Pusher from 'pusher-js/react-native'; // for using Pusher inside React Native
import Spinner from 'react-native-spinkit'; // for showing a spinner when loading something
import Prompt from 'react-native-prompt';

class ConnectDevice extends React.Component {
  constructor() {
    super();
    this.state = {
      is_scanning: false, // whether the app is currently scanning for peripherals or not
      peripherals: null, // the peripherals detected
      connected_peripheral: null, // the currently connected peripheral
      user_id: null, // the ID of the current user
      vitals: null, // the attendees currently synced with the app
      promptVisible: false, // whether the prompt for the user's name is visible or not
      has_recorded: false, // whether the current user has already attended
    };

    this.peripherals = []; // temporary storage for the detected peripherals

    this.startScan = this.startScan.bind(this); // function for scanning for peripherals
    this.openBox = this.openBox.bind(this); // function for opening the prompt box
  }

  componentWillMount() {
    BleManager.enableBluetooth()
      .then(() => {
        console.log('Bluetooth is already enabled');
      })
      .catch(error => {
        Alert.alert('You need to enable bluetooth to use this app.');
      });

    // initialize the BLE module
    BleManager.start({showAlert: false}).then(() => {
      console.log('Module initialized');
    });
  }

  componentDidMount() {
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        var peripherals = this.peripherals; // get the peripherals
        // check if the peripheral already exists
        var el = peripherals.filter(el => {
          return el.id === peripheral.id;
        });

        if (!el.length) {
          peripherals.push({
            id: peripheral.id, // mac address of the peripheral
            name: peripheral.name, // descriptive name given to the peripheral
          });
          this.peripherals = peripherals; // update the array of peripherals
        }
      },
    );

    bleManagerEmitter.addListener('BleManagerStopScan', () => {
      console.log('scan stopped');
      if (this.peripherals.length === 0) {
        Alert.alert('Nothing found', 'Sorry, no peripherals were found');
      }
      this.setState({
        is_scanning: false,
        peripherals: this.peripherals,
      });
    });

    var pusher = new Pusher('9e662d4b69c8524ad972', {
      cluster: 'ap2',
      encrypted: true,
    });

    var channel = pusher.subscribe('attendance-channel');
    channel.bind('attendance-event', data => {
      if (data.is_attendees) {
        this.setState({
          vitals: data.vitals,
        });
      } else {
        ToastAndroid.show(
          `${data.heart_beat} just registered!`,
          ToastAndroid.LONG,
        );
        this.setState({
          vitals: [...this.state.vitals, data],
        });
      }
    });
  }

  startScan() {
    this.peripherals = [];
    this.setState({
      is_scanning: true,
    });

    BleManager.scan([], 2).then(() => {
      console.log('scan started');
    });
  }

  connect(peripheral_id) {
    BleManager.connect(peripheral_id)
      .then(() => {
        this.setState({
          connected_peripheral: peripheral_id,
        });

        Alert.alert('Connected!', 'You are now connected to the peripheral.');

        BleManager.retrieveServices(peripheral_id).then(peripheralInfo => {
          console.log('Peripheral info:', peripheralInfo);
        });
      })
      .catch(error => {
        Alert.alert('Err..', 'Something went wrong while trying to connect.');
      });
  }

  attend(value) {
    let user_id = RandomId(15);

    this.setState({
      user_id: user_id,
    });

    let me = {
      id: user_id,
      heart_beat: value,
    };

    let str = JSON.stringify(me);
    let bytes = bytesCounter.count(str);
    let data = stringToBytes(str);

    const BASE_UUID = '-5659-402b-aeb3-d2f7dcd1b999';
    const PERIPHERAL_ID = '0000';
    const PRIMARY_SERVICE_ID = '0100';

    let primary_service_uuid = PERIPHERAL_ID + PRIMARY_SERVICE_ID + BASE_UUID;
    let ps_characteristic_uuid = PERIPHERAL_ID + '0300' + BASE_UUID;

    BleManager.write(
      this.state.connected_peripheral,
      primary_service_uuid,
      ps_characteristic_uuid,
      data,
      bytes,
    )
      .then(() => {
        this.setState({
          has_recorded: true,
        });

        BleManager.disconnect(this.state.connected_peripheral)
          .then(() => {
            Alert.alert(
              'Succesfull',
              'You have successfully added the event, please disable bluetooth.',
            );
          })
          .catch(error => {
            Alert.alert(
              'Error disconnecting',
              "You have successfully added the event but there's a problem disconnecting to the peripheral, please disable bluetooth to force disconnection.",
            );
          });
      })
      .catch(error => {
        Alert.alert(
          'Error adding',
          'Something went wrong while trying to attend. Please try again.',
        );
      });
  }

  openBox() {
    this.setState({
      promptVisible: true,
    });
  }

  renderItem({item}) {
    if (item.full_name) {
      return (
        <View style={styles.list_item} key={item.id}>
          <Text style={styles.list_item_text}>{item.full_name}</Text>
          <Text style={styles.list_item_text}>{item.time_entered}</Text>
        </View>
      );
    }

    return (
      <View style={styles.list_item} key={item.id}>
        <Text style={styles.list_item_text}>{item.name}</Text>
        <Button
          title="Connect"
          color="#1491ee"
          style={styles.list_item_button}
          onPress={this.connect.bind(this, item.id)}
        />
      </View>
    );
  }

  onClick = () => {
    this.props.navigation.navigate('Dashboard');
  };

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
        <Text style={styles.pairText}>Pair with your band:</Text>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.btnText}>Connect to EpiBand</Text>
        </TouchableHighlight>
        <BottomButton onButtonPress={this.onClick} />
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
  button: {
    borderWidth: 1,
    borderRadius: 22,
    width: '50%',
    backgroundColor: '#000',
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    padding: 10,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  pairText: {
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
});

export default ConnectDevice;
