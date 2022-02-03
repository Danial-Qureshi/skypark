/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import * as types from './types';

/**
 * login user
 */
export const loginPending = () => ({
  type: types.LOGIN_FETCHING,
});

export const loginSuccess = result => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    accessToken: result,
  },
});
export const setOtp = result => ({
  type: types.SET_OTP,
  payload: {
    otp_id: result,
  },
});
export const addToCart = items => ({
  type: types.ADD_TO_CART_SUCCESS,
  payload: {
    cartItems: items,
  },
});

export const getOrdersSuccess = orders => ({
  type: types.ORDERS_SUCCESS,
  payload: {
    orders: orders,
  },
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const trackOrder = (lat, lng, rlat, rlng) => ({
  type: types.TRACK_ORDER,
  payload: {
    userLat: lat,
    userLng: lng,
    rLat: rlat,
    rLng: rlng,
  },
  error: false,
});

/**
 * register user
 */
export const registerPending = () => ({
  type: types.REGISTER_FETCHING,
});

export const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS,
});
export const zoneSuccess = zone => ({
  type: types.ZONE_SUCCESS,
  payload: {
    zone,
  },
  error: false,
});
export const citySuccess = city => ({
  type: types.CITY_SUCCESS,
  payload: {
    city,
  },
  error: false,
});
export const branchSuccess = branch => ({
  type: types.BRANCH_SUCCESS,
  payload: {
    branch,
  },
  error: false,
});

export const selectAddressSuccess = address => ({
  type: types.SELECT_ADDRESS_SUCCESS,
  payload: {
    address,
  },
  error: false,
});

export const registerFailure = error => ({
  type: types.REGISTER_FAILURE,
  payload: error,
  error: true,
});
export const editProfilePending = () => ({
  type: types.EDIT_PROFILE_FETCHING,
});

export const editProfileSuccess = () => ({
  type: types.EDIT_PROFILE_SUCCESS,
  // payload:{
  //   user,
  // }
});

export const editProfileFailure = error => ({
  type: types.EDIT_PROFILE_FAILURE,
  payload: error,
  error: true,
});
/**
 * register user
 */
export const userInfoPending = () => ({
  type: types.USER_INFO_FETCHING,
});

export const userInfoSuccess = user => ({
  type: types.USER_INFO_SUCCESS,
  payload: {
    user,
  },
});

export const userInfoFailure = error => ({
  type: types.USER_INFO_FAILURE,
  payload: error,
  error: true,
});

/**
 * logout
 */
export const logoutUser = () => ({
  type: types.LOGOUT,
});

/**
 * create user address
 */
export const createUserAddressPending = () => ({
  type: types.USER_CREATE_ADDRESS_FETCHING,
});

export const createUserAddressSuccess = address => ({
  type: types.USER_CREATE_ADDRESS_SUCCESS,
  payload: {
    address,
  },
});

export const getUserCartSuccess = content => ({
  type: types.GET_USER_CART_SUCCESS,
  payload: {
    content,
  },
});

export const createUserAddressFailure = error => ({
  type: types.USER_CREATE_ADDRESS_FAILURE,
  payload: error,
  error: true,
});

/**
 * update user address
 */
export const updateUserAddressPending = () => ({
  type: types.USER_UPDATE_ADDRESS_FETCHING,
});

export const updateUserAddressSuccess = (address, id) => ({
  type: types.USER_UPDATE_ADDRESS_SUCCESS,
  payload: {
    address,
    id,
  },
});

export const updateUserAddressFailure = error => ({
  type: types.USER_UPDATE_ADDRESS_FAILURE,
  payload: error,
  error: true,
});

/**
 * update user default address
 */
export const updateUserDefaultAddressPending = () => ({
  type: types.USER_UPDATE_DEFAULT_ADDRESS_FETCHING,
});

export const updateUserDefaultAddressSuccess = user => ({
  type: types.USER_UPDATE_DEFAULT_ADDRESS_SUCCESS,
  payload: {
    user,
  },
});

export const updateUserDefaultAddressFailure = error => ({
  type: types.USER_UPDATE_DEFAULT_ADDRESS_FAILURE,
  payload: error,
  error: true,
});

/**
 * delete user address
 */
