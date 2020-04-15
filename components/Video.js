import React, { Component } from "react";
import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  StatusBar,
  View
} from "react-native";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import Orientation from "react-native-orientation-locker";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { LogoSmall, ScreenIcon } from "../assets/Logo";

const { width, height } = Dimensions.get("window");

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: "contain",
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: true,
    landscape: false,
    skin: "custom",
    ignoreSilentSwitch: null,
    isBuffering: false,
    fullscreenOrientation: "landscape",
    showHideMedia: true
  };
  onLoad(data) {
    console.log("On load fired!");
    this.setState({ duration: data.duration });
  }

  componentDidMount() {
    // Orientation.unlockAllOrientations();
    // HideShow = () => {
    //   setInterval
    // }

    Orientation.addOrientationListener(this._orientationDidChange);
    showHideMediaControl = () => {
      setInterval(() => {
        this.setState({ showHideMedia: false });
        console.log("Hello after 2sec");
      }, 2000);
      console.log("Hello pressed me");
    };
  }

  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("Landscape Mode On");
    } else {
    }
  };

  hideShow() {
    setInterval();
  }


  onVideoEnd = () => {
    this.videoPlayer.seek(0);
    this.setState({currentTime: 0, paused: true });
}

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  fastForward = () => {
    this.player.seek(this.state.currentTime + 7);
    this.setState({currentTime: this.state.currentTime + 7})
  }

  fastBackward = () => {
    this.player.seek(this.state.currentTime - 7);
    this.setState({currentTime: this.state.currentTime - 7})
  }


  onForward(currentTime, duration) {
    if (currentTime + 7 > duration) {
        this.onVideoEnd();
    } else {
        let newTime = currentTime + 7;
        this.player.seek(newTime);
        this.setState({ currentTime: newTime });
    }
}

  onBuffer({ isBuffering }) {
    this.setState({ isBuffering });
    console.log("buffering ");
  }
  onPause() {
    this.setState({ paused: false });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    } else {
      return 0;
    }
  }



componentWillUnmount() {
    Orientation.lockToPortrait();
}

portraitMode = () => {
  this.setState({landscape: false})
  Orientation.lockToPortrait();
}

landScapeMode = () =>{
  this.setState({landscape: true})
  StatusBar.setHidden(true)
  Orientation.lockToLandscape()
}



