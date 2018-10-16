import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { AppLoading } from 'expo';
import { store, persistor } from 'app/src/redux/store';
import Index from 'app/src';

// redux store 
// 1st argument is list of reducers
// 2nd argument is initial state
// 3rd argument is middleware (store enhancers)

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <Index/>
        </PersistGate>
      </Provider>
    );
  }
}
