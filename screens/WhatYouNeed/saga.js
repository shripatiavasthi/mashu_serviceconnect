import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getWhatYouNeedApi() {
  return Api.get(`/what-you-need`);
}

function* watchGetServicesActionAsync() {
  try {
    const {response} = yield call(getWhatYouNeedApi);
    yield put({
      type: actions.ON_FETCH_WHATYOUNEED_SERVICES_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_WHATYOUNEED_SERVICES_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(
    actions.FETCH_WHATYOUNEED_SERVICES,
    watchGetServicesActionAsync,
  ),
];
