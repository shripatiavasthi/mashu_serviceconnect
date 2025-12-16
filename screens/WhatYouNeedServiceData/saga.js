import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../../utils/Api';
import Actions from './store/actions';

function getServiceDataApi({serviceName}) {  
  return Api.get(`/what-you-need/${serviceName}`);
}

function* watchGetWhatYouNeedServiceDataActionAsync({serviceName}) {
  try {
    const {response} = yield call(getServiceDataApi, {serviceName});
    //crashlytics.log("response",response.data)
    yield put({
      type: Actions.ON_FETCH_WHATYOUNEED_SERVICE_DATA_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    //crashlytics.log(error)
    yield put({
      type: Actions.ON_FETCH_WHATYOUNEED_SERVICE_DATA_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(
    Actions.FETCH_WHATYOUNEED_SERVICE_DATA,
    watchGetWhatYouNeedServiceDataActionAsync
  ),
];
