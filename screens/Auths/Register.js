import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { withNavigation } from "react-navigation";
import { CheckBox } from "react-native-elements";
import { Form, Button, Item, Input } from "native-base";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import { Logo } from "../../assets/Logo";

import { connect } from "react-redux";
import { RegistrationAction } from "../../Actions/RegistrationAction";

const { width, height } = Dimensions.get("window");

class Register extends Component {
  state = {
    checked: false,
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
    showPassword: true
  };

  checkedbox = () => {
    if (!this.state.checked) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  };

  visiblePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onSubmit = async () => {
    const { name, email, password, password2, phoneNumber } = this.state;
    let data = { name, email, password, password2, phoneNumber };
    await this.props
      .RegistrationAction(data)
      .then(result => {
        console.log(result.message, "Login Screen");
        if (result.success) {
          this.refs.toast.shadowRoot("Sign up successfully");
          this.props.navigation.navigate("Login");
        } else {
          let error = [];
          Object.keys(result.message).length > 0 &&
          typeof result.message === "object"
            ? Object.keys(result.message).map(message => {
                error.push(result.message[message]);
              })
            : error.push(result.message);
          alert(error);
        }
      })
      .catch(error => {
        console.log(Object.keys(result.message));
        alert("Incorrect password or email address");
        // this.setState({ password: "" });
      });
  };

  render() {
    const { name, email, password, password2, phoneNumber } = this.state;
    return (
      <View style={styles.Container}>
        <View style={{ top: (10 / 100) * height }}>
          <Logo />
        </View>
        <View style={styles.FormContainer}>
          <Form>
            <View>
              <Item style={styles.InputStyle}>
                <MaterialIcons
                  active
                  name="person-outline"
                  size={20}
                  color="#FFFFFF"
                />
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "#FFFFFF",
                    margin: 5
                  }}
                />
                <Input
                  style={{color: "#FFFFFF"}}
                  placeholder="Name"
                  style={styles.InputStyle}
                  placeholderTextColor="#FFFFFF"
                  returnKeyLabel="next"
                  keyboardType={"default"}
                  onChangeText={text => this.setState({ name: text })}
                  value={name}
                />
              </Item>

              <Item style={styles.InputStyle}>
                <Fontisto active name="email" size={20} color="#FFFFFF" />
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "#FFFFFF",
                    margin: 5
                  }}
                />
                <Input
                  style={{color: "#FFFFFF"}}
                  placeholder="Email"
                  style={styles.InputStyle}
                  placeholderTextColor="#FFFFFF"
                  textContentType="emailAddress"
                  keyboardType={"email-address"}
                  onChangeText={text => this.setState({ email: text.trim() })}
                  value={email}
                />
              </Item>

              <Item style={styles.InputStyle}>
                <AntDesign active name="phone" size={20} color="#FFFFFF" />
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "#FFFFFF",
                    margin: 5
                  }}
                />
                <Input
                  style={{color: "#FFFFFF"}}
                  placeholder="Phone Number"
                  style={styles.InputStyle}
                  placeholderTextColor="#FFFFFF"
                  textContentType="telephoneNumber"
                  keyboardType={"number-pad"}
                  maxLength={11}
                  onChangeText={text => this.setState({ phoneNumber: text.trim() })}
                  value={phoneNumber}
                />
              </Item>

              <Item style={styles.InputStyle}>
                <AntDesign active name="lock" size={20} color="#FFFFFF" />
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "#FFFFFF",
                    margin: 5
                  }}
                />
                <Input
                  style={{color: "#FFFFFF"}}
                  secureTextEntry={this.state.showPassword}
                  placeholder="Password"
                  placeholderTextColor="#FFFFFF"
                  onChangeText={text => this.setState({ password: text })}
                  value={password}
                  name={password}
                />
                <TouchableOpacity onPress={this.visiblePassword}>
                  <EvilIcons active name="eye" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              </Item>

              <Item style={styles.InputStyle}>
                <AntDesign active name="lock" size={20} color="#FFFFFF" />
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: "#FFFFFF",
                    margin: 5
                  }}
                />
                <Input
                  style={{color: "#FFFFFF"}}
                  secureTextEntry={this.state.showPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor="#FFFFFF"
                  textContentType="password"
                  onChangeText={text => this.setState({ password2: text })}
                  value={password2}
                  name={password2}
                />
                <TouchableOpacity onPress={this.visiblePassword}>
                  <EvilIcons active name="eye" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              </Item>

              <CheckBox
                title="I accept all Terms and Conditions"
                checked={this.state.checked}
                checkedColor="#01C851"
                style={{ margin: -10 }}
                textStyle={{ fontSize: 10, color: "#FFFFFF" }}
                containerStyle={{
                  width: (60 / 100) * width,
                  height: (4 / 100) * height,
                  justifyContent: "center",
                  alignSelf: "center",
                  backgroundColor: "#808080"
                }}
                onPress={this.checkedbox}
              />
            </View>
          </Form>
          <Button style={styles.ButtonSignUp} onPress={this.onSubmit}>
            <Text style={styles.ButtonSignUpText}> Sign Up </Text>
          </Button>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.DontHaveAccount}>
              Already have an account?{" "}
              <Text style={{ color: "#01C851" }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View />
        <Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#808080"
  },
  FormContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  InputStyle: {
    width: (70 / 100) * width,
    height: (7 / 100) * height,
    backgroundColor: "#01C851",
    borderRadius: 10,
    color: "#FFFFFF",
    margin: 5,
    padding: 10
  },
  ButtonSignUp: {
    width: (70 / 100) * width,
    height: (7 / 100) * height,
    backgroundColor: "#01C851",
    borderRadius: 10,
    margin: 15
  },
  ButtonSignUpText: {
    flex: 1,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal"
  },
  ForgotPassword: {
    color: "#FFFFFF",
    fontWeight: "300",
    fontSize: 12,
    fontStyle: "normal",
    margin: 10
  },
  DontHaveAccount: {
    color: "#FFFFFF",
    fontStyle: "normal",
    fontSize: 13,
    fontWeight: "bold",
    margin: 5
  }
});

const mapStateToProps = state => {
  return {
    Auth: state.Auth
  };
};

export default connect(
  mapStateToProps,
  { RegistrationAction }
)(Register);
