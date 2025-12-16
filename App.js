import React from 'react';

import {ThemeProvider} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import DrawerNavigation from './navigation/drawer-navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import themeConfig from './config/theme.config';
import NetInfoView from './settings/NetStatus';
import {persistor, store} from './store';
import LanguageSelector from './settings/Language';
import SettingsLoader from './settings';
import Toast from 'react-native-toast-message';
import StatusBar from './shared/StatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    // <UpdateManager>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={themeConfig}>
          <GestureHandlerRootView style={styles.root}>
            <StatusBar />
            <SafeAreaView style={styles.safeArea}>
              <LanguageSelector>
                <>
                  <NetInfoView />
                  <SettingsLoader />
                  <DrawerNavigation />
                  <Toast
                    position="bottom"
                    bottomOffset={10}
                    visibilityTime={1000}
                  />
                </>
              </LanguageSelector>
            </SafeAreaView>
          </GestureHandlerRootView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    // </UpdateManager>
  );
};

const styles = ScaledSheet.create({
  root: { flex: 1 },
  safeArea: {flex: 1},
});

export default App;
