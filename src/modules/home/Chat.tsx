import {View, Text, Image, KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import moment from "moment";
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../core/components/Header';
import color from '../../core/assets/color';
import MessageList from './list/MessageList';
import FooterChat from './chat/FooterChat';

export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  console.log(route, 'navigation');
  const name = route?.params.data.full_name;
  const avatar = route?.params.data.avatar;

  const customHeader = () => {
    return (
      <View style={{marginTop: 16, flexDirection: 'row'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '500',
            flex: 1,
            marginBottom: 12,
          }}>
          {name}
        </Text>
        <View style={{position: 'absolute', right: 0, bottom: 10}}>
          <View
            style={{
              backgroundColor: '#FFF',
              width: 30,
              height: 30,
              borderRadius: 15,
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              top: 8,
              left: -15,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.5,
              shadowRadius: 3,
            }}>
            <Image
              source={{
                uri: 'https://icons-for-free.com/iconfiles/png/512/phone-131964784943439862.png',
              }}
              style={{width: 18, height: 18, tintColor: color.primaryColor}}
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 26,
              width: 52,
              height: 52,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: avatar}}
              style={{width: 48, height: 48, borderRadius: 24}}
            />
          </View>
        </View>
      </View>
    );
  };

  const messages = [
    {
      id: 1,
      user_id: 1,
      avatar: '',
      message: 'Hello World!',
      image: null,
      sent_at: '2022-02-08T11:23:10+07:00',
    },
    {
      id: 2,
      user_id: 2,
      avatar: '',
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      image: null,
      sent_at: '2022-02-09T16:50:38+07:00',
    },
    {
      id: 3,
      user_id: 1,
      avatar: '',
      message: 'Contrary to popular belief, ',
      image: null,
      sent_at: '2022-02-10T09:24:10+07:00',
    },
    {
      id: 4,
      user_id: 1,
      avatar: '',
      message:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      image: null,
      sent_at: '2022-02-10T09:24:20+07:00',
    },
    {
      id: 5,
      user_id: 1,
      avatar: '',
      message:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. Lorem Ipsum is not simply random text.',
      image: null,
      sent_at: '2022-02-10T09:24:38+07:00',
    },
    {
      id: 6,
      user_id: 2,
      avatar: '',
      message:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      image: null,
      sent_at: '2022-02-10T09:25:38+07:00',
    },
    {
      id: 7,
      user_id: 2,
      avatar: '',
      message:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. ...',
      image: null,
      sent_at: '2022-02-10T09:28:38+07:00',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <Header title="" goBack={goBack} customHeader={customHeader()} />
      <MessageList data={messages} />
      <FooterChat />
    </KeyboardAvoidingView>
  );
}
