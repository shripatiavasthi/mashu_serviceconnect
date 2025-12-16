import Actions from './actions';

const defaultState = {
  jobAssistanceServiceData: null,
  jobAssistanceServiceDataFetchInProgress: false,
  jobAssistanceServiceDatafetchSuccess: false,
  jobAssistanceServiceDataFetchError: null,
};

function ServiceDataReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_JOBASSISTANCE_SERVICE_DATA:
      return {
        ...state,
        jobAssistanceServiceDataFetchInProgress: true,
        jobAssistanceServiceDatafetchSuccess: false,
        jobAssistanceServiceDataFetchError: null,
      };
    case Actions.ON_FETCH_JOBASSISTANCE_SERVICE_DATA_SUCCESS:
      return {
        ...state,
        jobAssistanceServiceDataFetchInProgress: false,
        jobAssistanceServiceDatafetchSuccess: true,
        jobAssistanceServiceData: {...action.details.data}
      };
    case Actions.ON_FETCH_JOBASSISTANCE_SERVICE_DATA_ERROR:
      return {
        ...state,
        jobAssistanceServiceDataFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default ServiceDataReducer;
