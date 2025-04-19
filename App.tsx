import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { AppBackground, debugLog } from './src/Components';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import { Provider } from 'react-redux';

const App = () => {
  const { i18n } = useTranslation();
  debugLog('Test Log');

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppBackground>
          <AppNavigator />
        </AppBackground>
      </I18nextProvider>
    </Provider>
  );
};

export default App;

