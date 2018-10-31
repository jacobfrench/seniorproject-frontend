import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import reducers from 'app/src/redux/reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authToken', 'user', 'settings', 'business']
}

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(
    persistedReducer, 
    {}, 
    applyMiddleware(ReduxThunk)
);

let persistor = persistStore(store);

export {
    store,
    persistor
}
