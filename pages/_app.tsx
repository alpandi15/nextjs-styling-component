import type { AppProps, AppContext } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import { apiGetProfile, logout } from '../services/auth'
import ApplicationContext, { AppContextType, UserDataContext } from '../context/AppContext'

function MyApp({
  Component,
  pageProps,
  user
}: AppProps & AppContextType) {
  return (
    <ApplicationContext.Provider
      value={{
        user,
        logout
      }}
    >
      <Component {...pageProps} />
      <GlobalStyle />
    </ApplicationContext.Provider>
  )
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
  let pageProps = {}
  let user: UserDataContext = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const response = await apiGetProfile(ctx)
  if (response?.success) {
    user = response?.data
  }

  return {
    pageProps,
    navigation: 'Navigasi Ini',
    user
  }
}

export default MyApp
