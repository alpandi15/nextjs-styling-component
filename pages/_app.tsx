import type { AppProps, AppContext } from 'next/app'
import { FC } from 'react'
import { SyncLoader } from 'react-spinners'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle'
import { apiGetProfile, logout } from '../services/auth'
import ApplicationContext, { AppContextType, UserDataContext } from '../context/AppContext'
import { useRouteState } from '../hook/useRouteState'

const queryClient = new QueryClient()

function MyApp({
  Component,
  pageProps,
  user
}: AppProps & AppContextType) {
  const routeState = useRouteState();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationContext.Provider
        value={{
          user,
          logout
        }}
      >
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