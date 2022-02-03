import * as types from "./types";

const initialState = {
    finishIntro: false,
    generalData: null,
    enableNotification: false,
    language: {
        lang: "en",
        rtl: false,
    },
    isFetching: false,
    isOpenSidemenu: false,
    netInfoConnected: true,
    toast: {
        list: [],
    },
    addressList:[],
    cities:[],
    outlets:[]
};

export default (state = initialState, action) => {
    const {type, payload, error, meta} = action;
    switch (type) {
        case types.FINISH_INTRO: {
            return {
                ...state,
                finishIntro: payload,
            };
        }
        case types.CATEGORIES_FETCHING: {
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        }

        case types.SAVE_ADDRESS: {
            return {

                ...state,
                addressList:payload
            };
        }

        case types.CATEGORIES_SUCCESS: {
            return {
                ...state,
                generalData:payload,
                isFetching:false,
                error: null,
            };
        }

        case types.CITIES_SUCCESS: {
            return {
                ...state,
                cities:payload.cities,
                isFetching:false,
                error: null,
            };
        }

        case types.OUTLETS_SUCCESS: {
            return {
                ...state,
                outlets:payload.outlets,
                isFetching:false,
                error: null,
            };
        }
        case types.CATEGORIES_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error: payload,
            };
        }

        case types.NOTIFICATION_ENABLE: {
            return {
                ...state,
                enableNotification: true,
            };
        }

        case types.NOTIFICATION_DISABLE: {
            return {
                ...state,
                enableNotification: false,
            };
        }

        case types.NOTIFICATION_TOGGLE: {
            return {
                ...state,
                enableNotification: payload.value,
            };
        }


        case types.LANGUAGE_CHANGE: {
            // alert(JSON.stringify(payload.value))
            return {
                ...state,
                language: {
                    ...payload.value,
                },
            };
        }

        case types.RTL_CHANGE: {
            return {
                ...state,
                ...payload.value,

            };
        }

        /**
         * sidemenu
         */
        case types.SIDEMENU_OPEN: {
            return {
                ...state,
                isOpenSidemenu: true,
            };
        }

        case types.SIDEMENU_CLOSE: {
            return {
                ...state,
                isOpenSidemenu: false,
            };
        }

        case types.SIDEMENU_TOGGLE: {
            if (!payload || (payload && typeof payload.isOpen === "undefined")) {
                alert("sidemenu")
                return {
                    ...state,
                    isOpenSidemenu: !state.isOpenSidemenu,
                };
            }
            return {
                ...state,
                isOpenSidemenu: payload.isOpen,
            };
        }

        case types.UPDATE_CONNECTION_STATUS: {
            return {
                ...state,
                netInfoConnected: payload.netInfoConnected,
            };
        }

        case types.ADD_TOAST: {
            return {
                ...state,
                toast: {
                    list: state.toast.list.some((toast) => toast.msg === payload.msg)
                        ? state.toast.list
                        : [payload, ...state.toast.list],
                },
            };
        }
        case types.REMOVE_TOAST: {
            return {
                ...state,
                toast: {
                    list: state.toast.list.filter((msg) => msg.key !== payload.key),
                },
            };
        }

        default:
            return state;
    }
};
