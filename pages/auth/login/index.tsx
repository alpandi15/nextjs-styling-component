import React from 'react'
import styled from 'styled-components'
import Layout from '../../../components/Layout'
import {
  FormControl,
  Input,
  Label
} from '../../../components/FormStyle'

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`
const FormContent = styled.div`
  width: 400px;
  padding: .5rem;
  text-align: center;
`

export default function Login () {
  return (
    <Layout title="Login">
      <Content>
        <FormContent>
          <h3>Login</h3>
          <form>
            <FormControl>
              <Input type="text" id="username" name="username" />
              <Label htmlFor="username" className="active">Email or Username</Label>
            </FormControl>
            <FormControl>
              <Input type="password" id="password" name="password" />
              <Label htmlFor="password" className="invalid">Kata Sandi</Label>
            </FormControl>
            <div>
              <button>Masuk</button>
            </div>
          </form>
        </FormContent>
      </Content>
    </Layout>
  )
}
