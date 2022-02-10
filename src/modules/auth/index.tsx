import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import color from '../../core/assets/color';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        // swipeEnabled: true,
        tabBarStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 58,
          justifyContent: 'center',
        },
        tabBarActiveTintColor: color.primaryColor,
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: {backgroundColor: color.primaryColor, height: 3},
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: '500',
          textTransform: 'capitalize',
        },
      }}>
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: 'Sign Up',
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarLabel: 'Sign In',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AuthScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.primaryColor,
            height: height / 2.2,
            // position: 'absolute',
            width,
          }}>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: '#FFF'}}>
            TAXI LOGO
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.viewLogin}>
            <MyTabs />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 16,
            }}>
            <TouchableOpacity style={styles.buttonSocial}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsql4NBewWmDAG1GbjsA8rZ4T4mkTa6IFxgizZ_u1J_xJMniXJXPBXCRj6HGHn_orlmWU&usqp=CAU',
                }}
                style={{width: 16, height: 16}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSocial}>
              <Image
                source={{
                  uri: 'https://banner2.cleanpng.com/20180324/sbe/kisspng-google-logo-g-suite-google-5ab6f1f0dbc9b7.1299911115219389289003.jpg',
                }}
                style={{width: 16, height: 16}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSocial}>
              <Image
                source={{
                  uri: 'https://e7.pngegg.com/pngimages/102/834/png-clipart-logo-instagram-pinterest-facebook-inc-instagram-text-logo-thumbnail.png',
                }}
                style={{width: 16, height: 16}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSocial}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/5060/5060225.png',
                }}
                style={{width: 16, height: 16}}
              />
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            By signing in you agree to our{' '}
            <Text style={{textDecorationLine: 'underline'}}>Terms of use</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSocial: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderColor: color.borderColor,
  },
  viewLogin: {
    // position: 'absolute',
    backgroundColor: '#FFF',
    zIndex: 100,
    width: width - 40,
    height: width / 1.35,
    // top: width - 64,
    marginTop: -58,
    shadowColor: color.primaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: 10,
    paddingBottom: 8,
    alignSelf: 'center',
    marginBottom: width / 7.5,
  },
});
