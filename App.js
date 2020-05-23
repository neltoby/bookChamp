// import React from 'react';
// import { SafeAreaView, View, VirtualizedList, StyleSheet, Text } from 'react-native';
// import Constants from 'expo-constants';

// const VirtualizedListExample = () => {
//   const [count, setCount] = React.useState(50)
// const DATA = [];

// const getItem = (data, index) => {
//   return {
//     id: Math.random().toString(12).substring(0),
//     title: `Item ${index+1}`
//   }
// }

// const getItemCount = (data) => {
//   return count;
// }

// const Item = ({ title })=> {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <VirtualizedList
//         data={DATA}
//         initialNumToRender={8}
//         refreshing={false}
//         onRefresh={() => setCount(count + 1)}
//         renderItem={({ item }) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//         getItemCount={getItemCount}
//         getItem={getItem}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     height: 150,
//     justifyContent: 'center',
//     marginVertical: 8,
//     marginHorizontal: 16,
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//   },
//   load: {
//     width: 100,
//     padding: 2,
//     backgroundColor: 'lightblue',
//     color: 'white',
//   },
//   loading: {
//     fontSize: 14
//   }
// });

// export default VirtualizedListExample;
import 'react-native-gesture-handler';
import React, { useEffect } from "react";
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
      setTimeout(() => {
        console.log('font fetched')
        setIsReady(true)
      }, 3000);
      
    })
  }, [])
  useEffect(() => {
    
  })
  return( 
    <Provider store={store}>
      {!isReady ? <Splash /> : <Manager />}
    </Provider> 
  ) 
};

export default App;
