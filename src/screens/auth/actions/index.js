
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
  SET_BUSINESS_SWITCH
} from './types';

import api from '../api';

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

// AuthTokenReducer actions
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
      dispatch({ type: FETCH_USER_INFO_START });
      api.fetchUserInfoByEmail(email)
          .then((data) => {
              // console.log('From fetchUserInffoByEmail: ');
              // console.log(data);
              if (!data.error) {
                  if (data.business){
                      dispatch({
                          type: SET_BUSINESS_SWITCH,
                          payload: true
                      })
                    } else {
                      dispatch({
                          type: SET_BUSINESS_SWITCH,
                          payload: false
                      })
                    }
                  dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: data });
                  dispatch({type: LOGIN_USER_SUCCESS});
                } else {
                  dispatch({ type: FETCH_USER_INFO_FAILURE, payload: data })
              }
          })
          .catch((err) => {
            console.log(err)
            dispatch({ type: FETCH_USER_INFO_FAILURE, payload: err })
          });
  }
}

//SettingsReducer actions
export const changeTheme = () => {
  return {
      type: CHANGE_THEME
  }
}

export const setBusinessSwitch = (value) => {
  return {
      type: SET_BUSINESS_SWITCH, 
      payload: value
  }
}
