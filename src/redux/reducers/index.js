import { combineReducers } from 'redux';
import AuthReducer from 'app/src/redux/reducers/AuthReducer';
import AuthTokenReducer from 'app/src/redux/reducers/AuthTokenReducer';
import UserReducer from 'app/src/redux/reducers/UserReducer';
import SettingsReducer from 'app/src/redux/reducers/SettingsReducer';

export default combineReducers({
    authToken: AuthTokenReducer,
    auth: AuthReducer,
    user: UserReducer,
    settings: SettingsReducer
});
