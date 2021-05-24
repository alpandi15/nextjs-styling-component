// import getConfig from 'next/config'
// import Router from 'next/router'
import { parseCookies  } from 'nookies'
import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}

// const { publicRuntimeConfig } = getConfig()

// function redirectUser(ctx: any, location: any) {
//   if (ctx.req) {
//     ctx.res.writeHead(302, { Location: location });
//     ctx.res.end();
//   } else {
//     Router.push(location);
//   }
// }

MyApp.getInitialProps = async ({Component, ctx}: any) => {
  let pageProps = {}
  const jwt = parseCookies(ctx).jwt
  console.log('JWT TOKEN ', jwt)
  // // const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`)
  // // const navigation = await res.json()

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  // if (!jwt) {
  //   if (ctx.pathname === "/conversation") {
  //     redirectUser(ctx, "/auth/login");
  //   }
  // }

  return {
    pageProps,
    token: jwt,
    navigation: 'Navigasi Ini'
  }
}

export default MyApp
