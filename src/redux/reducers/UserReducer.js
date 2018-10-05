import {
    SET_USER_EMAIL,
    FETCH_USER_INFO_START,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE
} from 'app/src/redux/actions/types';

const INITIAL_STATE = {
    info: {
        username: '',
        firstName: '',
        lastName: '',
    },
    isLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER_EMAIL:
            return {...state, info: {...state.info, username: action.payload}}
        case FETCH_USER_INFO_START:
             return {...state, isLoading: true}
        case FETCH_USER_INFO_SUCCESS:
            return {...state, info: action.payload, isLoading: false}
        case FETCH_USER_INFO_FAILURE:
            alert(action.payload);
            return {...state, isLoading: false}
        default:
            return state;
    }
};