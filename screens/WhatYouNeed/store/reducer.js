import Actions from './actions';

const defaultState = {
  whatYouNeed: null,
  whatYouNeedFetchInProgress: false,
  whatYouNeedFetchSuccess: false,
  whatYouNeedFetchError: null,
};

function WhatYouNeedReducer(state = defaultState, action) {
  switch (action.type) {
    case Actions.FETCH_WHATYOUNEED_SERVICES:
      return {
        ...state,
        whatYouNeedFetchInProgress: true,
        whatYouNeedFetchSuccess: false,
        whatYouNeedFetchError: null,
      };
    case Actions.ON_FETCH_WHATYOUNEED_SERVICES_SUCCESS:
      return {
        ...state,
        whatYouNeedFetchInProgress: false,
        whatYouNeedFetchSuccess: true,
        whatYouNeed: {...action.details.data},
      };
    case Actions.ON_FETCH_WHATYOUNEED_SERVICES_ERROR:
      return {
        ...state,
        whatYouNeedFetchError: action.details.error,
      };
    default:
      return {...state};
  }
}

export default WhatYouNeedReducer;
