import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { MoviesAction } from "../../Actions/MoviesAction";
import { createStructuredSelector } from "reselect";
import { selectAllMovies } from "../../Selectors/MovieSelector";
import { LogoSmall } from "../../assets/Logo";

const { width, height } = Dimensions.get("window");

class MoviesTab extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    var data = await this.props.MoviesAction();
  }
  _keyExtractor = (item, index) => {
    return item._id;
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.movieCard}>
        <View style={{flexDirection: "row"}}>
        <Image
          style={styles.MoviePoster}
          source={{
            uri: `http://kannywoodtv.live/api/files/${item.thumbnail}`
          }}
        />
          <View style={{flexDirection: "column", marginLeft: 5}}>
        <Text style={styles.MovieTitle}>{item.MovieName}</Text>
        <Text style={styles.MovieCategory}>{item.category}</Text>
        <Text style={styles.MovieCategory}>Rating: 4.5</Text>
        </View>
        </View>
        <View style={{alignSelf: "flex-end", margin: 5}}>
              <TouchableOpacity>
                <Icon name="md-bookmark" size={30} color="rgba(255, 255, 255, 0.6)" />
              </TouchableOpacity>
            </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
         <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <LogoSmall />
        </View>
        <View>
          <FlatList
            data={this.props.Movies}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal={false}
            numColumns={1}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080"
  },

  MoviePoster: {
    width: (20 / 100) * width,
    height: (10 / 100) * height,
    borderRadius: 10,
    // margin: 15,
    alignSelf: "center"
  },
  MovieTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    margin: 5
  },
  MovieCategory: {
    fontStyle: "normal",
    fontSize: 12,
    fontWeight: "normal",
    color: "#FFFFFF",
    margin: 2
  },
  movieCard: {
    width: (95 / 100) * width,
    height: (10 / 100) * height,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 10,
    margin: 5
  }
});
const mapStateToProps = createStructuredSelector({
  Movies: selectAllMovies
});
export default connect(
  mapStateToProps,
  { MoviesAction }
)(withNavigation(MoviesTab));
