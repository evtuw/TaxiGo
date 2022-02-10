import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import color from '../../core/assets/color';
import {useNavigation} from '@react-navigation/native';
import Header from '../../core/components/Header';
const {height, width} = Dimensions.get('window');

export default function ConfirmOTP() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const onSignIn = () => navigation.navigate('Contact', {});

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        title=""
        goBack={goBack}
        customHeader={
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#FFF'}}>
              Phone Verification
            </Text>
            <Text style={{fontSize: 12, color: '#FFF', marginTop: 8}}>
              Enter your OTP code here
            </Text>
          </View>
        }
      />
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 32, flex: 1}}>
          <Text style={{fontWeight: '500'}}>
            Enter the 4 digit code we just sent to
          </Text>
          <Text
            style={{
              color: color.primaryColor,
              marginTop: 8,
              fontWeight: '500',
            }}>
            +0123222223
          </Text>

          <View style={{flexDirection: 'row', marginTop: 32}}>
            <View style={styles.viewInput}>
              <TextInput
                placeholder="-"
                autoFocus
                keyboardType="numeric"
                style={{fontWeight: 'bold'}}
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                placeholder="-"
                keyboardType="numeric"
                style={{fontWeight: 'bold'}}
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                placeholder="-"
                keyboardType="numeric"
                style={{fontWeight: 'bold'}}
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                placeholder="-"
                keyboardType="numeric"
                style={{fontWeight: 'bold'}}
              />
            </View>
          </View>
        </View>
        <View>
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
              width: 48 * 4 + 60,
              alignSelf: 'center',
              elevation: 10,
              // marginVertical: 10
            }}
            onPress={onSignIn}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#99A4AE',
    marginHorizontal: 8,
    paddingHorizontal: 16,
    width: 48,
    justifyContent: 'center',
  },
});
