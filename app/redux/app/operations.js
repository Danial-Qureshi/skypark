import {I18nManager} from 'react-native';
import * as actions from './actions';
import {CommonActions} from '@react-navigation/native';
import RestApi from '../../services/restclient/RestApi';
import {toast, Validate} from '@app/Omni';

export const initialApp = () => (dispatch) => {
    dispatch(actions.beginInitApp());
};

export const switchLanguage = (isRtl) => (dispatch) => {
    dispatch(actions.changeLanguage({lang: isRtl == true ? 'ar' : 'en', rtl: isRtl}));
};

export const finishIntro = (boolean) => (dispatch) => {

    dispatch(actions.finishIntro(boolean));

};

export const saveAddress = (address) => (dispatch) => {
    dispatch(actions.saveAddress(address));

};

export const updateAddress = (address) => (dispatch) => {
    dispatch(actions.saveAddress(address));

};

export const deleteAddress = (address) => (dispatch) => {
    dispatch(actions.saveAddress(address));

};

export const getCities = () => (dispatch) => {
    try {
        dispatch(actions.categoryPending());

        return RestApi.getInstance().get('api/cities', {
            headers: {
                'Accept': 'application/json',
            },
        })

            .then((json) => {
                if (json.error) {
                    dispatch(actions.getCategoriesfailure(json.data.error));
                    toast(JSON.stringify(json.data.error));
                } else {
                    const {data} = json;
                    dispatch(actions.getCities(data.data));
                    return data;
                }
            })
            .catch((error) => {
                dispatch(actions.getCategoriesfailure(error));
            });
    } catch (e) {
        dispatch(actions.getCategoriesfailure(e));
        toast(JSON.stringify(e.message));
    }
    //dispatch(actions.getCategoriesSuccess())


};
export const getOutletById = (id) => (dispatch) => {
    try {
        dispatch(actions.categoryPending());

        return RestApi.getInstance().get(`api/get-outlets-by-city/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
        })

            .then((json) => {
                if (json.error) {
                    dispatch(actions.getCategoriesfailure(json.data.error));
                    toast(JSON.stringify(json.data.error));
                } else {
                    const {data} = json;
                    dispatch(actions.getOutletsById(data.data));
                    // alert(JSON.stringify(data))
                    return data;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                dispatch(actions.getCategoriesfailure(error));
            });
    } catch (e) {
        dispatch(actions.getCategoriesfailure(e));
        toast(JSON.stringify(e.message));
    }
    //dispatch(actions.getCategoriesSuccess())


};
