import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getServiceConnectApi() {
  return Api.get(`/service-connect`);
}

function* watchGetServiceConnectActionAsync() {
  try {
    const {response} = yield call(getServiceConnectApi);
    yield put({
      type: actions.ON_FETCH_SERVICE_CONNECT_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_SERVICE_CONNECT_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(
    actions.FETCH_SERVICE_CONNECT,
    watchGetServiceConnectActionAsync,
  ),
];
