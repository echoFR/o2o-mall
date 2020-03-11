import { combineReducers } from 'redux'
import { userInfoReducer } from './userInfo/reducers'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
  userInfo: userInfoReducer
})
// useSelector 的 state 中类型需要
export type RootState = ReturnType<typeof rootReducer>
// configureStore
export default () => {
  const store = createStore(rootReducer,
    composeWithDevTools()
  )
  return store
}