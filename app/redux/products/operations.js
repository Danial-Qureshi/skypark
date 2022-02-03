/** @format */

import * as actions from './actions';
import globals from '../../common/globals';
import {logout} from '../user/operations';

import RestApi from '../../services/restclient/RestApi';
import * as NavigationService from '../../navigation/NavigationService';

export const fetchCategories = accessToken => dispatch => {
  try {
    dispatch(actions.categoryPending());
    return RestApi.getInstance2(accessToken)
      .post(`v1/category/query?merchantId=c315ebfa-17ea-11ec-9621-0242ac130002`)
      .then(json => {
        if (json.error) {
          dispatch(actions.categoryFailure(json.error));
        } else {
          const {data} = json;
          dispatch(actions.categorySuccess(data.content));
          return data.content;
        }
      })
      .catch(error => {
        dispatch(actions.categoryFailure(error));
      });
  } catch (error) {
    dispatch(actions.categoryFailure(error));
  }
};

export const fetchFeatureProducts = () => dispatch => {
  try {
    // const categoryIds = Config.HorizonLayout.map(x => x.categoryId)
    dispatch(actions.categoryPending());
    return RestApi.getInstance()
      .get(
        'V1/products/?searchCriteria[filter_groups][0][filters][0][field]=sm_featured&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=eq',
        {headers: {Authorization: 'Bearer ' + globals.bearerToken}},
      )
      .then(json => {
        if (json.error) {
          dispatch(actions.categoryFailure(json.error));
        } else {
          dispatch(actions.featureSuccess(json.data.items));
          return json.data;
        }
      })
      .catch(error => {
        dispatch(actions.categoryFailure(error));
      });
  } catch (error) {
    dispatch(actions.categoryFailure(error));
  }
};

export const fetchProductsByCategoryId = accessToken => dispatch => {
  dispatch(actions.productPending());
  return RestApi.getInstance2(accessToken)
    .post(
      `v1/product/query?category.categoryId=27958f0c-b9bf-4391-a593-b092fc8bce03`,
    )
    .then(json => {
      if (!json) {
        dispatch(actions.productFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.productFailure(json.message));
      } else {
        const {data} = json;
        console.log(data.content);
        dispatch(actions.productSuccess(data.content));
        return data.content;
      }
    })
    .catch(error => {
      dispatch(actions.productFailure(error));
    });
};

export const createBasket = (accessToken, params) => dispatch => {
  console.log(JSON.stringify(params));
  dispatch(actions.productPending());
  return RestApi.getInstance2(accessToken)
    .post(`v1/basket/create`, JSON.stringify(params))
    .then(json => {
      if (!json) {
        dispatch(actions.productFailure(Languages.getDataError));
      } else if (json.code) {
        dispatch(actions.productFailure(json.message));
      } else {
        const {data} = json;
        console.log(data);
        return data;
      }
    })
    .catch(error => {
      dispatch(actions.productFailure(error));
    });
};

export const createCheckout =
  ({accessToken}) =>
  dispatch => {
    try {
      dispatch(actions.categoryPending());
      return RestApi.getInstance()
        .post('V1/carts/mine', '{}', {
          headers: {Authorization: 'Bearer ' + accessToken},
        })
        .then(json => {
          if (json.error) {
            dispatch(actions.createCheckoutFailure(json.error));
            toast(json.error);
            return json;
          } else {
            const {data} = json;

            dispatch(actions.createCheckoutSuccess(data));

            // toast(Languages.AddtoCardSuccess);
            return data;
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            dispatch(logout());
            toast('Session Expired');
            NavigationService.replace('SignInScreen');
          } else {
            dispatch(actions.loginFailure(JSON.stringify(error)));
          }
          // alert(JSON.stringify(error));
          dispatch(actions.categoryFailure(error));
        });
    } catch (error) {
      // alert(JSON.stringify(error));
      dispatch(actions.categoryFailure(error));
    }
  };

export const updateCategories = categories => dispatch => {
  dispatch(actions.categorySuccess(JSON.parse(JSON.stringify(categories))));
};
export const updateCategoriesImages = images => dispatch => {
  dispatch(actions.imagesUpdateCategories(JSON.parse(JSON.stringify(images))));
};

export const updateFeatureProductsImages = Images => dispatch => {
  dispatch(actions.imagesUpdateFeature(JSON.parse(JSON.stringify(Images))));
};
export const updateFeatureProducts = items => dispatch => {
  dispatch(actions.featureSuccess(JSON.parse(JSON.stringify(items))));
};

export const fetchProductByName = query => {
  return RestApi.getInstance().get(
    `/V1/products/?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25${query}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like`,
    {headers: {Authorization: 'Bearer ' + globals.bearerToken}},
  );
};
