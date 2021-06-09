import { APPNAME, APP_DESCRIPTION } from 'constants/index'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import {
  Container,
  Header
} from 'styles/LayoutStyle'

type Props = {
  children: ReactNode,
  title: string
}

const Layout = ({
  children,
  title = `${APPNAME}`
}: Props) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{`${title} | ${APP_DESCRIPTION}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header>
        <div>Aplikasiku</div>
        <div>
          <select value={router?.locale} name="" id="" onChange={(e) => router.replace(router.pathname, router.pathname, { locale: e.target.value })}>
            {
              router?.locales?.map((v) => (
                <option value={v} key={v}>{String(v).toLocaleUpperCase()}</option>
              ))
            }
          </select>
        </div>
      </Header>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
