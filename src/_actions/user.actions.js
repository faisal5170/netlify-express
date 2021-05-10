import { userConstants } from '../_constants';

export const userActions = {
    updateCart
};

function updateCart(cartInfo) {
    return dispatch => {
        dispatch(success(cartInfo));
    };

    function success(cartInfo) { return { type: userConstants.CART_ITEM_SUCCESS, cartInfo } }
}