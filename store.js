import reducers from './reducer.js';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootSaga from './saga';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import * as crashlytics from './utils/Crashlytics';

// import Session from 'utils/Session';
// import dispatchers from 'screens/shared/store/dispatchers';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers),
);

// AsyncStorage.getAllKeys().then(keyArray => {
//   AsyncStorage.multiGet(keyArray).then(keyValArray => {
//     let myStorage = {};
//     for (let keyVal of keyValArray) {
//       myStorage[keyVal[0]] = keyVal[1];
//     }

//     //crashlytics.log('CURRENT STORAGE: ', myStorage);
//   });
// });

const sagaMiddleware = createSagaMiddleware({
  onError: error => {
    //crashlytics.log('error from root store.js', error);
    // handle global errors over here
    // if (error && error.status === 400) {
    //   // remove the token from the storage,
    //   // user should be logged in again, this is a bad request
    //   Session.remove().then((_) => {
    //     // dispatch an action, in order for the app to be navigated
    //     // to the login page
    //     store.dispatch(dispatchers.setIsSignedStatus({status: false}));
    //   });
    // }
  },
});

const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(persistedReducer, middleware);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor, sagaMiddleware};
