import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import color from '../../../core/assets/color';

interface Props {
  onSend: (text: string) => void;
}

export default function FooterChat({onSend}: Props) {
  const [message, setMessage] = React.useState('');

  const onSendMessage = () => {
    onSend(message);
    setMessage('');
  };

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
      <TextInput
        placeholder="Aaa..."
        style={{flex: 1}}
        value={message}
        onChangeText={(text: string) => setMessage(text)}
      />
      <TouchableOpacity>
        {/* icon or text */}
        <EntypoIcon name="emoji-happy" size={20} color={color.borderColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 10}} onPress={onSendMessage}>
        {/* icon or text */}
        <Icon name="send" size={20} color={color.borderColor} />
      </TouchableOpacity>
    </View>
  );
}
