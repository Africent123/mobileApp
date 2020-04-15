import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import MoviesReducer from "./MoviesReducer";
import ProfileReducer from './ProfileReducer'
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import DownloadReducer from "./DownloadReducer";
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer =  combineReducers({
    Auth: LoginReducer,
    Movies: MoviesReducer,
    Profile: ProfileReducer,
    Download: DownloadReducer
})


export default persistReducer(persistConfig, rootReducer)