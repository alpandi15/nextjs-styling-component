import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useAppContext } from '../../hook/useAppData'

const Home = () => {
  const { user, logout } = useAppContext()
  return (
    <Content>
      <div>
        <div>Selamat Datang,</div>
        <b>
          {
            user?.name
          }
        </b>
        {' '}
        <Link href="/home/profile">
          <a>{`Profil's >>`}</a>
        </Link>
        <div>
          <Logout onClick={logout}>Logout</Logout>
        </div>
      </div>
    </Content>
  )
}

export default Home

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Logout = styled.button`
  margin-top: 2rem;
`