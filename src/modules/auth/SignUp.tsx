import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import color from '../../core/assets/color';
import {useNavigation} from '@react-navigation/native';
import FirebaseService from '../../../FirebaseConfig';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const confirmOtp = () =>
    navigation.navigate('ConfirmOTP', {
      mobile: '',
    });

  const onChangeEmail = (text: string) => setEmail(text);

  const onChangePassword = (text: string) => setPassword(text);

  const onChangePhone = (text: string) => setPhone(text);

  const onChangeName = (text: string) => setName(text);

  const onSignUp = async () => {
    await FirebaseService.createAccount({email, password, name, phone}, loginSuccess);
  };

  const loginSuccess = () => {
    console.log('success');
    alert('Sign up successful')
  };

  const loginFailed = () => {
    alert('Login failed, please try again.');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 16}}>
        {/*
        <View style={{flexDirection: 'row'}}>
          <View style={styles.viewInput}>
            <TextInput
              value={email}
              placeholder="Email"
              style={{flex: 1, paddingHorizontal: 8}}
              onChangeText={onChangeEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.viewInput, {marginLeft: 8}]}>
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
        <View style={[styles.viewInput, {marginTop: 8, flex: 0}]}>
          <TextInput
            value={email}
            placeholder="Email"
            style={{flex: 1, paddingHorizontal: 8}}
            onChangeText={onChangeEmail}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              borderWidth: 1,
              height: 48,
              flexDirection: 'row',
              borderColor: '#99A4AE',
              paddingHorizontal: 8,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png',
              }}
              style={{width: 24, height: 18, marginRight: 8, borderRadius: 2}}
            />
            <Icon name="caretdown" color={color.primaryColor} />
          </TouchableOpacity>
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
              onChangText={onChangePhone}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btnSignUp} onPress={onSignUp}>
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
  viewInput: {
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#99A4AE',
    flex: 1,
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
