// State
export interface userInfoType {
  id?: number,
  infoId?: number,
  username?: string,
  name?: string,
  sex?: 0 | 1,
  birthday?: string,
  phone?: string,
  address?: string,
  token?: string,
  isAdmin?: boolean
}
// Actions type
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

// Action Creators
interface updateUserInfo {
  type: typeof UPDATE_USER,
  payload: userInfoType
}
interface deleteUserInfo {
  type: typeof DELETE_USER
}
export type userInfoActionTypes = updateUserInfo | deleteUserInfo