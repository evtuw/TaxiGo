import React from 'react';
import {FlatList} from 'react-native';
import MessageItem from '../chat/MessageItem';

interface Props {
  data?: any;
}

export default function MessageList({data}: Props) {
  const keyExtractor = (item: any, index: number) => String(index);

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

  const renderItem = ({item, index}: any) => {
    const messageConvert = convertMessage(item, index);
    return <MessageItem data={messageConvert} />;
  };

  return (
    <FlatList
      inverted
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 16, backgroundColor: 'white'}}
    />
  );
}
