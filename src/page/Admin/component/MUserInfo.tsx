import React, { useState, useEffect, } from 'react'
import EdiTable from 'component/EdiTable'
import { userInfoColumns } from './columns'
import { getUserInfo, getUserAll } from 'service/user'

const MUserInfo = () => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUserAllData = async () => {
      setLoading(true)
      const userData = await getUserAll() as any
      let { list }: { list: any[] } = userData
      const promiseArr = list.map(({ username }) => getUserInfo({
        username
      }))
      let userlist: any[] = await Promise.all(promiseArr)
      const baseUserObj: any = {}
      userlist.forEach(baseUser => {
        if (baseUser && baseUser.username) {
          const { username } = baseUser
          baseUserObj[username] = baseUser
        }
      })
      list = list.map(info => ({
        ...info,
        ...baseUserObj[info.username]
      }))
      setDataSource(list)
      setLoading(false)
    }
    getUserAllData()
  }, [])
  return (<div className='muser-info'>
    <EdiTable
      pColumns={userInfoColumns}
      dataSource={dataSource}
      loading={loading}
      tableTitle={'用户信息'}
    />
  </div>)
}

export default MUserInfo