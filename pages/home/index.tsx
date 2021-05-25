import React from 'react'
import { withAuthSync } from '../../components/Security/auth'
import { apiGetProfile } from '../../services/auth'

const Home = ({
  userData
}: any) => {
  // console.log('DARI HALAMAN CONVER ', props)
  return (
    <>
      Selamat Datang,
      <div>
        <b>
          {
            userData?.name
          }
        </b>
      </div>
    </>
  )
}

Home.getInitialProps = async function (ctx: any) {
  const response = await apiGetProfile(ctx)
  if (response?.success)
    return { userData: response?.data }
}

export default withAuthSync(Home)
