import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from "react-native";
import axios from '../../axios-tmdb';
import {Badge, Rating} from "react-native-elements";

class MovieDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
        }
    };

    state = {
        movie: null,
        error: null
    };

    componentWillMount = () => {
        this.fetchData(this.props.navigation.state.params.id);
    };

    fetchData = (id) => {
        axios.get('/movie/' + id)
            .then(response => {
                this.setState({movie: response.data})
            })
            .catch(error => {
                this.setState({error: error})
            });
    };

    render () {
        let textInfo = null;
        let image = null;
        let genres = null;
        if (this.state.movie) {
            genres = this.state.movie.genres.map(genre => {
                return <Badge key={genre.id} value={genre.name} style={styles.badge} />
            });

            textInfo = (
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.props.navigation.state.params.title}</Text>
                    <View style={styles.badgeContainer}>
                        {genres}
                    </View>
                    <Rating
                        style={styles.stars}
                        imageSize={15}
                        readonly
                        startingValue={this.state.movie.vote_average/2}
                    />
                    <Text style={styles.description}>{this.state.movie.overview}</Text>
                </View>);

            image = (
                <Image
                    style={styles.image}
                    source={{ uri: 'https://image.tmdb.org/t/p/w342/' + this.state.movie.poster_path }}
                />);
        }
        return (
            <ScrollView>
                {image}
                {textInfo}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
        infoContainer: {
            marginBottom: 5,
            marginRight: 5,
            marginTop: 5,
            marginLeft: 5
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 5
        },
        image: {
            height: 350,
            marginBottom: 5
        },
        //container style wrapper
        badgeContainer: {
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection:'row',
            justifyContent: 'space-around',
            marginBottom: 5
        },
        badge: {
            marginRight: 3
        },
        stars: {
            marginBottom: 5
        },
        overview: {
            paddingRight: 3,
            paddingLeft: 3
        }
    }
);

export default MovieDetails;