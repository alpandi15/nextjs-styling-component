import React from 'react'
import { useRouter } from 'next/router'

const View = () => {
  const router = useRouter()
  return (
    <>{`Detail Data ${router?.query?.id}`}</>
  )
}

export default View