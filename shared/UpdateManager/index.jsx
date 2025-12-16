import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';
import * as crashlytics from '../../utils/Crashlytics';

const UpdateManager = props => {
  const inAppUpdates = new SpInAppUpdates(__DEV__);
  inAppUpdates
    .checkNeedsUpdate()
    .then(result => {
      if (result.shouldUpdate) {
        let updateOptions = {};
        if (Platform.OS === 'android') {
          // android only, on iOS the user will be promped to go to your app store page
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    })
    .catch(error => crashlytics.log(error));

  return props.children;
};

export default UpdateManager;
