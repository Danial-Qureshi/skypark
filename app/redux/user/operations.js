import * as actions from './actions';
import RestApi from '../../services/restclient/RestApi';
import {toast} from '@app/Omni';
import {saveAddress} from '../app/operations';
import globals from '../../common/globals';
import FormData from 'form-data';
import * as NavigationService from '../../navigation/NavigationService';
import axios from 'axios';

export const login = params => dispatch => {
  try {
    console.log(JSON.stringify(params));
    dispatch(actions.loginPending());
    return RestApi.getInstance()
      .post('v1/authorization/token/get', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // merchantId: globals.merchant_id,
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.loginFailure(json.error));
          toast(json.error.message);
        } else {
          const {data} = json;
          toast('login sucessfull');
          dispatch(actions.loginSuccess(data.access_token));
          dispatch(
            actions.userInfoSuccess({
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              id: data.id,
            }),
          );
          //   alert(JSON.stringify(data));
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        console.log(error);

        toast(error?.response?.data?.message);

        dispatch(actions.loginFailure(JSON.stringify(error)));
      });
  } catch (error) {
    dispatch(actions.loginFailure(error));
  }
};

export const register = params => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post('customer/api/v2/register', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer '+globals.bearerToken
          merchant_id: globals.merchant_id,
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          console.log(JSON.stringify(data));
          dispatch(actions.loginSuccess(data.data.profile.bearer));
          dispatch(actions.userInfoSuccess(data.data.profile));
          dispatch(actions.setOtp(data.data.profile.otp_id));
          toast('An OTP sent to your given phone number');
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error.response?.data?.message);
        if (error.response?.data?.message) {
          var errorString = '';
          for (let obj of Object.keys(error.response.data.errors)) {
            errorString += '\n' + error.response.data.errors[obj];
          }
        }
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};
export const verifyOtp = (params, bearer) => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post('customer/api/otp-verify', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // merchantId: globals.merchant_id,
          Authorization: 'Bearer ' + bearer,
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.data.verified));
          toast(json.data.result);
        } else {
          const {data} = json;
          console.log(JSON.stringify(data));
          dispatch(actions.registerSuccess());
          toast('Verified');
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error?.response?.data?.result);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const resendOtp = (params, token) => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post('customer/api/otp-resend', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          // merchantId: globals.merchant_id,
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          console.log(JSON.stringify(data));
          dispatch(actions.setOtp(data.otp_id));
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error?.result);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const forgetPassword = params => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post('customer/api/password-reset/phone', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer '+globals.bearerToken
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          console.log(data.data.otp_id);
          toast(data.message);
          dispatch(actions.setOtp(data.data.otp_id));
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error?.response?.data?.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};
export const verifyOtpFP = params => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post('customer/api/password-reset/otp-verify', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer '+globals.bearerToken
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.data.verified));
          toast(json?.error?.message);
        } else {
          const {data} = json;
          console.log(JSON.stringify(data));
          dispatch(actions.registerSuccess());
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error?.response?.data?.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const resendOtpFP = params => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post('password/password-resend', JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer '+globals.bearerToken
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          console.log(JSON.stringify(data));
          dispatch(actions.registerSuccess());
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error.response?.data?.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};
export const passwordUpdateByOTP = params => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post(
        'customer/api/password-reset/update-password',
        JSON.stringify(params),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer '+globals.bearerToken
          },
        },
      )
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          console.log(JSON.stringify(data));
          dispatch(actions.registerSuccess());
          toast(data.message);
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error.response?.data?.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const updateUser = (params, accessToken) => dispatch => {
  console.log(JSON.stringify(params.customer.id));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstanceForLogin()
      .put(`v1/customers/${params.customer.id}`, JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + globals.bearerToken,
        },
      })
      .then(json => {
        // alert(JSON.stringify(json))
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          dispatch(getUserInfo({accessToken: accessToken}));
          return data;
        }
      })
      .catch(error => {
        dispatch(actions.registerFailure(''));
        toast(error.response.data.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const getUserInfo =
  ({accessToken}) =>
  dispatch => {
    try {
      dispatch(actions.userInfoPending());
      // alert(JSON.stringify(provider))
      return RestApi.getInstanceForLogin()
        .get('V1/customers/me', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then(json => {
          if (json.error) {
            dispatch(actions.userInfoFailure(json.error));
            // / alert(JSON.stringify(json.data.error))
          } else {
            const {data} = json;
            dispatch(actions.userInfoSuccess(data));
            dispatch(getWishList({id: data.id}));
          }
        })
        .catch(error => {
          dispatch(actions.userInfoFailure(error));
          if (error.response.status === 401) {
            dispatch(logout());
            toast('Session Expired');
            NavigationService.replace('SignInScreen');
          } else {
            dispatch(actions.loginFailure(JSON.stringify(error)));
          }
          toast(JSON.stringify(error));
        });
    } catch (error) {
      dispatch(actions.userInfoFailure(error));
      toast(error.message);
    }
  };

export const createAddress = (params, accessToken) => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post(`customer/api/address`, JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(json => {
        // alert(JSON.stringify(json))
        console.log(JSON.stringify(json));
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          dispatch(actions.registerSuccess());
          dispatch(getAddresses(accessToken));
          return true;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error.response.data.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};
export const placeOrder = (params, accessToken) => dispatch => {
  console.log(JSON.stringify(params));
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .post(`customer/api/v1/place-order`, JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(json => {
        // alert(JSON.stringify(json))
        console.log(JSON.stringify(json));
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          toast(data.message);
          dispatch(actions.registerSuccess());
          // dispatch(getOrders(accessToken))
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
        toast(error.response.data.message);
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const getAddresses = accessToken => dispatch => {
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .get(`customer/api/addresses`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(json => {
        console.log(JSON.stringify(json));
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          dispatch(actions.createUserAddressSuccess(data.data.addresses));
          return true;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const getBasket = accessToken => dispatch => {
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance2(accessToken)
      .post(`v1/basket/query`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(json => {
        if (json.error) {
          console.log('i am errror ', json.error);
          dispatch(actions.registerFailure(json.error));
        } else {
          console.log('i am alive ', json.error);
          const {data} = json;
          dispatch(actions.getUserCartSuccess(data.content));
          return data.content;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const payment = (accessToken, params) => dispatch => {
  try {
    console.log(JSON.stringify(params));
    return RestApi.getInstance2(accessToken)
      .post(`v1/payment/create`, JSON.stringify(params), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(json => {
        if (json.error) {
          console.log('i am errror ', json.error);
          dispatch(actions.registerFailure(json.error));
        } else {
          console.log(json.data);
          const {data} = json;
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const getOrders = accessToken => dispatch => {
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .get(`customer/api/order/order-history`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          dispatch(actions.getOrdersSuccess(data.data.orders));
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const cancelOrder = (id, accessToken) => dispatch => {
  try {
    // alert(JSON.stringify(params)+usertype)
    dispatch(actions.registerPending());
    return RestApi.getInstance()
      .get(`customer/api/order/${id}/mark-cancel`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(json => {
        if (json.error) {
          dispatch(actions.registerFailure(json.error));
        } else {
          const {data} = json;
          toast(data.message);
          dispatch(getOrders(accessToken));
          return data;
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        dispatch(actions.registerFailure(''));
      });
  } catch (error) {
    toast(error.response.errors);
    dispatch(actions.registerFailure(error));
  }
};

export const logout = () => dispatch => {
  dispatch(actions.logoutUser());
};

export const setZone = zone => dispatch => {
  dispatch(actions.zoneSuccess(zone));
};

export const setSelectedAddress = address => dispatch => {
  dispatch(actions.selectAddressSuccess(address));
};

export const setCity = city => dispatch => {
  dispatch(actions.citySuccess(city));
};

export const setBranch = branch => dispatch => {
  dispatch(actions.branchSuccess(branch));
};
export const addToCart = items => dispatch => {
  // let total_price = 0
  // for (let item of items){
  //     total_price +=item.price
  // }
  dispatch(actions.addToCart(JSON.parse(JSON.stringify(items))));
};
