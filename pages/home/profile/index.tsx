import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { withAuthSync } from '../../../components/Security/auth'
import { apiGetProfile } from '../../../services/auth'

const Profile = ({
  userData
}: any) => {
  return (
    <Content>
      <div>
        Profile User
      </div>
      <div>
        <div>
          <div><b>Name</b></div>
          <div>{userData?.name}</div>
        </div>
        <div>
          <div><b>Email</b></div>
          <div>{userData?.email}</div>
        </div>
        <div>
          <div><b>Username</b></div>
          <div>{userData?.username}</div>
        </div>
      </div>
      <div>
        <Link href="/home/profile/edit">
          <a>Edit</a>
        </Link>
      </div>
    </Content>
  )
}

Profile.getInitialProps = async function (ctx: any) {
  const response = await apiGetProfile(ctx)
  if (response?.success)
    return {
      userData: response?.data
    }
}

export default withAuthSync(Profile)

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
