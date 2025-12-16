import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getLegalInformationApi() {
  return Api.get(`/legal-information`);
}

function* watchGetServicesActionAsync() {
  try {
    const {response} = yield call(getLegalInformationApi);
    yield put({
      type: actions.ON_FETCH_LEGAL_INFORMATION_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_LEGAL_INFORMATION_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_LEGAL_INFORMATION, watchGetServicesActionAsync),
];
