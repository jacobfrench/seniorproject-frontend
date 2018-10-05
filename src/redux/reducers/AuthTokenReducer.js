import {
    SET_AUTH_TOKEN,
    REVOKE_AUTH_TOKEN
} from 'app/src/redux/actions/types';

//initial state of token is ''
const INITIAL_STATE = '';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return action.payload;
        case REVOKE_AUTH_TOKEN:
            return '';
        default:
            return state;
    }
}
