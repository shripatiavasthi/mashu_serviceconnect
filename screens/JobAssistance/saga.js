import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getJobAssistanceApi() {
  return Api.get(`/services/what-you-need`);
}

function* watchGetJobAssistanceActionAsync() {
  try {
    const {response} = yield call(getJobAssistanceApi);
    yield put({
      type: actions.ON_FETCH_JOB_ASSISTANCE_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_JOB_ASSISTANCE_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_JOB_ASSISTANCE, watchGetJobAssistanceActionAsync),
];
