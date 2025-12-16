import {
  takeLatest,
  call,
  put,
  select,
  all,
  takeEvery,
  take,
} from 'redux-saga/effects';
import actions from './store/actions';
import Api from '../../utils/Api';

function getDetailedEventsApi({id}) {
  return Api.get(`/events/${id}`);
}

function* watchGetDetailedEventsActionAsync({id}) {
  try {    
    const {response} = yield call(getDetailedEventsApi, {id});
    yield put({
      type: actions.ON_FETCH_DETAILED_EVENT_SUCCESS,
      details: response.data,
    });    
  } catch (error) {
    yield put({
      type: actions.ON_FETCH_DETAILED_EVENT_ERROR,
      details: {error},
    });
  }
}
export default [
  takeLatest(
    actions.FETCH_DETAILED_EVENT,
    watchGetDetailedEventsActionAsync,
  ),
];
