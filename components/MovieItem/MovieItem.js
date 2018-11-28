import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {colors} from "../../shared/Styles";
import {Rating} from "react-native-elements";

class MovieItem extends React.PureComponent {

    render () {
        return (
            <View style={styles.listItem}>
                <View style={styles.image}>
                    <Image
                        style={{width:100,height:100}}
                        source={{ uri: 'https://image.tmdb.org/t/p/w92/' + this.props.image }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Rating
                        imageSize={15}
                        readonly
                        startingValue={this.props.stars}
                    />
                    <Text style={styles.description}>{this.props.description.length > 100 ? this.props.description.slice(0, 100) + '...' : this.props.description}</Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create(
    {
        listItem: {
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#d6d7da',
            backgroundColor: colors.tertiary,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 18,
            paddingRight: 16,
            marginLeft: 14,
            marginRight: 14,
            marginTop: 5,
            marginBottom: 5,
            flex: 1,
            flexDirection:'row',
        },
        infoContainer: {
            flex: 2,
            flexDirection:'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 2
        },
        stars: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        description: {
            marginTop: 7,
        },
        image: {
            flex: 1,
            flexDirection:'row',
            alignItems:'center',
            marginRight: 10
        }
    }
);

export default MovieItem;