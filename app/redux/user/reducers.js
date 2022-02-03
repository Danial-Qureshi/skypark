/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from './types';
import {addAndUpdateUserAddress, deleteUserAddress} from './utils';

const initialState = {
  userInfo: null,
  accessToken: null,
  expiresAt: null,
  isFetching: false,
  error: null,
  orderData: null,
  zone: null,
  city: null,
  branch: null,
  otp_id: null,
  cartItems: [],
  selectedAddress: null,
  addresses: [],
  orders: [],
};

export default (state = initialState, action) => {
  const {type, payload, error, meta} = action;

  switch (type) {
    case types.USER_CREATE_ADDRESS_FETCHING:
    case types.USER_UPDATE_ADDRESS_FETCHING:
    case types.USER_UPDATE_DEFAULT_ADDRESS_FETCHING:
    case types.LOGIN_FETCHING:
    case types.REGISTER_FETCHING:
    case types.EDIT_PROFILE_FETCHING:
    case types.USER_INFO_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }

    case types.USER_CREATE_ADDRESS_FAILURE:
    case types.USER_UPDATE_ADDRESS_FAILURE:
    case types.USER_UPDATE_DEFAULT_ADDRESS_FAILURE:
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.EDIT_PROFILE_FAILURE:
    case types.USER_INFO_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }

    case types.EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        //userInfo:payload.data,
        isFetching: false,
        error: null,
      };
    }

    case types.ZONE_SUCCESS: {
      return {
        ...state,
        zone: payload.zone,
        isFetching: false,
        error: null,
      };
    }
    case types.CITY_SUCCESS: {
      return {
        ...state,
        city: payload.city,
        isFetching: false,
        error: null,
      };
    }
    case types.BRANCH_SUCCESS: {
      return {
        ...state,
        branch: payload.branch,
        isFetching: false,
        error: null,
      };
    }

    case types.SELECT_ADDRESS_SUCCESS: {
      return {
        ...state,
        selectedAddress: payload.address,
        isFetching: false,
        error: null,
      };
    }
    case types.TRACK_ORDER: {
      return {
        ...state,
        isFetching: false,
        orderData: payload,
        error: null,
      };
    }

    case types.ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cartItems: payload.cartItems,
        error: null,
      };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        accessToken: payload.accessToken,
        isFetching: false,
        error: null,
      };
    }

    case types.SET_OTP: {
      return {
        ...state,
        otp_id: payload.otp_id,
        isFetching: false,
        error: null,
      };
    }
    case types.ORDERS_SUCCESS: {
      return {
        ...state,
        orders: payload.orders,
        isFetching: false,
        error: null,
      };
    }

    case types.GET_USER_CART_SUCCESS: {
      return {
        ...state,
        cartItems: payload.content,
        isFetching: false,
        error: null,
      };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    case types.USER_UPDATE_DEFAULT_ADDRESS_SUCCESS:
    case types.USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: payload.user,
        isFetching: false,
        error: null,
      };
    }

    case types.USER_CREATE_ADDRESS_SUCCESS:
    case types.USER_UPDATE_ADDRESS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        addresses: payload.address,
      };
    }

    case types.LOGOUT: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
