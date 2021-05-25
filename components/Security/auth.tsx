import { Component } from 'react'
import Router from 'next/router'
import { NextComponentType, NextPageContext } from 'next'
import { parseCookies  } from 'nookies'

const getDisplayName = (Components: any) => Components.displayName || Components.name || 'Component'

export const auth = (ctx: any) => {
  const token = parseCookies(ctx).jwt
  console.log('TOKEN DATA ', token)
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */

  if (ctx.req && !token) {
    console.log('PATH ', ctx?.pathname)
    const redirect = ctx
      && ctx.pathname
      && ctx.pathname !== '/auth/login'
        ? `/auth/login?path=${ctx?.pathname}`
        : '/auth/login'

    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
    return token
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    if (ctx && ctx.pathname && ctx.pathname !== '/auth/login') {
      // Router.push(`/auth/login?path=${ctx.req.url}`)
      Router.push('/auth/login?path=/home')
    } else {
      Router.push('/auth/login')
    }
  }

  return token
}

export const withAuthSync = (WrappedComponent: NextComponentType) => class extends Component {
  static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

  static async getInitialProps (ctx: NextPageContext) {
    // console.log('Initial Server ', ctx)
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx))

    const token = await auth(ctx)
    return { ...componentProps, token }
  }

  constructor (props: any) {
    super(props)

    this.syncLogout = this.syncLogout.bind(this)
  }

  componentDidMount () {
    console.log('INITIAL LOGGED ')
    window.addEventListener('storage', this.syncLogout)
  }

  // componentWillUnmount () {
  //   window.removeEventListener('storage', this.syncLogout)
  //   window.localStorage.removeItem('logout')
  // }

  syncLogout = (event: any) => {
    if (event.key === 'logout') {
      Router.push('/auth/login')
    }
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}
