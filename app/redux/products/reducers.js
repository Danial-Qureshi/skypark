/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import {Config} from '../../common/index';
import * as types from './types';

const initialState = {
  isFetching: false,
  error: null,
  categories: [],
  items: [],
  catImagesList: [],
  selectedCategory: null,
  FeatureImagesList: [],
  categoryLayoutMode: 'GridMode',
  featureList: [],
};

export default (state = initialState, action) => {
  const {type, payload, error, meta} = action;

  switch (type) {
    case types.FETCHING:
    case types.CATEGORY_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.CATEGORY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        categories: payload.content,
        error: null,
      };
    }
    case types.IMAGE_UPDATE: {
      return {
        ...state,
        isFetching: false,
        catImagesList: payload.collections,
      };
    }
    case types.IMAGE_UPDATE_PRODUCTS: {
      return {
        ...state,
        isFetching: false,
        FeatureImagesList: payload.collections,
      };
    }
    case types.FEATURE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        featureList: payload.item,
      };
    }
    case types.FETCH_SUCCESS: {
      return {
        ...state,
        items: payload.content,
        isFetching: false,
        error: null,
      };
    }
    case types.FETCH_FAILURE:
    case types.CATEGORY_FAILURE: {
      console.log(payload);
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    }

    case types.CATEGORY_SELECT: {
      return {
        ...state,
        selectedCategory: payload.category,
      };
    }

    case types.CATEGORY_SWITCH_LAYOUT_MODE: {
      return {
        ...state,
        categoryLayoutMode: payload.mode,
      };
    }

    default: {
      return state;
    }
  }
};
