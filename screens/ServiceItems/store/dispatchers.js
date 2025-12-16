import Actions from './actions';

function getServiceItem(serviceName, pageId) {
  return {
    type:
      pageId && pageId > 1
        ? Actions.FETCH_MORE_SERVICE_ITEM
        : Actions.FETCH_SERVICE_ITEM,
    serviceName,
    pageId,
  };
}

export {getServiceItem};
