import types from './types';

export const saveUserInfo = (data: any) => ({
  type: types.SAVE_INFO_USER,
  data,
});
