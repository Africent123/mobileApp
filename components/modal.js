import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions
} from "react-native";
import { Button } from "native-base";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { LogoutAction } from "../Actions/LoginAction";

import { DeadIcon } from "../assets/Logo";

const { width, height } = Dimensions.get("window");

class CustomModal extends React.Component {
  _Logout = () => {
    this.props.LogoutAction();
    this.props.navigation.navigate("Login");
  };

  
  
  render() {
    
    const {
      animationType,
      visible,
      transparent,
      ViewStyle,
      TextStyle,
      setModal,
      changeText,
      icon,
      visibilitystatus,
      name,
      ModalTitle,
      openname,
      cancelModal,
      word,
      onSubmit
    } = this.props;
    return (
      <View style={{ width: (100 / 100) * width, ...ViewStyle }}>
        <Modal
          animationType={animationType}
          transparent={true}
          visible={
            visibilitystatus === true && name === openname ? true : false
          }
        >
          <View
            style={{
              marginTop: 30,
              padding: 25,
              top: (25 / 100) * height,
              justifyContent: "center",
              alignSelf: "center",
              width: (90 / 100) * width,
              height: (35 / 100) * height,
              padding: 15,
              borderRadius: 10
            }}
          >
            <View
              style={{
                flex: 1,
                height: (10 / 100) * height,
                backgroundColor: "#808080",
                justifyContent: "center",
                borderRadius: 8
              }}
            >
              <View style={{ alignItems: "center" }}>
                <DeadIcon />
              </View>
              <Text style={styles.logoutAlert}>Do you want to logout?</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <View style>
                  <Button
                    style={{
                      ...styles.ButtonSignIn,
                      backgroundColor: "#FFFFFF"
                    }}
                    onPress={cancelModal}
                  >
                    <Text
                      style={{ ...styles.ButtonSigninText, color: "#01C851" }}
                    >
                      No{" "}
                    </Text>
                  </Button>
                </View>
                <View>
                  <Button style={styles.ButtonSignIn} onPress={this._Logout}>
                    <Text style={styles.ButtonSigninText}> Yes </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={name => {
            setModal();
          }}
        >
          {icon && (
            <Icon
              name="md-create"
              size={30}
              color="#CCC4C4"
              style={{ width: "100%" }}
            />
          )}
          {word && <Text style={styles.Text2}>{word}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = {
  Text2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    color: "#FFFFFF",
    paddingHorizontal: (5 / 100) * width
    // textAlign: "center"
  },
  logoutAlert: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFF",
    margin: 5
  },
  ButtonSignIn: {
    width: (35 / 100) * width,
    height: (6 / 100) * height,
    backgroundColor: "#01C851",
    borderRadius: 10,
    margin: 10,
    padding: 15
  },
  ButtonSigninText: {
    flex: 1,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "sans-serif"
  },
  titleStyle: {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,
    color: "#2F2F39"
  }
};

const mapStateToProps = state => {
  return {
    Profile: state.Profile,
    state: state
  };
};
export default connect(
  mapStateToProps,
  { LogoutAction }
)(withNavigation(CustomModal))
