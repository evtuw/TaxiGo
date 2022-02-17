import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  message?: string;
}

function ContactItem({message}: Props) {
  return <Text>{message}</Text>;
}

export default ContactItem;
