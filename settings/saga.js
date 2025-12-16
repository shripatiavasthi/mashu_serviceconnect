import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import settingsActions from './store/actions';
import Api from '../utils/Api';

function getSettingsApi() {
  return Api.get(`/settings`);
}

function* watchGetSettingsActionAsync() {
  try {
    const {response} = yield call(getSettingsApi);
    yield put({
      type: settingsActions.ON_FETCH_SETTINGS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: settingsActions.ON_FETCH_SETTINGS_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(settingsActions.FETCH_SETTINGS, watchGetSettingsActionAsync),
];
