import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { get_profile_data } from "../../Actions/ProfileAction";
import CustomModal from "../../components/modal";
import EditName from "../../components/EditName";
import ChangePassword from "../../components/ChangePassword";

import Avater from "../../assets/profileAvi.png";
import { LogoSmall, CameraIcon } from "../../assets/Logo";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

class Profile extends Component {
  state = {
    namemodalVisible: "logoutModalVisible",
    namemodalEmail: "modalEmail",
    namemodalPassword: "modalPassword",
    text: "PlaceHolder",
    modalEmail: false,
    text2: "Placeholder",
    modalPassword: false,
    text3: "Placeholder",
    logout_Modal: false,
    ChangePassword_Modal: false,
    EditName_Modal: false,
    modalname: ""
  };

  async componentDidMount() {
    const id = this.props.state.Auth.token.userId;
    await this.props
      .get_profile_data(id)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _showmodal_logout = name => {
    this.setState({ logout_Modal: true, modalname: name });
  };

  cancelModal_logout = name => {
    this.setState({ logout_Modal: false, modalname: name });
  };

  _showmodal_changePassword = name => {
    this.setState({ ChangePassword_Modal: true, modalname: name });
  };

  cancelModal_changePassword = name => {
    this.setState({ ChangePassword_Modal: false, modalname: name });
  };

  _showmodal_EditName = name => {
    this.setState({ EditName_Modal: true, modalname: name });
  };

  cancelModal_EditName = name => {
    this.setState({ EditName_Modal: false, modalname: name });
  };

  changeText = text => {
    this.setState({ text: text });
  };

 

  render() {
    const { Profile } = this.props.state.Profile;
    console.log();
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10
            }}
          >
            <LogoSmall />
          </View>
          <View
            style={{
              width: (90 / 100) * width,
              height: (30 / 100) * height,
              backgroundColor: "#01C851",
              // justifyContent: "center",
              alignSelf: "center",
              borderRadius: 9,
              // flexDirection: "row",
              padding: 10
            }}
          >
            <View style={{ top: "8%", flexDirection: "row" }}>
              <Image
                source={Avater}
                style={{
                  width: (20 / 100) * width,
                  height: (10 / 100) * height,
                  borderRadius: 100,
                  marginLeft: 5
                }}
              />
              <TouchableOpacity
                style={{
                  width: (100 / 100) * width,
                  height: (15 / 100) * height,
                  position: "absolute",
                  top: "75%",
                  left: "20%"
                }}
              >
                <CameraIcon />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  marginHorizontal: 10,
                  top: "10%"
                }}
              >
                <Text style={styles.name}>{Profile.name}</Text>
                <Text style={styles.email}>{Profile.email}</Text>
              </View>
              <View style={{ top: "10%" }}>
                <TouchableOpacity>
                  <EditName
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.EditName_Modal}
                    TextStyle={styles.name}
                    placeholder={this.state.placeholder}
                    nameText={this.state.text2}
                    changeText={this.changeText}
                    email={Profile.email}
                    word={"Edit"}
                    ModalTitle={"Edit"}
                    value={this.state.namemodalEmail}
                    setModal={() => this._showmodal_EditName("m2")}
                    name="email"
                    visibilitystatus={this.state.EditName_Modal}
                    cancelModal={() => this.cancelModal_EditName()}
                    openname={this.state.modalname}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 45,
                paddingHorizontal: (10 / 100) * width
              }}
            >
              <View>
                <Text style={styles.totalCount}>450</Text>
                <Text style={styles.totalCountTitle}>Total Downloaded</Text>
              </View>
              <View>
                <Text style={styles.totalCount}>45</Text>
                <Text style={styles.totalCountTitle}>Total Stream</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: (90 / 100) * width,
              height: (50 / 100) * height,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              justifyContent: "space-between",
              alignSelf: "center",
              borderRadius: 9,
              flexDirection: "column",
              marginTop: (4 / 100) * height,
              padding: (5 / 100) * height
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Ionicons name="md-bookmark" size={30} color="#FFFFFF" />
                <Text style={styles.editText}>Bookmarked Movies</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={this._retrieveData}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons name="md-analytics" size={30} color="#FFFFFF" />
                <Text style={styles.editText}>Analytics</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => this.props.navigation.navigate("Download")}
              >
                <Ionicons name="md-keypad" size={30} color="#FFFFFF" />
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <ChangePassword
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.ChangePassword_Modal}
                  TextStyle={styles.editText}
                  placeholder={this.state.placeholder}
                  nameText={this.state.text2}
                  changeText={this.changeText}
                  word={"Change password"}
                  ModalTitle={"Change password"}
                  value={this.state.namemodalEmail}
                  setModal={() => this._showmodal_changePassword("m2")}
                  name="m2"
                  visibilitystatus={this.state.ChangePassword_Modal}
                  cancelModal={() => this.cancelModal_changePassword()}
                  openname={this.state.modalname}
                />
                <TouchableOpacity>
                  <MaterialIcons name="mode-edit" size={30} color="#E5E5E5" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => this.props.navigation.navigate("Download")}
              >
                <MaterialIcons name="email" size={30} color="#FFFFFF" />
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <EditName
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.EditName_Modal}
                  TextStyle={styles.editText}
                  placeholder={this.state.placeholder}
                  nameText={this.state.text2}
                  changeText={this.changeText}
                  word={"Change e-mail"}
                  ModalTitle={"Change e-mail"}
                  value={this.state.namemodalEmail}
                  setModal={() => this._showmodal_EditName("m2")}
                  name="m2"
                  visibilitystatus={this.state.EditName_Modal}
                  cancelModal={() => this.cancelModal_EditName()}
                  openname={this.state.modalname}
                />
                <Text style={styles.editText}>Change e-mail</Text>
                <TouchableOpacity>
                  <MaterialIcons name="mode-edit" size={30} color="#E5E5E5" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={30}
                  color="#FFFFFF"
                />
                <CustomModal
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.logout_Modal}
                  TextStyle={styles.editText}
                  placeholder={this.state.placeholder}
                  nameText={this.state.text2}
                  changeText={this.changeText}
                  word={"Logout"}
                  ModalTitle={"Logout"}
                  value={this.state.namemodalEmail}
                  setModal={() => this._showmodal_logout("m2")}
                  name="m2"
                  visibilitystatus={this.state.logout_Modal}
                  cancelModal={() => this.cancelModal_logout()}
                  openname={this.state.modalname}
                />
              </TouchableOpacity>
            </View>
          </View>
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
  name: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    marginLeft: 2
  },
  email: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 14,
    marginLeft: 2,
    marginTop: 5
  },
  totalCountTitle: {
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 16
  },
  totalCount: {
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 16
  },
  editText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    color: "#FFFFFF",
    paddingHorizontal: (5 / 100) * width
  }
});

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, {get_profile_data})(withNavigation(Profile));
