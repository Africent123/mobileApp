import React from "react";
import { View, Text, Dimensions } from "react-native";

const {width, height} = Dimensions.get("window")

export default class Review extends React.Component {
  navigationOptions = {
    style: {
      backgroundColor: "#28293D"
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: "#808080", height: 100/100 * height }}>
        <Text>Review</Text>
      </View>
    );
  }
}
