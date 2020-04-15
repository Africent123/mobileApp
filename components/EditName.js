import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import { Button, Form, Item, Input, Label } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Change_name_email } from "../Actions/ProfileAction";

import Avater from "../assets/profileAvi.png";

import { DeadIcon } from "../assets/Logo";

const { width, height } = Dimensions.get("window");

class EditName extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: null,
      email: null,
      loading: false
    };
  }
  ChangeName = () => {
    const id = this.props.state.Auth.token.userId;
    const { name, email } = this.state;
    this.setState({ loading: true });
    this.props
      .Change_name_email(id, { email, name })
      .then(response => {
        this.setState({ loading: false });
        this.props.cancelModal();
      })
      .catch(error => {
        alert("An error occured please");
      });
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
      Inputvalues,
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={Avater}
                  style={{
                    width: (20 / 100) * width,
                    height: (10 / 100) * height,
                    borderRadius: 100,
                    justifyContent: "center",
                    marginLeft: 10
                  }}
                />
              </View>
              <View style={{ width: "80%", alignSelf: "center" }}>
                {this.state.loading && (
                  <ActivityIndicator size="large" color="#01C851" />
                )}
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input onChangeText={text => this.setState({ name: text })} />
                </Item>
                <Item floatingLabel last>
                  <Label>Email</Label>
                  <Input
                    defaultValue={name}
                    onChangeText={text => this.setState({ email: text.trim() })}
                  />
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
                  <Button style={styles.ButtonSignIn} onPress={this.ChangeName}>
                    <Text style={styles.ButtonSigninText}> Save </Text>
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
          {word && <Text style={{ ...TextStyle }}>{word}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = {
  Text1: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    marginLeft: 2
  },

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
    state: state
  };
};
export default connect(
  mapStateToProps,
  { Change_name_email }
)(EditName);
