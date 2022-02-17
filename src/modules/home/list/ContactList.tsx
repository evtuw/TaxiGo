import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import moment from 'moment';
import color from '../../../core/assets/color';
import {useNavigation} from '@react-navigation/native';

interface Props {
  data?: any;
  userId?: string;
}

export default function ContactList({data, userId}: Props) {
  const navigation = useNavigation();

  const onPressItem = (data: any) =>
    navigation.navigate('Chat', {
      data,
    });

  const convertDate = (date: any) => {
    return moment(date).format('HH:mm');
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
      onPress={() => onPressItem(item)}>
      <Image
        source={{
          uri:
            item.avatar ||
            'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w',
        }}
        style={{width: 50, height: 50, borderRadius: 25}}
        resizeMode="cover"
      />
      <Text
        style={{
          color: '#22313F',
          fontWeight: 'bold',
          fontSize: 13,
          flex: 1,
          marginLeft: 12,
        }}>
        {item.full_name}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 11,
            color: color.primaryColor,
            lineHeight: 20,
            marginLeft: 8,
          }}>
          {convertDate(item.timestamp) || ''}
        </Text>
      </View>

      {/*<Text style={{color: color.primaryColor, fontSize: 12}}>*/}
      {/*  {new Date(item.timestamp).getHours()}:*/}
      {/*  {new Date(item.timestamp).getMinutes()}*/}
      {/*</Text>*/}
    </TouchableOpacity>
  );

  const keyExtractor = (item: any) => String(item.id);

  const renderSeparator = () => (
    <View style={{height: 1, backgroundColor: '#CCC', marginHorizontal: 8}} />
  );

  return (
    <FlatList
      // extraData={data}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{paddingHorizontal: 16}}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}
