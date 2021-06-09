import React, { ReactNode, useEffect } from 'react'
import { useAppContext } from 'hook/useAppData'
import { useRouter } from 'next/router'
type Props = {
  children: ReactNode
}

const authPages = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/forgot-password/verification',
  '/auth/reset-password',
]

const AuthGuard = ({
  children
}: Props) => {
  const { isAuthenticated } = useAppContext()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated && !authPages.includes(router.pathname)) {
      const redirect = router?.pathname !== `/auth/login`
        ? `/auth/login?path=${router?.pathname}`
        : `/auth/login`
  
      router.push(redirect, redirect, { locale: router?.locale })
    }
    // else {
    //   const redirect = '/home'
    //   router.push(redirect, redirect, { locale: router?.locale })
    // }
    console.log('LOGIN ', isAuthenticated && authPages.includes(router.pathname), router.pathname)
  }, [isAuthenticated])

  if (isAuthenticated) {
    return <>{children}</>
  }
  return null
}

export default AuthGuard