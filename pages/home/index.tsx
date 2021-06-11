import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { withAuthSync } from 'components/Security/auth'
import { useAppContext } from 'hook/useAppData'
import Layout from 'components/Layout'
import t from 'components/I18n/translate'
import { encryptBase64, decryptBase64 } from 'services/utils/crypto'

const Home = ({ user }: any) => {
  const { logout } = useAppContext()
  const [data, setData] = useState<String | null>('')

  const onEncrypt = async () => {
    const enc: string = await encryptBase64(1)
    setData(enc)
  }

  const onDecrypt = async () => {
    const enc: string = await decryptBase64(data)
    setData(enc)
  }

  return (
    <Layout title="Home">
      <Content style={{ flexDirection: 'column' }}>
        <div>
          <div>{`${t('app.welcome')},`}</div>
          <b>
            {
              user?.name
            }
          </b>
          {' '}
          <Link href="/home/profile">
            <a>{`Profil's >>`}</a>
          </Link>
          <div>
            <Logout onClick={logout}>Logout</Logout>
          </div>
        </div>

        <div>
          <div>
            { data }
          </div>
          <div>
            <button onClick={onEncrypt}>Encrypt</button>
          </div>
          <div>
            <button onClick={onDecrypt}>Decrypt</button>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default withAuthSync(Home)

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Logout = styled.button`
  margin-top: 2rem;
`