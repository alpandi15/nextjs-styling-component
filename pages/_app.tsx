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
import { destroyCookie, parseCookies  } from 'nookies'
import { apiGetProfile } from 'services/auth'
import { UserDataContext } from 'context/AppContext'
import { TOKEN } from 'constants/index'
import { NextPage, NextPageContext } from 'next'
import { NextRouter } from 'next/router'

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

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

function MyApp (props: AppProps & AppContextType) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any; } = props
  const {
    user,
    token,
    isAuthenticated
  } = props

  const routeState = useRouteState();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationContext.Provider
        value={{
          isAuthenticated,
          user,
          token,
          logout
        }}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        {/* {
          Component.requireAuth ? (
            <AuthGuard>
              <>
                <Component {...pageProps} />
              </>
            </AuthGuard>
          ) : (
            <>
              <Component {...pageProps} />
            </>
          )
        } */}
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

function redirectUser(ctx: any, router: NextRouter) {
  if (ctx.req) {
    const locale = router.locale !== router.defaultLocale ? `/${router.locale}` : ''
    const redirect = ctx
      && ctx.pathname
      && ctx.pathname !== `${locale}/auth/login`
        ? `${locale}/auth/login?path=${ctx?.pathname}`
        : `${locale}/auth/login`

    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
  } else {
    router.push(ctx?.pathname)
  }
}

function redirectUserIsLogged(ctx: any, router: NextRouter) {
  const locale = router.locale !== router.defaultLocale ? `/${router.locale}` : ''
  if (ctx.req) {
    let redirect = `${locale}/home`
    console.log('HOME ', redirect)
    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
  } else {
    router.push(ctx?.pathname)
  }
}

MyApp.getInitialProps = async (props: AppContext) => {
  const {
    Component,
    ctx,
    router
  }:{ Component: NextApplicationPage; ctx: NextPageContext; router: NextRouter } = props
  let pageProps: any = {}
  // let user: UserDataContext = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  const { token, user } = await checkAuthentication(ctx)
  console.log('PROPS ', Component)

  if (Component?.requireAuth) {
    const pageUnauthenticated = [
      '/auth/login',
      '/auth/register',
      '/auth/forgot-password',
      '/auth/forgot-password/verification',
      '/auth/reset-password',
    ]

    if (!token && !user) {
      if (!pageUnauthenticated.includes(ctx.pathname)) {
        redirectUser(ctx, router);
      }
    }

    if (token && !!user) {
      if (pageUnauthenticated.includes(ctx.pathname)) {
        redirectUserIsLogged(ctx, router);
      }
    }
  }

  return {
    pageProps,
    navigation: 'Navigasi Ini',
    user,
    token,
    isAuthenticated: token && user?.id ? true : false
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