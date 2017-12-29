import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Navigation from './router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={createStore(reducers)} >
        <View style={{flex: 1}}>
            <Navigation />
        </View>
      </Provider>
    );
  }
}

