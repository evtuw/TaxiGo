import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import color from '../../../core/assets/color';

interface Props {
  data?: any;
}

export default function MessageItem({data}: Props) {
  const messageItem = useRef(null);
  const convertDate = (date: any) => {
    return moment(date, 'YYYY/MM/DD HH:mm:ss ZZ')
      .utcOffset('+07:00')
      .format('DD/MM/YYYY');
  };

  const convertToDay = (date: any) => {
    const day = moment(date, 'YYYY/MM/DD HH:mm:ss ZZ').format('dddd');
    return `${day} ${moment(date, 'YYYY/MM/DD HH:mm:ss ZZ').format('HH:mm')}`;
  };
  const {user_id, message, sent_at} = data.currentMessage;
  const isMe = user_id === 2;
  const spaceMessage =
    data?.currentMessage?.user_id !== data?.previousMessage?.user_id;
  const day = convertDate(sent_at);
  const time = convertToDay(sent_at);
  const dayPrev = convertDate(data?.nextMessage?.sent_at);
  return (
    <View>
      {dayPrev !== day && (
        <View style={{alignSelf: 'center', marginTop: 16}}>
          <Text style={{fontSize: 12, color: color.borderColor}}>{time}</Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => messageItem.current._onCollapse()}
        // disabled={isMe}
      >

        <View
          style={{
            backgroundColor: isMe ? color.primaryColor : '#34495E',
            marginTop:
              data?.currentMessage?.user_id !== data?.nextMessage?.user_id
                ? 16
                : 2,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 16,
            alignSelf: isMe ? 'flex-start' : 'flex-end',
            maxWidth: '70%',
            borderBottomRightRadius: isMe ? 16 : !spaceMessage ? 4 : 0,
            borderBottomLeftRadius: !isMe ? 16 : spaceMessage ? 0 : 4,
          }}>
          <Text style={{color: '#FFF', lineHeight: 20, fontSize: 13}}>
            {message}
          </Text>
        </View>
        {data?.currentMessage?.user_id !== data?.previousMessage?.user_id && (
          <View
            style={[
              styles.triangle,
              {
                borderBottomColor: isMe ? color.primaryColor : '#34495E',
                transform: [{rotate: isMe ? '230deg' : '130deg'}],
                marginTop: -14,
                marginLeft: isMe ? -4 : 0,
                marginRight: isMe ? 0 : -4,
                alignSelf: isMe ? 'flex-start' : 'flex-end',
              },
            ]}
          />
        )}
      </TouchableOpacity>
      <View style={{width: '100%'}}>
        <AnimatedLayout
          ref={messageItem}
          viewContent={
            <Text
              style={{
                textAlign: isMe ? 'left' : 'right',
                color: color.borderColor,
                fontSize: 11,
                marginVertical: 4,
              }}>
              {time}
            </Text>
          }
        />
      </View>
    </View>
  );
}

const AnimatedLayout = forwardRef(({viewContent, duration}, ref) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);
  const expandStateChildList = useRef(false);

  useImperativeHandle(ref, () => ({
    _onCollapse() {
      collapseLayout();
    },
  }));

  const collapseLayout = () => {
    if (expandStateChildList.current) {
      expandStateChildList.current = false;
      Animated.timing(animatedHeight, {
        duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      expandStateChildList.current = true;
      Animated.timing(animatedHeight, {
        duration,
        toValue: contentHeight.current,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Animated.View style={[styles.viewAnimation, {height: animatedHeight}]}>
      <View
        onLayout={event =>
          (contentHeight.current = event.nativeEvent.layout.height)
        }
        style={styles.viewContent}>
        {viewContent}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  viewContent: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  viewAnimation: {
    overflow: 'hidden',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 10,
    borderBottomWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
