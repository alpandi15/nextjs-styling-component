import { Component } from 'react'
import { TOKEN } from '../../constants'
import Router from 'next/router'
import { NextComponentType, NextPageContext } from 'next'
import { destroyCookie, parseCookies  } from 'nookies'
import { apiGetProfile } from 'services/auth'
import { UserDataContext } from 'context/AppContext'

const getDisplayName = (Components: NextComponentType) => Components.displayName || Components.name || 'Component'

export const auth = async (ctx: any) => {
  const token = parseCookies(ctx)[TOKEN]
  let user: UserDataContext = {}

  const res = await apiGetProfile(ctx)
  if (res?.success) {
    user = res?.data
  }

  if (token && !res?.success && res?.statusCode === 401) {
    destroyCookie(ctx, TOKEN)
    const redirect = ctx
      && ctx.pathname
      && ctx.pathname !== '/auth/login'
        ? `/auth/login?path=${ctx?.pathname}`
        : '/auth/login'

    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
    return {
      token,
      user
    }
  }

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */

  if (ctx.req && !token) {
    // console.log('PATH ', ctx?.pathname)
    const redirect = ctx
      && ctx.pathname
      && ctx.pathname !== '/auth/login'
        ? `/auth/login?path=${ctx?.pathname}`
        : '/auth/login'

    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
    return {
      token,
      user
    }
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    if (ctx && ctx.pathname && ctx.pathname !== '/auth/login') {
      // Router.push(`/auth/login?path=${ctx.req.url}`)
      Router.push(`/auth/login?path=${ctx.pathname}`)
    } else {
      Router.push('/auth/login')
    }
  }

  return {
    token,
    user
  }
}

export const withAuthSync = (WrappedComponent: NextComponentType) => class extends Component {
  static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

  static async getInitialProps (ctx: NextPageContext) {
    // console.log('Initial Server ', ctx)
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx))

    const { token, user } = await auth(ctx)
    return { ...componentProps, token, user }
  }

  constructor (props: any) {
    super(props)

    this.syncLogout = this.syncLogout.bind(this)
  }

  componentDidMount () {
    window.addEventListener('storage', this.syncLogout)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.syncLogout)
    window.localStorage.removeItem('logout')
  }

  syncLogout = (event: any) => {
    if (event.key === 'logout') {
      Router.push('/auth/login')
    }
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}


export const isLogged = (ctx: any) => {
  const token = parseCookies(ctx)[TOKEN]
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && token) {
    let redirect = '/home'
    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (token) {
    let redirect = '/home'
    Router.push(redirect)
  }

  return token
}

export const loggedChecked = (WrappedComponent: NextComponentType) => class extends Component {
  static displayName = `loggedChecked(${getDisplayName(WrappedComponent)})`

  static async getInitialProps (ctx: any) {
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx))

    const token = isLogged(ctx)
    console.log('IS LOGGED')
    return { ...componentProps, token }
  }

  constructor (props: any) {
    super(props)

    this.syncLogout = this.syncLogout.bind(this)
  }

  componentDidMount () {
    window.addEventListener('storage', this.syncLogout)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.syncLogout)
    window.localStorage.removeItem('logout')
  }

  syncLogout = (event: any) => {
    if (event.key === 'logout') {
      Router.push('/auth/login')
    }
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}
