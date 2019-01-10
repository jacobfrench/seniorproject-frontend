import React from 'react';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { AppLoading } from 'expo';
import { store, persistor } from 'app/src/redux/store';
import {Provider as PaperProvider} from 'react-native-paper';
import Index from 'app/src';

// redux store 
// 1st argument is list of reducers
// 2nd argument is initial state
// 3rd argument is middleware (store enhancers)
const isIOS = Platform.OS === 'ios';

const fonts = {
  regular: isIOS ? 'Helvetica Neue' : 'Roboto',
  medium: isIOS ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  light: isIOS ? 'HelveticaNeue-Light' : 'sans-serif-light',
  thin: isIOS ? 'HelveticaNeue-Thin' : 'sans-serif-thin',
};
const theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: 'white',
    error: '#B00020',
    text: 'black',
    disabled: 'rgba(0, 0, 0, 0.26)',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)'
  },
  fonts
};

export default class App extends React.Component {
  

  render() {
    
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <PaperProvider theme={theme}>
            <Index/>
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
