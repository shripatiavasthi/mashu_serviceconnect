import Actions from './actions';

const defaultState = {
  emergencyHelpServiceData: null,
  emergencyHelpServiceDataFetchInProgress: false,
  emergencyHelpServiceDatafetchSuccess: false,
  emergencyHelpServiceDataFetchError: null,
};

function ServiceDataReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_EMERGENCYHELP_SERVICE_DATA:
      return {
        ...state,
        emergencyHelpServiceDataFetchInProgress: true,
        emergencyHelpServiceDatafetchSuccess: false,
        emergencyHelpServiceDataFetchError: null,
      };
    case Actions.ON_FETCH_EMERGENCYHELP_SERVICE_DATA_SUCCESS:
      return {
        ...state,
        emergencyHelpServiceDataFetchInProgress: false,
        emergencyHelpServiceDatafetchSuccess: true,
        emergencyHelpServiceData: {...action.details.data},
      };
    case Actions.ON_FETCH_EMERGENCYHELP_SERVICE_DATA_ERROR:
      return {
        ...state,
        emergencyHelpServiceDataFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default ServiceDataReducer;
