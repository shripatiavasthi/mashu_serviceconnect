import Actions from './actions';

const defaultState = {
  serviceConnect: null,
  serviceConnectFetchInProgress: false,
  serviceConnectFetchError: null,
};

function ServiceConnectReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_SERVICE_CONNECT:
      return {
        ...state,
        serviceConnectFetchInProgress: true,
        serviceConnectFetchError: null,
      };
    case Actions.ON_FETCH_SERVICE_CONNECT_SUCCESS:
      return {
        ...state,
        serviceConnectFetchInProgress: false,
        serviceConnect: {...action.details.data},
      };
    case Actions.ON_FETCH_SERVICE_CONNECT_ERROR:
      return {
        ...state,
        serviceConnectFetchInProgress: false,
        serviceConnectFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default ServiceConnectReducer;
