import Actions from './actions';
import {hasMore, addMore} from '../../../utils/PageController';

const defaultState = {  
  eventData: null,
  eventDataFetchInProgress: false,
  eventDataFetchError: null,  
  eventDataFetchMore: true,
  eventDataFetchMoreInProgress: false,
  eventDataFetchMoreError: null,  
};


function eventReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_EVENTS:
        return {
          ...state,
          eventDataFetchInProgress: true,
          eventDataFetchError: null,
        };
      case Actions.ON_FETCH_EVENTS_SUCCESS:
        return {
          ...state,
          eventDataFetchInProgress: false,
          eventData: {...action.details.data},
          eventDataFetchMore: hasMore(action.details.data),
        };
      case Actions.ON_FETCH_EVENTS_ERROR:
        return {
          ...state,
          eventDataFetchInProgress: false,
          eventDataFetchError: action.details.error,
          eventDataFetchMore: false,
        };
        
    case Actions.FETCH_MORE_EVENTS:
      return {
        ...state,
        eventDataFetchMoreInProgress: true,
        eventDataFetchMoreError: null,
      };
    case Actions.ON_FETCH_MORE_EVENTS_SUCCESS:
      return {
        ...state,
        eventDataFetchMoreInProgress: false,
        eventData: addMore(state.eventData, action.details.data),
        eventDataFetchMore: hasMore(action.details.data),
      };
    case Actions.ON_FETCH_MORE_EVENTS_ERROR:
      return {
        ...state,
        eventDataFetchMoreInProgress: false,
        eventDataFetchMoreError: action.details.error,
        eventDataFetchMore: false,
      };  
    default:
      return {...state};
  }
}

export default eventReducer