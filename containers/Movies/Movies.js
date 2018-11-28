import React, {Component} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import { SearchBar } from 'react-native-elements'
import {colors} from "../../shared/Styles";
import MovieItem from "../../components/MovieItem/MovieItem";
import {OptimizedFlatList} from "react-native-optimized-flatlist";

class Movies extends Component {
    static navigationOptions = {
        title: 'Movies',
    };

    state = {
        name: null,
        typingTimeout: 0,
        page: 1,
        neverTyped: true
    };

    onChangeMovieSearchHandler = (name) => {

        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            name: name,
            page: 1,
            typingTimeout: setTimeout(() => {
                this.setState({neverTyped: false});
                if (this.props.movies.length > 0) {
                    this.props.onClearMovies();
                }
                this.props.onFetchMovies(name, 1);
            }, 1000)
        });
    };

    onHandleMoreMovies = () => {
        if (this.state.page < this.props.totalPages) {
            this.setState({page: this.state.page + 1}, () => {
                this.props.onFetchMovies(this.state.name, this.state.page);
            });
        }
    };

    render() {
        const movies = (
            <OptimizedFlatList
                data={this.props.movies}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieDetails', {
                        id: item.id,
                        title: item.title
                    })}>
                        <MovieItem title={item.title}
                                   image={item.poster_path}
                                   stars={item.vote_average/2}
                                   description={item.overview}
                        />
                    </TouchableOpacity>
                )}
                onEndReached={this.onHandleMoreMovies}
                onEndReachedThreshold={0.01}
                ListFooterComponent={() => this.props.loading ? <ActivityIndicator animating size="large" /> : null}
                ListEmptyComponent={() => <Text style={styles.textEmptyList}> {this.props.loading ? null : (this.state.neverTyped ? 'Search for movies' : 'No result for your search')}</Text>}
                removeClippedSubviews={true}
            />
        );

        return (
            <View style={styles.container}>
                <SearchBar
                    containerStyle={{backgroundColor: colors.background_dark}}
                    leftIconContainerStyle={{backgroundColor: 'grey'}}
                    lightTheme
                    onChangeText={this.onChangeMovieSearchHandler}
                    placeholder='Search for movies...'
                    clearIcon={{ color: 'grey' }}
                />
                <View style={styles.lists}>
                    {movies}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: colors.background_dark,
        },
        lists: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        textEmptyList: {
            fontSize: 12,
            fontWeight: 'bold',
            color: colors.text_dark,
            textAlign: 'center',
            marginTop: 10
        }
    }
);

const mapStateToProps = (state) => {
    return {
        movies: state.movies.movies,
        totalPages: state.movies.maxPage,
        loading: state.movies.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMovies: (name, page) => dispatch(actions.fetchMovies(name, page)),
        onClearMovies: () => dispatch(actions.clearMovies())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);