import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import moviesReducer from "./store/reducers/movies";
import {Provider} from "react-redux";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation';
import Movies from './containers/Movies/Movies';
import {composeWithDevTools} from "redux-devtools-extension";
import MovieDetails from "./containers/MovieDetails/MovieDetails";

const rootReducer = combineReducers({
    movies: moviesReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator(
    {
        Movies: Movies,
        MovieDetails: MovieDetails
    },
    {
        initialRouteName: "Movies"
    }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
