import Actions from './actions';

function getServices(serviceName) {
  return {type: Actions.FETCH_MAIN_SERVICE, serviceName};
}

export {getServices};
