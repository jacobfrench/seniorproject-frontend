//Description: Handles all authentication state
import { LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "app/src/redux/actions/types";

//this object contains all pieces of state for authentication
//instead of having component-level state we make global state
//here accessible to all components
const INITIAL_STATE = {
  loggedIn: false
};

//reducer
// @param1: contains previous state of application.
//          In the case that no initial state is provided we use INITIAL_STATE as the default argument
// @param2: An action is passed into the reducer which tells the reducer how to change the state. (using action.type)
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      //this is the line that updates the state object
      //For this specific case we pass in all previous state with "...state"
      //and also include a state change for "loggedIn"
      return { ...state, loggedIn: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};
