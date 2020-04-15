import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { withNavigation } from "react-navigation";

const { width, height } = Dimensions.get("window");

class MyCarousel extends Component {
  _keyExtractor = (item, index) => {
    return item._id;
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.fileID}
        style={{
          width: (42 / 100) * width,
          height: (18 / 100) * height,
          margin: 1,
          marginBottom: 10,
          padding: 10
        }}
        onPress={() =>
          this.props.navigation.navigate("MovieDetail", {
            Detail: item
          })
        }
      >
        <Image
          source={{
            uri: `http://kannywoodtv.live/api/files/${
              item.thumbnail
            }`
          }}
          style={{
            width: (40 / 100) * width,
            height: (18 / 100) * height,
            borderRadius: 10
          }}
          key={item.fileID}
        />
      </TouchableOpacity>
    );
  };

  _renderItemBig = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.fileID}
        style={{ width: (50 / 100) * width, margin: 2 }}
        onPress={() =>
          this.props.navigation.navigate("MovieDetail", {
            Detail: item
          })
        }
      >
        <Image
          source={{
            uri: `http://kannywoodtv.live/api/files/${
              item.thumbnail
            }`
          }}
          style={{
            width: (50 / 100) * width,
            height: 200,
            borderRadius: 10
          }}
        />
      </TouchableOpacity>
    );
  };
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ maxHeight: (60 / 100) * height }}>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.data}
              sliderWidth={width}
              itemWidth={width}
              style={{ margin: 0, padding: 0, flex: 1 }}
            />
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", width: width }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Trending Movies</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>New Releases</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Hausa Movies</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItemBig}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Hausa Action</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
            <View style={{ width: (100 / 100) * width }}>
              <Text style={styles.allCategoryText}>All Catagories</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Kannywood Continantal</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Kannywood Series</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Kannywood Documentry</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItemBig}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Kannywood Programs</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Cultural</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Up Coming</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Kannywood Drama</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItemBig}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sliderTitle}>Kannywood Hausa Movies</Text>
              <FlatList
                data={this.props.data}
                extraData={this.props.data}
                horizontal={true}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sliderTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontStyle: "normal",
    padding: 15
  },
  allCategoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "center"
  }
});

export default withNavigation(MyCarousel);
