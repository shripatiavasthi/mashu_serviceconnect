import Actions from './actions';

function getJobAssistanceServiceData(serviceName) {  
  return {type: Actions.FETCH_JOBASSISTANCE_SERVICE_DATA, serviceName};
}

export {getJobAssistanceServiceData};
