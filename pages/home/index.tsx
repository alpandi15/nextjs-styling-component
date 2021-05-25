import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { withAuthSync } from '../../components/Security/auth'
import { apiGetProfile, logout } from '../../services/auth'

const Home = ({
  userData
}: any) => {
  const logoutUser = async () => {
    return logout()
  }

  return (
    <Content>
      <div>
        <div>Selamat Datang,</div>
        <b>
          {
            userData?.name
          }
        </b>
        {' '}
        <Link href="/home/profile">
          <a>{`Profil's >>`}</a>
        </Link>
        <div>
          <Logout onClick={logoutUser}>Logout</Logout>
        </div>
      </div>
    </Content>
  )
}

Home.getInitialProps = async function (ctx: any) {
  const response = await apiGetProfile(ctx)
  if (response?.success)
    return {
      userData: response?.data
    }
}

export default withAuthSync(Home)

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Logout = styled.button`
  margin-top: 2rem;
`