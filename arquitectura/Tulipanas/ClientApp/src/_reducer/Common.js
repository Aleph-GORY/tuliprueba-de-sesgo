import {
    CAMBIAR_CONTRA, CAMBIAR_CONTRA_SUCCESS, CAMBIAR_CONTRA_ERROR
} from '../_constant';

const initialState = {
    loadingChangePassword: false
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case CAMBIAR_CONTRA:
            return { ...state, loadingChangePassword: true };
        case CAMBIAR_CONTRA_SUCCESS:
            return { ...state, loadingChangePassword: false };
        case CAMBIAR_CONTRA_ERROR:
            return { ...state, loadingChangePassword: false };
        default:
            return state;
    };
};
