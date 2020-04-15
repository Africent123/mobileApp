import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {connect} from "react-redux"
import { MoviesAction } from "../../Actions/MoviesAction";
import { createStructuredSelector } from "reselect";
import { selectAllMovies } from "../../Selectors/MovieSelector";

import {
  Item,
  Input,
  Picker
} from "native-base";

import AntDesign from "react-native-vector-icons/AntDesign";


import { LogoSmall } from "../../assets/Logo";
import Carousel  from "../../components/Carousel"
const { width, height } = Dimensions.get("window");
//width = Dimensions * 0.9;

 class Movies extends React.Component {
  state = {
    search: "",
    selected: "key1"
  };
  static navigationOptions = {
    header: null
  };

  onValueChange = value => {
    this.setState({
      selected: value
    });
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
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("MovieDetail", { Detail: item });
          }}
        >
          <Image
            style={styles.MoviePoster}
            source={{
              uri: `https://kannywoodtv.live/api/files/${item.thumbnail}`
            }}
          />
        </TouchableOpacity>
        <Text style={styles.MovieTitle}>{item.MovieName}</Text>
        <View style={{ justifyContent: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{...styles.MovieCategory, margin: 40}}>{item.category}</Text>
            <AirbnbRating
              type="star"
              ratingCount={3}
              size={10}
              reviews={[]}
              ratingBackgroundColor={"#27293D"}
              onFinishRating={this.ratingCompleted}
            />
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { search } = this.state;
   const data = this.props.Movies
    return (
      <View style={styles.container}>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <LogoSmall />
        </View>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Item style={styles.InputStyle}>
            <Input
              style={{ color: "#FFFFFF", backgroundColor: "#01C851" }}
              placeholder="Search....."
              placeholderTextColor="#FFFFFF"
              onChangeText={text => this.setState({ search: text })}
              value={search}
              name={search}
            />
            <TouchableOpacity>
              <AntDesign active name="search1" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </Item>
          <Picker
            selectedValue={this.state.language}
            style={{ height: 50, width: 100, color: "#FFFFFF", fontWeight: "bold" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            <Picker.Item label="Movies" value="movies" />
            <Picker.Item label="Series" value="series" />
            <Picker.Item label="Documentary" value="documentary" />
          </Picker>
        </View>
        <ScrollView>
            <Carousel data={data}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080"
  },
  InputStyle: {
    width: (60 / 100) * width,
    height: (7 / 100) * height,
    backgroundColor: "#01C851",
    borderRadius: 10,
    color: "#FFFFFF",
    margin: 5,
    padding: 10
  }
});


const mapStateToProps = createStructuredSelector({
  Movies: selectAllMovies
});
export default connect(
  mapStateToProps,
  { MoviesAction }
)(Movies)