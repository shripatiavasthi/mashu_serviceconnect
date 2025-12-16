import {call, put, takeLatest, select} from 'redux-saga/effects';
import Api from '../../utils/Api';
import Actions from './store/actions';
import {PAGE_LIMIT} from '@env';

function getServiceDataApi({serviceName, loc, pageId}) {
  let sortingQuery = loc ? `lat=${loc.latitude}&lng=${loc.longitude}` : `sortByTitle=true`  
  return Api.get(`/items/${serviceName}?${sortingQuery}&pageId=${pageId||1}&limit=${PAGE_LIMIT}`);  
}

function* watchGetServiceItemActionAsync({serviceName}) {
  try {    
    const loc = yield select(({settings}) => settings.location);    
    const {response} = yield call(getServiceDataApi, {serviceName, loc});
    yield put({
      type: Actions.ON_FETCH_SERVICE_ITEM_SUCCESS,
      serviceName: serviceName,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: Actions.ON_FETCH_SERVICE_ITEM_ERROR,
      details: {error},
    });
  }
}

function* watchGetMoreServiceItemActionAsync({serviceName, pageId}) {
  try {
    const loc = yield select(({settings}) => settings.location);
    const {response} = yield call(getServiceDataApi, {serviceName, loc, pageId});    
    yield put({
      type: Actions.ON_FETCH_MORE_SERVICE_ITEM_SUCCESS,
      serviceName: serviceName,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: Actions.ON_FETCH_MORE_SERVICE_ITEM_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(Actions.FETCH_SERVICE_ITEM, watchGetServiceItemActionAsync),
  takeLatest(Actions.FETCH_MORE_SERVICE_ITEM, watchGetMoreServiceItemActionAsync),
];
