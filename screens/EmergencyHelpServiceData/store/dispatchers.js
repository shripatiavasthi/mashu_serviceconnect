import Actions from './actions';

function getEmergencyHelpServiceData(serviceName) {
  return {type: Actions.FETCH_EMERGENCYHELP_SERVICE_DATA, serviceName};
}

export {getEmergencyHelpServiceData};
