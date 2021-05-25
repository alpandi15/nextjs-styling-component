import React from 'react'
import { withAuthSync } from '../../components/Security/auth'

const Home = (props: any) => {
  console.log('DARI HALAMAN CONVER ', props)
  return (
    <>
      Masuk Ke Home
    </>
  )
}

export default withAuthSync(Home)