// componentWillMount() {
//     StatusBar.setHidden(true);
//     Orientation.lockToLandscapeLeft();
// }
  renderSkinControl(skin) {
    const isSelected = this.state.skin == skin;
    const selectControls = skin == "native" || skin == "embed";
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            controls: selectControls,
            skin: skin
          });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? "bold" : "normal" }
          ]}
        >
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }
  // renderRateControl(rate) {
  //   const isSelected = this.state.rate == rate;
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         this.setState({ rate: rate });
  //       }}
  //     >
  //       <Text
  //         style={[
  //           styles.controlOption,
  //           { fontWeight: isSelected ? "bold" : "normal" }
  //         ]}
  //       >
  //         {rate}x
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // }
  renderResizeModeControl(resizeMode) {
    const isSelected = this.state.resizeMode == resizeMode;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ resizeMode: resizeMode });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? "bold" : "normal" }
          ]}
        >
          {resizeMode}FORWARD_DURATION
        </Text>
      </TouchableOpacity>
    );
  }
  renderVolumeControl(volume) {
    const isSelected = this.state.volume == volume;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ volume: volume });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? "bold" : "normal" }
          ]}
        >
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }
  renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
    const isSelected = this.state.ignoreSilentSwitch == ignoreSilentSwitch;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ ignoreSilentSwitch: ignoreSilentSwitch });
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? "bold" : "normal" }
          ]}
        >
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    );
  }
  renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            this.setState({ paused: !this.state.paused });
          }}
        >
          <Video
            ref={(videoPlayer) => {
              this.player = videoPlayer
            }}  
            source={{ uri: this.props.uri }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={this.onVideoEnd}
            repeat={true}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            width: 100/100 * width,
            flexDirection: "row",
            alignSelf: "center",
            bottom: (20 / 100) * height,
            position: "absolute",
            justifyContent: "space-between",
            paddingHorizontal: 10/100 * width
          }}
        >
          <TouchableOpacity
            onPress={this.fastBackward}
          >
            <Entypo
              name="controller-fast-backward"
              color="#B4B1B1"
              size={30}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>

          {this.state.paused && (
            <TouchableOpacity
              onPress={() => {
                this.setState({ paused: false });
              }}
            >
              <Entypo
                name="controller-play"
                color="#B4B1B1"
                size={30}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          )}
          {!this.state.paused && (
            <TouchableOpacity
              onPress={() => {
                this.setState({ paused: true });
              }}
            >
              <Ionicons
                name="md-pause"
                color="#B4B1B1"
                size={30}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={this.fastForward}
          >
            <Entypo
              name="controller-fast-forward"
              color="#B4B1B1"
              size={30}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end",
            bottom: (10 / 100) * height,
            position: "absolute",
            // justifyContent: "space-between",
            paddingHorizontal: 1
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.showHideMediaControl;
            }}
          >
            <MaterialIcons
              name="settings"
              color="#FFFFFF"
              size={30}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState(this.state.resizeMode === "cover" ? this.setState({ resizeMode: "contain" }) : this.setState({resizeMode: "cover"}));
            }}
          >
            <ScreenIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.state.landscape === false ? this.landScapeMode : this.portraitMode }
          >
            <MaterialIcons
              name="fullscreen-exit"
              color="#FFFFFF"
              size={30}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {/* <Text>{this.renderSkinControl("custom")}</Text> */}
              {/* <Text>{this.renderSkinControl("native")}</Text> */}
              {/* <Text>{this.renderSkinControl("embed")}</Text> */}
            </View>
            <View style={styles.generalControls} />
            {/* <View style={styles.rateControl}>
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(2.0)}
            </View> */}
            {/* <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>
            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl("cover")}
              {this.renderResizeModeControl("contain")}
              {this.renderResizeModeControl("stretch")}
            </View> */}
          </View>
          <View style={styles.generalControls}>
            {Platform.OS === "ios" ? (
              <View style={styles.ignoreSilentSwitchControl}>
                {this.renderIgnoreSilentSwitchControl("ignore")}
                {this.renderIgnoreSilentSwitchControl("obey")}
              </View>
            ) : null}
          </View>
          <View style={styles.trackingControls}>
            {this.state.paused && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ paused: false });
                }}
              >
            <Ionicons name="md-play" color="#808080" size={30} style={{marginTop: 14}}/>
              </TouchableOpacity>
            )}
            {!this.state.paused && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ paused: true });
                }}
              >
                <Ionicons name="md-pause" color="#808080" size={30} style={{margin: 14}}/>
              </TouchableOpacity>
            )}
            <View style={styles.progress}>
            <Slider
                style={{ width: (50 / 100) * width, height: 40 }}
                minimumValue={0}
                maximumValue={this.state.duration}
                minimumTrackTintColor="#01C851"
                maximumTrackTintColor="#808080"
                // onSlidingComplete={value => this.setState({ currentTime: value })}
                onValueChange={value => this.player.seek(value)}
                value={this.state.currentTime}
              />
              {/* <View
                style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
              />
              <View
                style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
              /> */}
            </View>

            <View style={styles.progress1}>
              {this.state.muted && (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ muted: false });
                  }}
                >
                  <Ionicons name="md-volume-off" color="#808080" size={30} style={{marginTop: 5}} />
                </TouchableOpacity>
              )}
              {!this.state.muted && (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ muted: true });
                  }}
                >
                  <MaterialIcons name="volume-up" color="#808080" size={30} style={{marginTop: 5}} />
                </TouchableOpacity>
              )}
              <Slider
                style={{ width: (25 / 100) * width, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#01C851"
                maximumTrackTintColor="#808080"
                onSlidingComplete={value => this.setState({ volume: value })}
                onValueChange={value => this.setState({ volume: value })}
                value={this.state.volume}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderNativeSkin() {
    const videoStyle =
      this.state.skin == "embed"
        ? styles.nativeVideoControls
        : styles.fullScreen;
    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={{ uri: this.props.uri }}
            style={videoStyle}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => {
              AlertIOS.alert("Done!");
            }}
            repeat={true}
            controls={this.state.controls}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderSkinControl("custom")}
              {this.renderSkinControl("native")}
              {this.renderSkinControl("embed")}
            </View>
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(2.0)}
            </View>
            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>
            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl("cover")}
              {this.renderResizeModeControl("contain")}
              {this.renderResizeModeControl("stretch")}
            </View>
          </View>
          <View style={styles.generalControls}>
            {Platform.OS === "ios" ? (
              <View style={styles.ignoreSilentSwitchControl}>
                {this.renderIgnoreSilentSwitchControl("ignore")}
                {this.renderIgnoreSilentSwitchControl("obey")}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
  render() {
    return this.state.controls
      ? this.renderNativeSkin()
      : this.renderCustomSkin();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controls: {
    flex: 1,
    width: (100 / 100) * width,
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: (0 / 100) * height
    // left: 4,
    // right: 4
  },
  trackingControls: {
    flexDirection: "row",
    paddingLeft: 10
    // justifyContent: "center"
  },
  progress: {
    // flex: 1,
    width: "50%",
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden"
  },
  progress1: {
    // flex: 1,
    width: 30/100 * width,
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden"
  },
  innerProgressCompleted: {
    height: 5,
    backgroundColor: "#01C851"
  },
  innerProgressRemaining: {
    height: 5,
    backgroundColor: "#2C2C2C"
  },
  generalControls: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden"
    // paddingBottom: 10
  },
  skinControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  rateControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  volumeControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  controlOption: {
    alignSelf: "center",
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});
