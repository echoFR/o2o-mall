import React, { createContext, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
export const userInfoContext = createContext({})
const Authpage = ({children}: {children: ReactNode}) => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const userInfoContext = createContext(userInfo)
  console.log(userInfo)
  return (
    <userInfoContext.Provider value={userInfo}>
      {children}
    </userInfoContext.Provider>
  )
}

export default Authpage