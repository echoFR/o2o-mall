import {
  userInfoType,
  UPDATE_USER,
  DELETE_USER,
  userInfoActionTypes
} from './types'

const storageUserInfo = localStorage.getItem('user_info')
const initialState: userInfoType = storageUserInfo ? JSON.parse(storageUserInfo) : {}

export const userInfoReducer = (
  state = initialState,
  actions: userInfoActionTypes
): userInfoType => {
  switch (actions.type) {
    case UPDATE_USER:
      localStorage.setItem('user_info', JSON.stringify(actions.payload))
      return actions.payload
    case DELETE_USER:
      localStorage.removeItem('user_info')
      return {}
    default:
      return state
  }
}