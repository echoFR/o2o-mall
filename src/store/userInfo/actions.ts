import {
  userInfoType,
  UPDATE_USER,
  DELETE_USER,
  userInfoActionTypes
} from './types'

export const updateUserInfo = (userInfo: userInfoType): userInfoActionTypes => {
  return {
    type: UPDATE_USER,
    payload: userInfo
  }
}
export const deleteUserInfo = (): userInfoActionTypes => {
  return {
    type: DELETE_USER
  }
}