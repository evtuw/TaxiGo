import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';
import Header from '../../core/components/Header';
import ContactList from './list/ContactList';
import {useNavigation} from '@react-navigation/native';

export default function Contact() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        title="Contact"
        goBack={goBack}
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
            <Image
              source={{
                uri: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png',
              }}
              style={{width: 20, height: 20}}
            />
            <TextInput
              placeholder="Search"
              style={{flex: 1, padding: 0, fontSize: 12, marginLeft: 8}}
            />
          </View>
        }
      />
      <ContactList
        data={[
          {
            id: 1,
            full_name: 'React Native',
            timestamp: Date.now(),
            avatar:
              'https://1.bp.blogspot.com/-i8-SQ2h9Ho4/YMLNCK1TzJI/AAAAAAAAOpY/4ZV5QpXGhyMTJjR0I1ZBKu2HRbcPOFC_ACLcBGAsYHQ/s2048/7-Thanyarat-Charoenpornkittada.jpg',
          },
          {
            id: 2,
            full_name: 'Flutter',
            timestamp: Date.now(),
            avatar:
              'https://1.bp.blogspot.com/-JAlX7iYNboE/Xn9BkJvUVcI/AAAAAAAAOLQ/6rr2xPKvPNYjXs91hnLI1qNuoqJf13HPwCLcBGAsYHQ/s1600/Thailand%2Bmodel%2B-%2BThanyarat%2BCharoenpornkittada%2B-%2BStay%2Bat%2Bhome%2Bwith%2Bbeautiul%2Bcat%2B-%2BTruePic.net%2B%252826%2529.jpg',
          },
          {
            id: 3,
            full_name: 'Xamarin',
            timestamp: Date.now(),
            avatar:
              'https://dichvucali.com/sites/default/files/gallery/2021-04/Thanyarat%20Charoenpornkittada%20%282%29.JPG',
          },
        ]}
      />
    </View>
  );
}
