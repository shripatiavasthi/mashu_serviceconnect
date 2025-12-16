export const dataSelector = ({notification}) => notification.notifData;
export const fetchInProgressSelector = ({notification}) =>  notification.notifDataFetchInProgress;
export const fetchErrorSelector = ({notification}) => notification.notifDataFetchError;
export const fetchMoreInProgressSelector = ({notification}) =>  notification.notifDataFetchMoreInProgress;
export const fetchMoreSelector = ({notification}) => notification.notifDataFetchMore;
export const readListSelector = notifId=> ({ notification }) => notification.readListMap && notification.readListMap[notifId] != null

   