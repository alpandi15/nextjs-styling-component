import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { withAuthSync } from 'components/Security/auth'
import { useAppContext } from 'hook/useAppData'
import Layout from 'components/Layout'
import { useIntl } from 'react-intl'

const Home = ({ user }: any) => {
  const { logout } = useAppContext()
  const { formatMessage: t } = useIntl()
  return (
    <Layout title="Home">
      <Content>
        <div>
          <div>{`${t({id: 'welcome'})},`}</div>
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