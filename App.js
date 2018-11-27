import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'remote-redux-devtools';
import moviesReducer from "./store/reducers/movies";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    movies: moviesReducer,
});


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Noufel is killing it</Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
