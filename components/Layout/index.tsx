import { APPNAME, APP_DESCRIPTION } from '../../constants'
import Head from "next/head";
import React, { ReactNode } from 'react'
import {
  Container,
  Header
} from 'styles/LayoutStyle'
import { useRouter } from 'next/router';

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
          <select name="" id="" onChange={(e) => router.replace(router.pathname, router.pathname, { locale: e.target.value })}>
            <option value="id">ID</option>
            <option value="en">EN</option>
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
