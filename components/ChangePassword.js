import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import { Button, Form, Item, Input, Label } from "native-base";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { LogoutAction } from "../Actions/LoginAction";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Change_password } from "../Actions/ProfileAction";

import Avater from "../assets/profileAvi.png";

import { DeadIcon } from "../assets/Logo";

const { width, height } = Dimensions.get("window");

class ChangePassword extends React.Component {
  constructor(props) {
    super();
    this.state = {
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      Loading: false,
      showPassword: true
    };
  }

  visiblePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  _ChangePassword = () => {
    const id = this.props.state.Auth.token.userId;
    const { oldPassword, newPassword, confirmPassword } = this.state;
    this.setState({ Loading: true });
    this.props
      .Change_password(id, {
        oldPassword,
        newPassword,
        confirmPassword
      })
      .then(response => {
        this.setState({ Loading: false });
        if (response.success) {
          this.props.cancelModal()
          console.log("Changed");
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert("An error occured try again");
      });
  };
  render() {
    const {
      animationType,
      visible,
      transparent,
      ViewStyle,
      TextStyleDeadIcon,
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
              top: (30 / 100) * height,
              justifyContent: "center",
              alignSelf: "center",
              width: (90 / 100) * width,
              height: (40 / 100) * height,
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
                borderRadius: 8,
                flexDirection: "column"
              }}
            >
              <View style={{ width: "80%", alignSelf: "center" }}>
              {this.state.Loading && (
                  <ActivityIndicator size="large" color="#01C851" />
                )}
                <Item>
                  <Input
                    onChangeText={text => this.setState({ oldPassword: text })}
                    secureTextEntry={this.state.showPassword}
                    placeholder="Current Password"
                  />
                </Item>
                <Item>
                  <Input
                    onChangeText={text => this.setState({ newPassword: text })}
                    secureTextEntry={this.state.showPassword}
                    placeholder="New Password"
                  />
                  <TouchableOpacity onPress={this.visiblePassword}>
                    <EvilIcons active name="eye" size={30} color="#FFFFFF" />
                  </TouchableOpacity>
                </Item>
                <Item last>
                  <Input
                    onChangeText={text =>
                      this.setState({ confirmPassword: text })
                    }
                    secureTextEntry={this.state.showPassword}
                    placeholder="Confirm Password"
                  />
                  <TouchableOpacity onPress={this.visiblePassword}>
                    <EvilIcons active name="eye" size={30} color="#FFFFFF" />
                  </TouchableOpacity>
                </Item>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <View style>
                  <Button
                    disabled={this.state.Loading}
                    style={{
                      ...styles.ButtonSignIn,
                      backgroundColor: "#808080"
                    }}
                    onPress={cancelModal}
                  >
                    <Text
                      style={{ ...styles.ButtonSigninText, color: "#01C851" }}
                    >
                      Cancel{" "}
                    </Text>
                  </Button>
                </View>
                <View>
                  <Button
                    disabled={this.state.Loading}
                    style={styles.ButtonSignIn}
                    onPress={this._ChangePassword}
                  >
                    <Text style={styles.ButtonSigninText}>Save</Text>
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
  { Change_password }
)(ChangePassword);
