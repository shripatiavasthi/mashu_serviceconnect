import Actions from './actions';

function getLegalInformationServiceData(serviceName) {
  return {type: Actions.FETCH_LEGALINFORMATION_SERVICE_DATA, serviceName};
}

export {getLegalInformationServiceData};
