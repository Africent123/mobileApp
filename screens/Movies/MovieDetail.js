import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Tab, Tabs, Button, Left, Right } from "native-base";
import axios from "axios";
import About from "../Movies/AboutMovie";
import Cast from "../Movies/Cast";
import Review from "../Movies/Review";
import VideoPlayer from "../../components/Video";
import { LogoSmall } from "../../assets/Logo";
import { DownloadAction, ALL_DOWNLOAD } from "../../Actions/DownloadAction";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

saveFile = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permission granted");
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

class MovieDetail extends React.Component {
  state = {
    mute: false,
    fullScreen: false,
    shouldPlay: true
  };

  handlePlayAndPause = () => {
    this.setState(prevState => ({
      shouldPlay: !prevState.shouldPlay
    }));
  };

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute
    }));
  };
  handleRef = ref => {
    this.player = ref;
  };

  render() {
    const Movie = this.props.navigation.getParam("Detail");
    const movieUri = `http://kannywoodtv.live/api/files/${Movie.filename}`;
    const filename = Movie.filename;
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <LogoSmall />
        </View>
        <View style={{ height: 0.5 * Dimensions.get("window").height }}>
          <VideoPlayer uri={movieUri} />
        </View>
        <View style={styles.BtnContainer}>
          <View
            style={{
              flexDirection: "row",
              flex: 2,
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#FFFFFF" }}
              >
                {Movie.MovieName}
              </Text>
              <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                {Movie.category}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Icon name="md-bookmark" size={30} color="#C4C4C4" />
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        <View style={styles.NavStyle}>
          <Tabs tabBarUnderlineStyle={{ backgroundColor: "#01C851" }}>
            <Tab
              heading="About"
              tabStyle={{ backgroundColor: "#999999" }}
              textStyle={{
                color: "#fff",
                fontWeight: "normal",
                fontStyle: "normal",
                fontSize: 16
              }}
              activeTabStyle={{ backgroundColor: "#999999" }}
              activeTextStyle={{
                color: "#01C851",
                fontWeight: "normal",
                fontStyle: "normal",
                fontSize: 16
              }}
            >
              <About details={Movie} />
            </Tab>
            <Tab
              heading="Cast"
              tabStyle={{ backgroundColor: "#999999" }}
              textStyle={{
                color: "#fff",
                fontWeight: "normal",
                fontStyle: "normal",
                fontSize: 16
              }}
              activeTabStyle={{ backgroundColor: "#999999" }}
              activeTextStyle={{
                color: "#01C851",
                fontWeight: "normal",
                fontStyle: "normal",
                fontSize: 16
              }}
            >
              <Cast />
            </Tab>
            <Tab
              heading="Review"
              tabStyle={{ backgroundColor: "#999999" }}
              textStyle={{
                color: "#fff",
                fontWeight: "normal",
                fontStyle: "normal",
                fontSize: 16
              }}
              activeTabStyle={{ backgroundColor: "#999999" }}
              activeTextStyle={{
                color: "#01C851",
                fontWeight: "normal",
                fontStyle: "normal",
                fontSize: 16
              }}
            >
              <Review />
            </Tab>
          </Tabs>
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
  ImageBackground: {
    flex: 2,
    width: "100%",
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0) 0%, #000000 100%)"
  },
  TitleContainer: {
    flexDirection: "row",
    top: "30%",
    left: 21,
    justifyContent: "space-between"
  },
  TitleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    fontStyle: "normal"
  },
  TitleText2: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal"
  },
  BtnContainer: {
    flexDirection: "row",
    margin: 10,
    paddingHorizontal: 5
  },
  BtnStream: {
    width: 150,
    height: 53,
    backgroundColor: "#01C851",
    borderRadius: 10,
    margin: 15
  },
  BtnDownload: {
    width: 150,
    height: 53,
    borderRadius: 10,
    margin: 15
  },
  BtnText: {
    flex: 1,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal"
  },
  NavStyle: {
    flex: 1,
    backgroundColor: "#999999"
  }
});
const mapStateToProps = state => {
  return {
    download: state.Download
  };
};

export default connect(
  mapStateToProps,
  { DownloadAction, ALL_DOWNLOAD }
)(withNavigation(MovieDetail));
