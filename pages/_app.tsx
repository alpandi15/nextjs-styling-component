import type { AppProps, AppContext } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import UserContext from '../components/Context/UserContext'
import { apiGetProfile } from '../services/auth'

interface MyProps {
  user?: any
}

function MyApp({ Component, pageProps, user }: AppProps & MyProps) {
  return (
    <UserContext user={user}>
      <Component {...pageProps} />
      <GlobalStyle />
    </UserContext>
  )
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
  let pageProps = {}
  let user: any = {}
  // // const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`)
  // // const navigation = await res.json()

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
