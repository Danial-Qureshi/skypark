import * as types from './types';

export const productPending = () => ({
  type: types.FETCHING,
});

export const productSuccess = content => ({
  type: types.FETCH_SUCCESS,
  payload: {
    content,
  },
});
export const productFailure = error => ({
  type: types.FETCH_FAILURE,
  payload: error,
  error: true,
});

export const categoryPending = () => ({
  type: types.CATEGORY_FETCHING,
});

export const categorySuccess = content => ({
  type: types.CATEGORY_SUCCESS,
  payload: {
    content,
  },
});
export const imagesUpdateCategories = collections => ({
  type: types.IMAGE_UPDATE,
  payload: {
    collections,
  },
});

export const imagesUpdateFeature = collections => ({
  type: types.IMAGE_UPDATE_PRODUCTS,
  payload: {
    collections,
  },
});
export const featureSuccess = item => ({
  type: types.FEATURE_SUCCESS,
  payload: {
    item,
  },
});

export const categoryFailure = error => ({
  type: types.CATEGORY_FAILURE,
  payload: error,
  error: true,
});

/**
 * select category
 */
export const selectCategory = category => ({
  type: types.CATEGORY_SELECT,
  payload: {
    category,
  },
});
