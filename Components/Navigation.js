import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//Routes
import Splash from '../Containers/Splash';
import ConnectDevice from '../Containers/ConnectDevice';
import Dashboard from '../Containers/Dashboard';
import Choice from '../Containers/Choice';
import Select from '../Containers/Select';
import AccountInfo from '../Containers/Register/AccountInfo';
import AddRelative from '../Containers/Register/AddRelative';
import AddConsultant from '../Containers/Register/AddConsultant';
import Questions from '../Containers/Register/Questions';
import FinishingUp from '../Containers/Register/FinishingUp';
import Login from '../Containers/Login/Login';
import RetrieveAccount from '../Containers/Login/RetrieveAccount';

const LoginStack = createStackNavigator(
  {
    Login: {screen: Login},
    Retieve: {screen: RetrieveAccount},
  },
  {
    initialRouteName: 'Login',
  },
);

const RegisterStack = createStackNavigator(
  {
    '1': {screen: AccountInfo},
    '2': {screen: AddRelative},
    '3': {screen: AddConsultant},
    '4': {screen: Questions},
    '5': {screen: FinishingUp},
  },
  {
    initialRouteName: '1',
    headerMode: 'none',
  },
);

const AppNavigator = createStackNavigator(
  {
    Choice: {
      screen: Choice,
    },
    Select: {
      screen: Select,
    },
    Login: {
      screen: LoginStack,
    },
    Register: {
      screen: RegisterStack,
    },
    Connect: {
      screen: ConnectDevice,
    },
    Dashboard: {
      screen: Dashboard,
    },
  },
  {
    initialRouteName: 'Connect',
    headerMode: 'none',
  },
);

const SplashNavigator = createSwitchNavigator(
  {
    Splash: {screen: Splash},
    App: {screen: AppNavigator},
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

export default createAppContainer(SplashNavigator);
