import type { AppProps, AppContext } from 'next/app'
import { FC } from 'react'
import Head from 'next/head'
import { SyncLoader } from 'react-spinners'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle'
import { logout } from '../services/auth'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config'
import ApplicationContext, { AppContextType } from '../context/AppContext'
import { useRouteState } from '../hook/useRouteState'
// import { auth } from 'components/Security/auth'
import '../styles/tailwind.css'
import Router from 'next/router'
import { destroyCookie, parseCookies  } from 'nookies'
import { apiGetProfile } from 'services/auth'
import { UserDataContext } from 'context/AppContext'
import { TOKEN } from 'constants/index'

const queryClient = new QueryClient()

const checkAuthentication = async (ctx: any) => {
  let token: string | null = parseCookies(ctx)[TOKEN] || null
  let user: UserDataContext = {}

  const res = await apiGetProfile(ctx)
  if (res?.success) {
    user = res?.data
  }
  if (token && !res?.success && res?.statusCode === 401) {
    destroyCookie(ctx, TOKEN)
    return {
      token: null,
      user
    }
  }
  return {
    token,
    user
  }
}

function MyApp ({
  Component,
  pageProps,
  user,
  token
}: AppProps & AppContextType) {
  const routeState = useRouteState();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationContext.Provider
        value={{
          user,
          token,
          logout
        }}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <>
          <Component {...pageProps} />
          {routeState === "start" && (
            <Preloader>{routeState}</Preloader>
          )}
        </>
        <GlobalStyle />
      </ApplicationContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

function redirectUser(ctx: any) {
  if (ctx.req) {
      const redirect = ctx
        && ctx.pathname
        && ctx.pathname !== '/auth/login'
          ? `/auth/login?path=${ctx?.pathname}`
          : '/auth/login'

      ctx.res.writeHead(302, {
        Location: redirect
      })
      ctx.res.end()
  } else {
    Router.push(ctx?.pathname)
  }
}

function redirectUserIsLogged(ctx: any) {
  if (ctx.req) {
    let redirect = '/home'
    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
  } else {
    Router.push(ctx?.pathname)
  }
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
  let pageProps: any = {}
  // let user: UserDataContext = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const { token, user } = await checkAuthentication(ctx)

  const pageUnauthenticated = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/forgot-password/verification',
    '/auth/reset-password',
  ]

  if (!token && !user?.id) {
    if (!pageUnauthenticated.includes(ctx.pathname)) {
      redirectUser(ctx);
    }
  }

  if (token && user?.id) {
    if (pageUnauthenticated.includes(ctx.pathname)) {
      redirectUserIsLogged(ctx);
    }
  }

  return {
    pageProps,
    navigation: 'Navigasi Ini',
    user,
    token
  }
}

export default appWithTranslation(MyApp, nextI18NextConfig)

const Preloader: FC = () => (
  <ContentLoader>
    <div>
      <SyncLoader color="#2ca58d" />
    </div>
  </ContentLoader>
)

const ContentLoader = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255, 0.7);
`