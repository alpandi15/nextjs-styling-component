import React from 'react'
import { withAuthSync } from '../../components/Security/auth'

const Conversation = () => {
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
