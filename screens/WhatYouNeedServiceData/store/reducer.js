import Actions from './actions';

const defaultState = {
  whatYouNeedServiceData: null,
  whatYouNeedServiceDataFetchInProgress: false,
  whatYouNeedServiceDataFetchSuccess: false,
  whatYouNeedServiceDataFetchError: null,
};

function ServiceDataReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_WHATYOUNEED_SERVICE_DATA:
      return {
        ...state,
        whatYouNeedServiceDataFetchInProgress: true,
        whatYouNeedServiceDataFetchSuccess: false,
        whatYouNeedServiceDataFetchError: null,
      };
    case Actions.ON_FETCH_WHATYOUNEED_SERVICE_DATA_SUCCESS:
      return {
        ...state,
        whatYouNeedServiceDataFetchInProgress: false,
        whatYouNeedServiceDataFetchSuccess: true,
        whatYouNeedServiceData: {...action.details.data}
      };
    case Actions.ON_FETCH_WHATYOUNEED_SERVICE_DATA_ERROR:
      return {
        ...state,
        whatYouNeedServiceDataFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default ServiceDataReducer;
