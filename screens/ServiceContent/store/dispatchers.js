import Actions from './actions';

function getServiceContent(serviceName, pageId) {
  return {
    type:
      pageId && pageId > 1
        ? Actions.FETCH_MORE_SERVICE_CONTENT
        : Actions.FETCH_SERVICE_CONTENT,
    serviceName,
    pageId,
  };
}

export {getServiceContent};
