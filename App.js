import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { Root } from "native-base";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer'
import Manager from './component/Manager';
import Splash from './component/Splash';

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  const [isReady, setIsReady] = React.useState(false)
  useEffect(() => {
    async function fetchFont() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      
    }
    fetchFont().then(() => {
      // setTimeout(() => {
        setIsReady(true)
      // }, 1000);      
    })
  }, [])
  return( 
    <Provider store={store}>
      {!isReady ? <Splash /> : <Root><ActionSheetProvider><Manager /></ActionSheetProvider></Root>}
    </Provider> 
  ) 
};

export default App;
