import {takeLatest, call, put, all, takeEvery, take} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getBuildYourSkillsApi() {
  return Api.get(`/build-your-skills`);
}

function* watchGetServicesActionAsync() {
  try {
    const {response} = yield call(getBuildYourSkillsApi);
    yield put({
      type: actions.ON_FETCH_BUILD_YOUR_SKILLS_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_BUILD_YOUR_SKILLS_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(actions.FETCH_BUILD_YOUR_SKILLS, watchGetServicesActionAsync),
];
