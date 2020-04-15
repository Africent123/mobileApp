import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ProgressBarAndroid,
  ScrollView
} from "react-native";

import { Header } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectDownloadPercentage, selectDownloadWithoutPercentage, selectAllDownload } from "../../Selectors/DownloadSelectors";

const poster = require("../../assets/posters/IMG1.jpg");

class Download extends React.Component {
  
  handleDownload(uri, filename){
    saveFile()
    let task = RNBackgroundDownloader.download({
      id: 'file123',
      url: uri,
      destination: `${RNBackgroundDownloader.directories.documents}/file.zip`
    }).begin((expectedBytes) => {
      console.log("in mb", Math.floor(expectedBytes/1024/1024)
      )
      console.log(`Going to download ${expectedBytes} bytes!`);
    }).progress((percent) => {
      console.log(`Downloaded: (${percent * 100}%`);
      console.log(DownloadTask)
    }).done(() => {
      console.log('Download is done!');
    }).error((error) => {
      console.log('Download canceled due to error: ', error);
    });
  }
  render() {
    let color = (this.props.downloadwithOutPercentage >= 0.9) ? "#01C851" : "#CC1D1D" 
    const Movie = this.props.navigation.getParam("MovieDownloads");
    // console.log('the big movie', this.props.all_download)
    return (
      <View style={styles.Downloadcontainer}>
        <ScrollView>
          <View style={styles.posterAndProgressBarContainer}>
            <View style={styles.PosterContainer}>
              <Image
                source={{
                  uri: `http://kannywoodtv.live/api/files/${Movie.thumbnail}`
                }}
                style={{ width: 65.07, height: 96.69, borderRadius: 5 }}
              />
            </View>
            <View style={styles.ProgressBarContainer}>
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "#C4C4C4"
                }}
              >
                {Movie.MovieName}
              </Text>
              <ProgressBarAndroid
                color={color}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.props.downloadwithOutPercentage}
                animating={true}
              />
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  color: "#C4C4C4",
                }}
              >
                {this.props.downloadwithPercentage}%
              </Text>
            </View>
          </View>
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Downloadcontainer: {
    flex: 1,
    backgroundColor: "#27293D"
  },
  posterAndProgressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  PosterContainer: {
    margin: 5,
    padding: 15
  },
  ProgressBarContainer: {
    width: "70%",
    justifyContent: "center",
    margin: 5,
    padding: 15
  }
});

const mapStateToProps = createStructuredSelector({

  downloadwithPercentage: selectDownloadPercentage,
  downloadwithOutPercentage: selectDownloadWithoutPercentage,
  all_download: selectAllDownload
})

export default connect(mapStateToProps)(Download)
