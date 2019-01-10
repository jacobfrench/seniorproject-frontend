import { CHANGE_THEME, SET_BUSINESS_SWITCH } from "app/src/redux/actions/types";
import { material } from 'app/src/constants/Colors';

const INITIAL_STATE = {
  theme: material,
  showSwitch: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: material
        
      };
    case SET_BUSINESS_SWITCH: 
      return {
        ...state,
        showSwitch: action.payload
      }
    default:
      return state;
  }
};
