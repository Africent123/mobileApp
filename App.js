import React from 'react';
import {
 StyleSheet, View, StatusBar, Image 
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import SwitchNavigator from "./Navigator/SwitchNavigator";
import { store, persistor } from "./store";
// import RootScreen from './RootScreen';
import AsyncStorage from '@react-native-community/async-storage'
import RNBackgroundDownloader from 'react-native-background-downloader';
import SplashScreen from "./screens/SplashScreen"

// import SplashScreen from "./screens/SplashScreen"



const App = () =>{
  // console.log("Existing downloads", RNBackgroundDownloader.checkForExistingDownloads()[0])
  let a = Promise.resolve(RNBackgroundDownloader.checkForExistingDownloads())
  a.then(b => {
    console.log(b)
  })
    return(
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate
         loading={<SplashScreen />}
          persistor={persistor}
        >
          <StatusBar hidden={true} />
          <SwitchNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    // justifyContent: 'center',
  },
});

export default App;
