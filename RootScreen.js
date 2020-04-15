import React, { Component } from 'react';
import {
    StyleSheet, View, StatusBar, Image 
} from 'react-native';
import { connect } from 'react-redux'
import { withNavigation,StackActions, NavigationActions } from 'react-navigation';



class RootScreen extends Component{

  checkAuth= (token)=> {
    // const token = token;
    if(!token) {
      return false;
    }
    try {
      console.log(token.exp, "here")
      // const payload = decode(token);
      if(token.exp < Date.now() / 1000) {
        console.log(token.exp)
        return false;
      }
      else{
        return true;
      }
    }
    catch(e){
      return false;
    }
    return true;
  }

  

  _navigateTo = (routeName) =>{
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName})],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate(routeName);
  }
  render() {
    console.log(this.checkAuth(this.props.auth.token))
    let validateToken = this.checkAuth(this.props.auth.token)
    if(validateToken){
      this._navigateTo("Movies")
    }
    else{
      this._navigateTo("Login")
    }
    return(
        <View style={styles.container}>
            <Image
                source={require("./assets/logo1.png")}
                style={{
                  width: 188,
                  height: 106,
                  justifyContent: "center",
                  alignSelf: "center"
                }}
              />
        </View>
    )
}
}
const styles = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  marginTop: 30,
  marginBottom: 20
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.Auth,
  }
}
export default connect(mapStateToProps)(withNavigation(RootScreen));