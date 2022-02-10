import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from './src/modules/auth';
import ConfirmOTPScreen from './src/modules/auth/ConfirmOTP';
import ContactScreen from './src/modules/home/Contact';
import ChatScreen from './src/modules/home/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTPScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
