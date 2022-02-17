import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../core/components/Header';
import color from '../../core/assets/color';
import MessageList from './list/MessageList';
import FooterChat from './chat/FooterChat';
import {receiveMessage, sendMessage} from './chat/Message';
import {useSelector} from 'react-redux';

export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();
  const account = useSelector((state: any) => state.accountReducer);
  const currentUserId = auth().currentUser.uid;
  const goBack = () => navigation.goBack();
  const name = route?.params.data.full_name;
  const avatar = route?.params.data.avatar;
  const guestId = route?.params.data.id;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getListMessage() {
      try {
        database()
          .ref('messages')
          .child(currentUserId)
          .child(guestId)
          .on('value', (snapshot: any) => {
            let message = [];
            snapshot.forEach((item: any) => {
              message.push({
                user_id: item.val().data.sender === account.id ? 1 : 2,
                message: item.val().data.message,
                sent_at: item.val().data.sent_at,
                id: Math.random(),
              });
            });
            setMessages(message.reverse());
          });
      } catch (e) {
        console.log(e, 'get message failed');
      }
    }
    getListMessage();
  }, []);

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
            <Icon name="call-outline" color={color.primaryColor} size={16} />
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
              source={{
                uri:
                  avatar ||
                  'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w',
              }}
              style={{width: 48, height: 48, borderRadius: 24}}
            />
          </View>
        </View>
      </View>
    );
  };

  const send = async (text: string) => {
    if (text.trim().length > 0) {
      sendMessage(account.id, guestId, text)
        .then(() => {
          console.log('send success');
        })
        .catch(error => {
          console.log(error, 'Send error');
        });
      receiveMessage(account.id, guestId, text)
        .then(() => {
          console.log('receive success');
        })
        .catch(error => {
          console.log(error, 'receive error');
        });
    }
    DeviceEventEmitter.emit('updateListChat', guestId);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <Header title="" goBack={goBack} customHeader={customHeader()} />
      <MessageList data={messages} />
      <FooterChat onSend={send} />
    </KeyboardAvoidingView>
  );
}
