import * as types from "./types";

/**
 * initial app
 */
export const beginInitApp = () => ({
  type: types.INITIAL_APP,
});


export const categoryPending = () => ({
  type: types.CATEGORIES_FETCHING,
});

export const getCities = (cities) => ({

  type:types.CITIES_SUCCESS,
  payload:{
    cities:cities,
  }
})

export const getOutletsById = (outlets) => ({

  type:types.OUTLETS_SUCCESS,
  payload:{
    outlets:outlets,
  }
})

export const getCategoriesfailure = (error) => ({

  type:types.CATEGORIES_FAILURE,
  payload:error,
  error:true,
})
/**
 * intro screen
 */
export const finishIntro = (boolean) => ({
  type: types.FINISH_INTRO,
  payload:boolean
});

export const saveAddress = (address) => ({
  type: types.SAVE_ADDRESS,
  payload:address
});

export const updateAddress = (address) => ({
  type: types.SAVE_ADDRESS,
  payload:address
});

export const deleteAddress = (address) => ({
  type: types.SAVE_ADDRESS,
  payload:address
});

/**
 * notification
 */
export const enableNotification = () => ({
  type: types.NOTIFICATION_ENABLE,
});

export const disableNotification = () => ({
  type: types.NOTIFICATION_DISABLE,
});

export const toggleNotification = (value) => ({
  type: types.NOTIFICATION_TOGGLE,
  payload: {
    value,
  },
});

/**
 * currency
 */
export const changeCurrency = (value) => ({
  type: types.CURRENCY_CHANGE,
  payload: {
    value,
  },
});

/**
 * language
 */
export const changeLanguage = (value) => ({
  type: types.LANGUAGE_CHANGE,
  payload: {
    value,
  },
});

export const changeRtl = (value) => ({
  type: types.LANGUAGE_CHANGE,
  payload: {
    value,
  },
});

/**
 * sidemenu
 */

export const openSidemenu = () => ({
  type: types.SIDEMENU_OPEN,
});

export const closeSidemenu = () => ({
  type: types.SIDEMENU_CLOSE,
});

export const toggleSidemenu = (isOpen) => ({
  type: types.SIDEMENU_TOGGLE,
  payload: {
    isOpen,
  },
});

/**
 * netinfo
 */
export const updateConnectionStatus = (netInfoConnected) => ({
  type: types.UPDATE_CONNECTION_STATUS,
  payload: {
    netInfoConnected,
  },
});

/**
 * toast
 */
export const addToast = (msg, key) => ({
  type: types.ADD_TOAST,
  payload: {
    msg,
    key,
  },
});

export const removeToast = (key) => ({
  type: types.REMOVE_TOAST,
  payload: {
    key,
  },
});
