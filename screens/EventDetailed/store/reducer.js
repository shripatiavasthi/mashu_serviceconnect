import Actions from './actions';

const defaultState = {
  detailEventDataF: null,
  detailEventDataFetchInProgress: false,
  detailEventDataFetchError: null,
};

function DetailedEventReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_DETAILED_EVENT:
      return {
        ...state,
        detailEventData: null,
        detailEventDataFetchInProgress: true,
        detailEventDataFetchError: null        
      };
    case Actions.ON_FETCH_DETAILED_EVENT_SUCCESS:
      return {
        ...state,
        detailEventDataFetchInProgress: false,
        detailEventData: action.details.data,
      };
    case Actions.ON_FETCH_DETAILED_EVENT_ERROR:
      return {
        ...state,
        detailEventDataFetchInProgress: false,
        detailEventDataFetchError: action.details.error,
      };

    default:
      return {...state};
  }
}

export default DetailedEventReducer;
