import React from 'react'
import { useRouter } from 'next/router'

const View = () => {
  const router = useRouter()
  return (
    <>{`Data Friends ${router?.query?.friends}`}</>
  )
}

export default View