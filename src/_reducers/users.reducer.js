import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.CART_ITEM_SUCCESS:
            return {
                ...state,
                cartInfo: action.cartInfo
            };

        default:
            return state
    }
}