// import {
//     Box,
//     Code,
//     Container,
//     Flex,
//     Heading,
//     Icon,
//     Link,
//     Spacer,
//     Text,
//   } from "@chakra-ui/react";
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
  title = 'Next JS'
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
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
