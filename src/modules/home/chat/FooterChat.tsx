import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import color from '../../../core/assets/color';

interface Props {}

export default function FooterChat({}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.borderColor,
        height: 40,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderRadius: 32,
        marginVertical: 16,
        marginHorizontal: 16,
      }}>
      <TextInput placeholder="Aaa..." style={{flex: 1}} />
      <TouchableOpacity>
        {/* icon or text */}
        <Text style={{color: color.primaryColor}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}
