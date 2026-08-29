import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
