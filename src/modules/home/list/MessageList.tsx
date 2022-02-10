import React from 'react';
import {View, Text, FlatList} from 'react-native';
import moment from 'moment';
import color from '../../../core/assets/color';

interface Props {
  data?: any;
}

export default function MessageList({data}: Props) {
  const keyExtractor = (item: any) => String(item.id);

  const convertMessage = (item, index) => {
    const newItem: any = {};
    newItem.currentMessage = item;

    if (index > 0) {
      newItem.previousMessage = data[index - 1];
    } else {
      newItem.previousMessage = {};
    }

    if (index + 1 <= data.length - 1) {
      newItem.nextMessage = data[index + 1];
    } else {
      newItem.nextMessage = {};
    }

    return newItem;
  };

  const convertDate = (date: any) => {
    return moment(date, 'YYYY/MM/DD HH:mm:ss ZZ')
      .utcOffset('+07:00')
      .format('DD/MM/YYYY');
  };

  const convertToDay = (date: any) => {
    const day = moment(date, 'YYYY/MM/DD HH:mm:ss ZZ').format('dddd');
    return `${day} ${moment(date, 'YYYY/MM/DD HH:mm:ss ZZ').format('HH:mm')}`;
  };

  const renderItem = ({item, index}: any) => {
    const messageConvert = convertMessage(item, index);
    const {user_id, message, sent_at} = messageConvert.currentMessage;
    const isMe = user_id === 1;
    const spaceMessage =
      messageConvert?.currentMessage?.user_id !==
      messageConvert?.nextMessage?.user_id;
    const day = convertDate(sent_at);
    const time = convertToDay(sent_at);
    const dayPrev = convertDate(messageConvert?.previousMessage?.sent_at);
    return (
      <View>
        {dayPrev !== day && (
          <View style={{alignSelf: 'center', marginTop: 16}}>
            <Text style={{fontSize: 12, color: color.borderColor}}>{time}</Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: isMe ? color.primaryColor : '#34495E',
            marginTop:
              messageConvert?.currentMessage?.user_id !==
              messageConvert?.previousMessage?.user_id
                ? 16
                : 2,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 16,
            alignSelf: isMe ? 'flex-start' : 'flex-end',
            maxWidth: '70%',
            borderBottomRightRadius: isMe ? 16 : !spaceMessage ? 8 : 0,
            borderBottomLeftRadius: !isMe ? 16 : spaceMessage ? 0 : 8,
          }}>
          <Text style={{color: '#FFF', lineHeight: 20, fontSize: 13}}>
            {message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 16}}
    />
  );
}
