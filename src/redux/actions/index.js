
//This file holds all actions available to components
import {
    //AuthReducer types
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    //AuthTokenReducer types
    SET_AUTH_TOKEN,
    REVOKE_AUTH_TOKEN,
    //UserReducer types
    SET_USER_EMAIL,
	FETCH_USER_INFO_START,
	FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE,
    //UserReducer types
    CHANGE_THEME
} from './types';

import api from 'app/src/api';

//AuthReducer actions
export const loginUser = () => {
    //this is the action returned to the 
    //reducer when called by a component
    return {
        type: LOGIN_USER_SUCCESS,
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
    };
}

//AuthTokenReducer actions
export const setAuthToken = (jwt) => {
    return {
        type: SET_AUTH_TOKEN,
        payload: jwt
    };
}

export const revokeAuthToken = () => {
    return {
        type: REVOKE_AUTH_TOKEN
    }
}

//UserReducer actions
export const setUserEmail = (email) => {
    return {
        type: SET_USER_EMAIL,
        payload: email
    }
}

export const fetchUserInfoByEmail = (email) => {
    return (dispatch) => {
        dispatch({type: FETCH_USER_INFO_START});
        api.fetchUserInfoByEmail(email)
					.then((data) => {
						console.log('From fetchUserInffoByEmail: ');
                        console.log(data);
                        if(!data.error) {
						    dispatch({type: FETCH_USER_INFO_SUCCESS, payload: data});
                        } else {
                            dispatch({type: FETCH_USER_INFO_FAILURE, payload: data})
                        }
					})
					.catch((err) => dispatch({type: FETCH_USER_INFO_FAILURE, payload: err}));
    }        
}

//SettingsReducer actions
export const changeTheme = () => {
    return {
        type: CHANGE_THEME
    }
}
