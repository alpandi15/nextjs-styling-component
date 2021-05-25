import type { AppProps, AppContext } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
  let pageProps = {}
  // // const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`)
  // // const navigation = await res.json()

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {
    pageProps,
    navigation: 'Navigasi Ini'
  }
}

export default MyApp
