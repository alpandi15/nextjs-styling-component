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
import styled from 'styled-components'
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode,
  title: string
}

const Container = styled.main`
  width: 920px;
  background: #ffffff;
  height: 100vh;
`;

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
