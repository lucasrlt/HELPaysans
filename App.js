import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { StyleSheet, Text, View, AsyncStorage, Image, Platform} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { persistStore } from 'redux-persist';

import AuthScreen from './screens/AuthScreen';
import PlanningScreen from './screens/PlanningScreen';
import SettingsScreen from './screens/SettingsScreen';
import SOSConfigScreen from './screens/SOSConfigScreen';
import SOSPickerScreen from './screens/SOSPickerScreen';
import SOSTimeScreen from './screens/SOSTimeScreen';
import SOSScreen from './screens/SOSScreen';
import SOSEndConfigScreen from './screens/SOSEndConfigScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  constructor() {
    super();
    
    this.state = { rehydrated: false };
  }

  componentWillMount() {
      persistStore(store, { storage: AsyncStorage, whitelist: ['sos', 'user'] }, () => {
        this.setState({ rehydrated: true });
      });
  }

  render() {

    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          planning: { 
            screen: StackNavigator({ 
              main: { screen : PlanningScreen } 
            }),
          },
          sos: { 
            screen: StackNavigator({
              sosMain: { screen: SOSScreen },
              sosPicker: { screen: SOSPickerScreen },
              sosConfig: { screen: SOSConfigScreen },
              sosTime: { screen: SOSTimeScreen },
              sosEndConfig: { screen: SOSEndConfigScreen },
            })
          },
          settings: {
            screen: StackNavigator({
              main: { screen: SettingsScreen },
            }),
          }
        }, {
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          },
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          animationEnabled: Platform.OS !== 'android',
          lazy: false,
        })},
    }, { 
      navigationOptions: {
        tabBarVisible: false,
        swipeEnabled:false,
        animationEnabled: Platform.OS !== 'android',
      },
      lazy: false,
    });

    if (!this.state.rehydrated) {
      return (
        <View />
      )
    }
    return (
        <Provider store={store}>
          <MainNavigator />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
