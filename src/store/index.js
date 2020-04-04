import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '@/sagas';
import rootReducers from '@/store/reducers';

const rootPersistConfig = {
  key: 'root',
  storage,
  debug: true,
  whitelist: ['schedule'],
  transforms: [createWhitelistFilter('schedule', ['schedule.result'])],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const reducers = persistCombineReducers(rootPersistConfig, { ...rootReducers });

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, composeEnhancers);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
