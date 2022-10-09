import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FooterTabs from './components/navigation/FooterTabs';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <FooterTabs />
      </NavigationContainer>
    </View>
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
