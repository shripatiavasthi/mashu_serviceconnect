import Actions from './actions';

function getWhatYouNeedServiceData(serviceName) {  
  return {type: Actions.FETCH_WHATYOUNEED_SERVICE_DATA, serviceName};
}

export {getWhatYouNeedServiceData};
