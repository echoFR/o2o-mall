import { message } from 'antd'
const Message = ({ type = 'error', msg = '' }: { type?: 'success' | 'error', msg?: string }) => {
  const reMsg = msg ? msg : (type === 'success' ? '成功' : '失败')
  return (
    message[type](reMsg)
  )
}
export default Message