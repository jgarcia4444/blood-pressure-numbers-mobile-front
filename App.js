import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import Store from './redux/store.js'
const {store, persistor} = Store;

import FooterTabs from './components/navigation/FooterTabs';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loadgin={null} persistor={persistor}>
        <View style={styles.container}>
          <NavigationContainer>
            <FooterTabs />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});
