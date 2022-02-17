import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../../core/assets/color';
import FirebaseService from '../../../FirebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import {saveUserInfo} from '../../actions/auth';

const Triangle = () => {
  return <View style={[styles.triangle]} />;
};

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('tester009@gmail.com');
  const [password, setPassword] = useState('123456');
  const dispatch = useDispatch();
  const accountReducer = useSelector((state: any) => state.accountReducer);
  console.log(accountReducer, 'accountReducer');
  const confirmOtp = () =>
    navigation.navigate('ConfirmOTP', {
      mobile: '',
    });

  const onChangeEmail = (text: string) => setEmail(text);

  const onChangePassword = (text: string) => setPassword(text);

  const onLogin = async () => {
    await FirebaseService.login({email, password}, loginSuccess);
  };

  const loginSuccess = (user: any) => {
    const data = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: user.token,
    };
    dispatch(saveUserInfo(data));
    confirmOtp();
  };

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

        {/*
        <View>
          <View style={styles.viewInput}>
            <TextInput
              value={email}
              placeholder="Email"
              style={{flex: 1, paddingHorizontal: 8}}
              onChangeText={onChangeEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.viewInput, {marginTop: 8}]}>
            <TextInput
              value={password}
              placeholder="Password"
              secureTextEntry
              style={{flex: 1, paddingHorizontal: 8}}
              onChangeText={onChangePassword}
            />
          </View>
        </View>
        */}
        <TouchableOpacity style={styles.btnSignUp} onPress={onLogin}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}>
            Sign In
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
  viewInput: {
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#99A4AE',
    // flex: 1,
  },
  btnSignUp: {
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
  },
});
