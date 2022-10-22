import { serverCall, Alert } from '../_utility';
import { CAMBIAR_CONTRA, CAMBIAR_CONTRA_SUCCESS, CAMBIAR_CONTRA_ERROR } from '../_constant';

export const ChangePassword = (data, callback = null) => async (dispatch) => {
    dispatch({ type: CAMBIAR_CONTRA });
    serverCall({
        type: "PUT",
        url: `SecurityServices/cambiarContra`,
        body: data,
        success: () => {
            dispatch({ type: CAMBIAR_CONTRA_SUCCESS });
            Alert("Contraseña cambiada con éxito", "success");
            if (callback) callback();
        },
        fail: () => {
            dispatch({ type: CAMBIAR_CONTRA_ERROR });
        },
    });
};
