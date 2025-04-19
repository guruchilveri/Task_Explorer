/**
 * @format
 */

import './gesture-handler';  
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import i18n from './src/language/i18n';     // eslint-disable-line @typescript-eslint/no-unused-vars

AppRegistry.registerComponent(appName, () => App);
