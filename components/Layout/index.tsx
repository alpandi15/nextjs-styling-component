import { APPNAME, APP_DESCRIPTION } from '../../constants'
import Head from "next/head";
import React, { ReactNode } from "react";
import {
  Container
} from '../../styles/LayoutStyle'

type Props = {
  children: ReactNode,
  title: string
}

const Layout = ({
  children,
  title = `${APPNAME}`
}: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | ${APP_DESCRIPTION}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
