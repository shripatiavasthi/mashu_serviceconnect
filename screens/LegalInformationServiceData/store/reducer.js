import Actions from './actions';

const defaultState = {
  legalInformationServiceData: null,
  legalInformationServiceDataFetchInProgress: false,
  legalInformationServiceDatafetchSuccess: false,
  legalInformationServiceDataFetchError: null,
};

function ServiceDataReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_LEGALINFORMATION_SERVICE_DATA:
      return {
        ...state,
        legalInformationServiceDataFetchInProgress: true,
        legalInformationServiceDatafetchSuccess: false,
        legalInformationServiceDataFetchError: null,
      };
    case Actions.ON_FETCH_LEGALINFORMATION_SERVICE_DATA_SUCCESS:
      return {
        ...state,
        legalInformationServiceDataFetchInProgress: false,
        legalInformationServiceDatafetchSuccess: true,
        legalInformationServiceData: {...action.details.data},
      };
    case Actions.ON_FETCH_LEGALINFORMATION_SERVICE_DATA_ERROR:
      return {
        ...state,
        legalInformationServiceDataFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default ServiceDataReducer;
