import Actions from './actions';
import {hasMore} from '../../../utils/PageController';

const defaultState = {
  serviceItemMap: {},
  serviceItemFetchInProgress: false,
  serviceItemFetchError: null,
  serviceItemFetchMore: true,
  serviceItemFetchMoreInProgress: false,
  serviceItemFetchMoreError: null,
};

function ServiceItemReducer(state = defaultState, action) {
  switch (action.type) {   
    case Actions.FETCH_SERVICE_ITEM:
      return {
        ...state,
        serviceItemFetchInProgress: true,
        serviceItemFetchError: null,
      };
    case Actions.ON_FETCH_SERVICE_ITEM_SUCCESS:    
      const map = {...state.serviceItemMap} 
      map[action.serviceName] = action.details.data
      return {
        ...state,
        serviceItemFetchInProgress: false,
        serviceItemMap: map,
        serviceItemFetchMore: hasMore(action.details.data.sections[0]),
      };
    case Actions.ON_FETCH_SERVICE_ITEM_ERROR:
      return {
        ...state,
        serviceItemFetchInProgress: false,
        serviceItemFetchError: action.details.error,
        serviceItemFetchMore: false
      };

    case Actions.FETCH_MORE_SERVICE_ITEM:
      return {
        ...state,
        serviceItemFetchMoreInProgress: true,
        serviceItemFetchMoreError: null,
      };
    case Actions.ON_FETCH_MORE_SERVICE_ITEM_SUCCESS:
      const mapMore = {...state.serviceItemMap};     
      let data = mapMore[action.serviceName];        
      data.sections[0].list = [...data.sections[0].list, ...action.details.data.sections[0].list];
      mapMore[action.serviceName] = data;      
      return {
        ...state,
        serviceItemFetchMoreInProgress: false,
        serviceItemMap: mapMore,
        serviceItemFetchMore: hasMore(action.details.data.sections[0]),
      };
    case Actions.ON_FETCH_MORE_SERVICE_ITEM_ERROR:
      return {
        ...state,
        serviceItemFetchMoreInProgress: false,
        serviceItemFetchMoreError: action.details.error,
        serviceItemFetchMore: false
      };
      
    default:
      return {...state};
  }
}

export default ServiceItemReducer;
