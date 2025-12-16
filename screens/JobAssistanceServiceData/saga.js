import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../../utils/Api';
import Actions from './store/actions';

function getServiceDataApi({ serviceName}) {  
  return Api.get(`/job-assistance/${serviceName}`);
}

function* watchGetJobAssistanceServiceDataActionAsync({serviceName}) {
  try {
    const {response} = yield call(getServiceDataApi, {serviceName});
    //crashlytics.log("response",response.data)
    yield put({
      type: Actions.ON_FETCH_JOBASSISTANCE_SERVICE_DATA_SUCCESS,
      details: response.data,
    });
  } catch (error) {
    //crashlytics.log(error)
    yield put({
      type: Actions.ON_FETCH_JOBASSISTANCE_SERVICE_DATA_ERROR,
      details: {error},
    });
  }
}

export default [
  takeLatest(
    Actions.FETCH_JOBASSISTANCE_SERVICE_DATA,    
    watchGetJobAssistanceServiceDataActionAsync
  ),
];
