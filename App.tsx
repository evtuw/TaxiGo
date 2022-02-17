import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import AuthScreen from './src/modules/auth';
import ConfirmOTPScreen from './src/modules/auth/ConfirmOTP';
import ContactScreen from './src/modules/home/Contact';
import ChatScreen from './src/modules/home/Chat';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/store';
const Stack = createNativeStackNavigator();
const store = createStore(reducers);

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {authenticated ? (
            <>
              <Stack.Screen name="Contact" component={ContactScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="ConfirmOTP" component={ConfirmOTPScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
