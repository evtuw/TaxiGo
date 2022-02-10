import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import color from '../../core/assets/color';

const Triangle = () => {
  return <View style={[styles.triangle]} />;
};

export default function SignIn() {
  const navigation = useNavigation();

  const confirmOtp = () =>
    navigation.navigate('ConfirmOTP', {
      mobile: '',
    });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 16}}>
        <View
          style={{
            borderRadius: 8,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontWeight: '600'}}>
            Login with your Phone Number
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              height: 48,
              flexDirection: 'row',
              borderColor: '#99A4AE',
              //   paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://www.pngall.com/wp-content/uploads/2016/05/Vietnam-Flag-PNG.png',
              }}
              style={{width: 24, height: 24, marginLeft: 8}}
            />
            <Triangle />
          </View>
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              height: 48,
              alignItems: 'center',
              flexDirection: 'row',
              borderColor: '#99A4AE',
              flex: 1,
              marginLeft: 16,
              paddingHorizontal: 16,
            }}>
            <Text style={{fontWeight: 'bold'}}>+84</Text>
            <TextInput
              placeholder="Phone Number"
              style={{flex: 1, paddingHorizontal: 8}}
              keyboardType="numeric"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color.primaryColor,
            borderRadius: 8,
            marginTop: 24,
            shadowColor: color.primaryColor,
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 1.5,
            shadowRadius: 5,
            elevation: 10,
          }}
          onPress={confirmOtp}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: color.primaryColor,
    transform: [{rotate: '180deg'}],
    marginHorizontal: 12,
    borderRadius: 3,
  },
});
