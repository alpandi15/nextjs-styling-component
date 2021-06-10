import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { withAuthSync } from 'components/Security/auth'
import { useAppContext } from 'hook/useAppData'
import Layout from 'components/Layout'
import t from 'components/I18n/translate'

const Home = ({ user }: any) => {
  const { logout } = useAppContext()
  return (
    <Layout title="Home">
      <Content>
        <div>
          <div>{`${t('app.welcome')},`}</div>
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
    </Layout>
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