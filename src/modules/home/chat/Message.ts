import database from '@react-native-firebase/database';
import moment from 'moment';
export const sendMessage = async (currentId, guestId, message) => {
  try {
    return await database()
      .ref('messages/' + currentId)
      .child(guestId)
      .push({
        data: {
          sender: currentId,
          receiver: guestId,
          message,
          sent_at: moment().format(),
          image: null,
        },
      });
  } catch (e) {
    console.log(e, 'Send message failed!');
  }
};

export const receiveMessage = async (currentId, guestId, message) => {
  try {
    return await database()
      .ref('messages/' + guestId)
      .child(currentId)
      .push({
        data: {
          sender: currentId,
          receiver: guestId,
          message,
          sent_at: moment().format(),
          image: null,
        },
      });
  } catch (e) {
    console.log(e, 'Send message failed!');
  }
};
