import React from 'react'
import { withAuthSync } from '../../components/Security/auth'

const Conversation = (props: any) => {
  console.log('DARI HALAMAN CONVER ', props)
  return (
    <>
      Masuk Ke Conversation
    </>
  )
}

export default withAuthSync(Conversation)

// Conversation.getInitialProps = async ({Component, ctx}: any) => {
//   console.log('SERVER RENDER ', ctx)
// }
