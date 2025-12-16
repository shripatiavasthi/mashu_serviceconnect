import {call, put, takeLatest} from 'redux-saga/effects';
import Api from '../../utils/Api';
import Actions from './store/actions';
import {PAGE_LIMIT} from '@env';

function getServiceDataApi({serviceName, pageId}) {
  return Api.get(`/content/${serviceName}?pageId=${pageId||1}&limit=${PAGE_LIMIT}`);
}

function* watchGetServiceContentActionAsync({serviceName}) {
  try {
    const {response} = yield call(getServiceDataApi, {serviceName});    
    yield put({
      type: Actions.ON_FETCH_SERVICE_CONTENT_SUCCESS,
      serviceName: serviceName,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: Actions.ON_FETCH_SERVICE_CONTENT_ERROR,
      details: {error},
    });
  }
}

function* watchGetMoreServiceContentActionAsync({serviceName, pageId}) {
  try {
    const {response} = yield call(getServiceDataApi, {serviceName, pageId});    
    yield put({
      type: Actions.ON_FETCH_MORE_SERVICE_CONTENT_SUCCESS,
      serviceName: serviceName,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: Actions.ON_FETCH_MORE_SERVICE_CONTENT_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(Actions.FETCH_SERVICE_CONTENT, watchGetServiceContentActionAsync),
  takeLatest(Actions.FETCH_MORE_SERVICE_CONTENT, watchGetMoreServiceContentActionAsync),
];
