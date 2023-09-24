/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar,useColorScheme,} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screen/HomeScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import TextRecognitionScreen from './src/screen/TextRecognitionScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{width:'100%',height:'100%',margin:1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TextRecognitionScreen"
              component={TextRecognitionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistoryScreen"
              component={HistoryScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
