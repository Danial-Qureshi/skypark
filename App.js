import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import store from './app/store/configureStore';
import AppContainer from './app/navigation/index';
import {ThemeProvider, Button} from 'react-native-elements';
import Router from './app/Router';
import {StyleSheet} from 'react-native';
import Color from './app/common/Color';

class App extends React.Component {
  render() {
    const persistor = persistStore(store);
    const theme = {
      colors: {
        primary: Color.facebook,
        primaryDark: Color.primaryDark,
      },
    };

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
