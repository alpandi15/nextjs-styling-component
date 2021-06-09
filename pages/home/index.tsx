import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Layout from 'components/Layout'
import { useAppContext } from '../../hook/useAppData'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
  const { user, logout } = useAppContext()
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <Layout title="Home">
      <Content>
        <div>
          <div>{`${t('welcome')},`}</div>
          <b>
            {
              user?.name
            }
          </b>
          {' '}
          <Link href="/home/profile" locale={router.locale}>
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

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
      requireAuth: true
    },
  }
}

Home.requireAuth = true
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