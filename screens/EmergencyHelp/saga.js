import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getEmergencyHelpApi() {
  return Api.get(`/emergency-help`);
}

function* watchGetServicesActionAsync() {
  try {
    const {response} = yield call(getEmergencyHelpApi);
    yield put({
      type: actions.ON_FETCH_EMERGENCY_HELP_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_EMERGENCY_HELP_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_EMERGENCY_HELP, watchGetServicesActionAsync),
];
