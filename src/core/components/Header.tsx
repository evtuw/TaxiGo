import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import color from '../assets/color';

interface Props {
  title?: string;
  titleColor?: string;
  showBackIcon?: boolean;
  customHeader?: any;
  rightComponent?: any;
  headerHeight?: number;
  goBack?: () => void;
}

export default function Header({
  title,
  titleColor,
  showBackIcon,
  customHeader,
  headerHeight,
  rightComponent,
  goBack,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: color.primaryColor,
        height: headerHeight,
        paddingHorizontal: 16,
        justifyContent: 'center',
        paddingTop: 56,
        paddingBottom: 12,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={goBack} style={{width: 40}}>
            {/* change to icon */}
          <Image
            style={{width: 30, height: 30, tintColor: '#FFF'}}
            source={{uri: 'https://i.dlpng.com/static/png/6787200_preview.png'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: 'white',
            textTransform: 'uppercase',
            fontWeight: '600',
          }}>
          {title}
        </Text>
        <View style={{width: 40}}>{rightComponent}</View>
      </View>
      {customHeader}
    </View>
  );
}
