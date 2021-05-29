import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { withAuthSync } from '../../components/Security/auth'
import { logout } from '../../services/auth'
import { useAppContext } from '../../hook/useAppData'

const Home = () => {
  const state = useAppContext()
  const logoutUser = async () => {
    return logout()
  }
  return (
    <Content>
      <div>
        <div>Selamat Datang,</div>
        <b>
          {
            state?.user?.name
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