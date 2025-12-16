import Actions from './actions';
import {hasMore} from '../../../utils/PageController';

const defaultState = {
  serviceContentMap: {},
  serviceContentFetchInProgress: false,
  serviceContentFetchError: null,
  serviceContentFetchMore: true,
  serviceContentFetchMoreInProgress: false,
  serviceContentFetchMoreError: null,
};

function ServiceContentReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_SERVICE_CONTENT:
      return {
        ...state,
        serviceContentFetchInProgress: true,
        serviceContentFetchError: null,
      };
    case Actions.ON_FETCH_SERVICE_CONTENT_SUCCESS:
      const map = {...state.serviceContentMap} 
      map[action.serviceName] = action.details.data
      return {
        ...state,
        serviceContentFetchInProgress: false,
        serviceContentMap: map,
        serviceContentFetchMore: hasMore(action.details.data),
      };
    case Actions.ON_FETCH_SERVICE_CONTENT_ERROR:
      return {
        ...state,
        serviceContentFetchInProgress: false,
        serviceContentFetchError: action.details.error,
        serviceContentFetchMore: false
      };

    case Actions.FETCH_MORE_SERVICE_CONTENT:
      return {
        ...state,
        serviceContentFetchMoreInProgress: true,
        serviceContentFetchMoreError: null,
      };
    case Actions.ON_FETCH_MORE_SERVICE_CONTENT_SUCCESS:
      const mapMore = {...state.serviceContentMap};     
      let data = mapMore[action.serviceName];        
      data.list = [...data.list, ...action.details.data.list];
      mapMore[action.serviceName] = data;      
      return {
        ...state,
        serviceContentFetchMoreInProgress: false,
        serviceContentMap: mapMore,
        serviceContentFetchMore: hasMore(action.details.data),
      };
    case Actions.ON_FETCH_MORE_SERVICE_CONTENT_ERROR:
      return {
        ...state,
        serviceContentFetchMoreInProgress: false,
        serviceContentFetchMoreError: action.details.error,
        serviceContentFetchMore: false
      };
    default:
      return {...state};
  }
}

export default ServiceContentReducer;
