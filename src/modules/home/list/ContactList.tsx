import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import color from '../../../core/assets/color';
import {useNavigation} from '@react-navigation/native';

interface Props {
  data?: any;
}

export default function ContactList({data}: Props) {
  const navigation = useNavigation();

  const onPressItem = (data: any) =>
    navigation.navigate('Chat', {
      data,
    });

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
      }}
      onPress={() => onPressItem(item)}>
      <Image
        source={{uri: item.avatar}}
        style={{width: 50, height: 50, borderRadius: 25}}
        resizeMode="cover"
      />
      <Text
        style={{
          color: '#22313F',
          marginLeft: 16,
          fontWeight: 'bold',
          fontSize: 13,
          flex: 1,
        }}>
        {item.full_name}
      </Text>
      <Text style={{color: color.primaryColor, fontSize: 12}}>
        {new Date(item.timestamp).getHours()}:
        {new Date(item.timestamp).getMinutes()}
      </Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item: any) => String(item.id);

  const renderSeparator = () => (
    <View style={{height: 0.5, backgroundColor: '#CCC'}} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 16}}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}
