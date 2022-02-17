import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useState, useEffect, useReducer} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../core/components/Header';
import ContactList from './list/ContactList';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../core/assets/color';
import {saveUserInfo} from '../../actions/auth';

export default function Contact() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const account = useSelector((state: any) => state.accountReducer);
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void;
  console.log(account, 'acc');
  const [data, setData] = useState([]);
  const goBack = () => navigation.goBack();
  useEffect(() => {
    async function getListUser() {
      try {
        database()
          .ref('users')
          .on('value', (snap: any) => {
            const uuid: string = auth().currentUser.uid;
            let users: any = [];
            snap.forEach(async (item: any) => {
              if (item.val().id === uuid) {
                dispatch(
                  saveUserInfo({
                    ...account,
                    name: item.val().full_name,
                    id: item.val().id,
                    email: item.val().email,
                  }),
                );
              } else {
                let obj = item.val();
                database()
                  .ref('messages')
                  .child(uuid)
                  .child(item.val().id)
                  .limitToLast(1)
                  .on('value', (data: any) => {
                    data.forEach((value: any) => {
                      obj.timestamp = value.val().data.sent_at;
                      obj.message = value.val().data.message;
                      obj.sender = value.val().data.sender;
                    });
                  });
                users.push(obj);
              }
            });
            console.log(users, 'users');
            setData(users);
          });
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(async () => {
      await getListUser();
      forceUpdate();
    }, 100);
  }, []);

  // useEffect(() => {
  //   const onChildAdd = database()
  //     .ref('messages')
  //     .on('child_added', snapshot => {
  //       DeviceEventEmitter.addListener('updateListChat', updateListChat);
  //     });
  //
  //   return () => {
  //     database().ref('messages').off('child_added', onChildAdd);
  //     DeviceEventEmitter.removeListener('updateListChat', updateListChat);
  //   };
  // }, []);

  const getLastMessage = async (userId: string) => {
    try {
      return await database()
        .ref('messages')
        .child(auth().currentUser.uid)
        .child(userId)
        .limitToLast(1);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Auth')
      })
      .catch(error => {
        console.log(error, 'Error sign out');
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        title="Contact"
        goBack={goBack}
        showBackIcon={false}
        customHeader={
          <View
            style={{
              borderRadius: 8,
              height: 32,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'white',
              marginTop: 16,
              paddingHorizontal: 8,
              justifyContent: 'center',
            }}>
            {/* change to icon */}
            <Icon name="search-outline" size={16} color={color.borderColor} />
            <TextInput
              placeholder="Search"
              style={{flex: 1, padding: 0, fontSize: 12, marginLeft: 8}}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={signOut}>
            <Icon name="log-out-outline" color="white" size={20} />
          </TouchableOpacity>
        }
      />
      <ContactList data={data} userId={account.id} />
    </View>
  );
}
