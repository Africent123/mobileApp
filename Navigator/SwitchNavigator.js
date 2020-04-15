import {createSwitchNavigator, createAppContainer} from "react-navigation";
import AuthStack from "../Navigator/AuthStack";
import MoviesNav from "../Navigator/MoviesNav"
import RootScreen from "../RootScreen";

const AppSwitchNavigator = createSwitchNavigator({
    
    SplashScreen: RootScreen,
    Auth: AuthStack,
    MoviesNav: MoviesNav,
})

export default createAppContainer(AppSwitchNavigator)