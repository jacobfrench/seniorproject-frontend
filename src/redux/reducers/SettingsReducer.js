import { CHANGE_THEME } from "app/src/redux/actions/types";
import { blues, flare, mojito, dtf, blueraspberry, ohhappiness, test } from 'app/src/constants/Colors';

const INITIAL_STATE = {
  theme: dtf
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: dtf
        
      };

    default:
      return state;
  }
};
