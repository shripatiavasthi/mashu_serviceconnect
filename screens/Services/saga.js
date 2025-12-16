import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getMainServiceApi({serviceName}) {
  return Api.get(`/services/${serviceName}`);
}

function* watchGetMainServiceActionAsync({serviceName}) {
  try {
    const {response} = yield call(getMainServiceApi, {serviceName});
    yield put({
      type: actions.ON_FETCH_MAIN_SERVICE_SUCCESS,
      serviceName: serviceName,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_MAIN_SERVICE_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_MAIN_SERVICE, watchGetMainServiceActionAsync),
];
