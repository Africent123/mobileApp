import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from "react-native";
import { Form, Button, Item, Input, Icon } from "native-base";

import { connect } from "react-redux";
import { LoginAction } from "../../Actions/LoginAction";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Logo } from "../../assets/Logo";

const { width, height } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      Loading: false,
      showPassword: true
    };
  }
  static navigationOptions = {
    header: null
  };

  visiblePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onSubmit = async () => {
    const { email, password } = this.state;
    await this.props
      .LoginAction({ email, password })
      .then(res => {
        console.log(res, "Login Screen");
        if (res.success) {
          this.props.navigation.navigate("Home");
        } else {
          // ToastAndroid.show("Testing", ToastAndroid.LONG, 100)
          // console.log(res)
          alert("Incorrect password or email address");
        }
      })
      .catch(error => {
        alert("Incorrect password or email address");
        // ToastAndroid.show("Incoorec", ToastAndroid.LONG, 100)
        this.setState({ password: "" });
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.Container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            top: (10 / 100) * height
          }}
        >
          <Logo />
        </View>
        <View
          style={{
            justifyContent: "center",
            top: (10 / 100) * height,
            alignItems: "flex-start"
          }}
        >
          <Text style={styles.headerText}>Let’s start with </Text>
          <Text
            style={{
              ...styles.headerText,
              fontWeight: "bold",
              marginBottom: 5
            }}
          >
            Log In
          </Text>
        </View>
        <View style={styles.FormContainer}>
          <Form>
            <View>
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
                  style={{ color: "#FFFFFF" }}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#FFFFFF"
                  onChangeText={text => this.setState({ email: text.trim() })}
                  value={email.trim()}
                  name={email}
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
                  style={{ color: "#FFFFFF" }}
                  secureTextEntry={this.state.showPassword}
                  placeholder="Password"
                  placeholderTextColor="#FFFFFF"
                  onChangeText={text =>
                    this.setState({ password: text.trimRight() })
                  }
                  value={password}
                  name={password}
                />
                <TouchableOpacity onPress={this.visiblePassword}>
                  <EvilIcons active name="eye" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              </Item>
              <TouchableOpacity
                onPress={() => {
                  this.props.LoginAction("lawalgoodness14@gmail.com hope123");
                }}
              >
                <Text style={styles.ForgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </Form>
          <Button style={styles.ButtonSignIn} onPress={this.onSubmit}>
            <Text style={styles.ButtonSigninText}> Sign In </Text>
          </Button>
          <Text
            style={{
              fontSize: 22,
              textAlign: "left",
              fontFamily: "Roboto",
              color: "#FFFFFF"
            }}
          >
            Or
          </Text>
          <Button
            style={styles.ButtonSignUp}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.ButtonSigninText}> Sign up </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: (100 / 100) * width,
    flexDirection: "column",
    backgroundColor: "#808080"
  },
  FormContainer: {
    top: (10 / 100) * height,
    width: (100 / 100) * width,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 22,
    textAlign: "left",
    fontFamily: "Roboto",
    color: "#FFFFFF",
    marginLeft: (16 / 100) * width
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
  ButtonSignIn: {
    width: (70 / 100) * width,
    height: (7 / 100) * height,
    backgroundColor: "#01C851",
    borderRadius: 10,
    margin: 15
  },
  ButtonSignUp: {
    width: (70 / 100) * width,
    height: (7 / 100) * height,
    backgroundColor: "#808080",
    borderColor: "#01C851",
    borderWidth: 2,
    borderRadius: 10,
    margin: 15
  },
  ButtonSigninText: {
    flex: 1,
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal"
  },
  ForgotPassword: {
    color: "#F44A4A",
    textAlign: "right",
    fontWeight: "300",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "bold",
    margin: 5
  },
  DontHaveAccount: {
    color: "#FFFFFF",
    fontStyle: "normal",
    fontSize: 13,
    fontWeight: "normal"
  }
});

const mapStateToProps = state => {
  return {
    Auth: state.Auth
  };
};

export default connect(
  mapStateToProps,
  { LoginAction }
)(Login);
