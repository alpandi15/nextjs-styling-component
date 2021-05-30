import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { TOKEN } from '../../../constants'
import styled from 'styled-components'
import {
  useForm
} from 'react-hook-form'
import { setCookie } from 'nookies'
import Layout from '../../../components/Layout'
import {
  FormControl,
  Input,
  Label,
  ErrorInputMessage
} from '../../../styles/FormStyle'
import Button from '../../../components/Form/Button'
import {
  device
} from '../../../styles/LayoutStyle'
import { loggedChecked } from '../../../components/Security/auth'
import { apiLogin } from '../../../services/auth'

type FormInputProps = {
  username: string,
  password: string
}

export default loggedChecked(function Login () {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>()

  const onSubmit = async (data: FormInputProps) => {
    const login = await apiLogin(data)
    if (login?.success) {
      setCookie(null, TOKEN, login?.data?.access_token , {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })

      Router.push('/home')
    }
    console.log(data, login)
  }

  return (
    <Layout title="Login">
      <Content>
        <FormContent>
          <h3>Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                type="text"
                id="username"
                className={errors?.username ? 'invalid' : ''}
                {...register('username',
                  {
                    required: 'Username Required*'
                  })
                }
              />
              <Label
                htmlFor="username"
                className={`active ${errors?.username ? 'invalid' : 'valid'}`}
              >Email or Username</Label>
              {
                errors?.username && (
                  <ErrorInputMessage>
                    {errors?.username?.message}
                  </ErrorInputMessage>
                )
              }
            </FormControl>
            <FormControl>
              <Input
                type="password"
                id="password"
                className={errors?.password ? 'invalid' : ''}
                {...register('password', { required: 'Password Required*' })}
              />
              <Label
                htmlFor="password"
                className={`active ${errors?.password ? 'invalid' : 'valid'}`}
              >Kata Sandi</Label>
              {
                errors?.password && (
                  <ErrorInputMessage>{errors?.password?.message}</ErrorInputMessage>
                )
              }
            </FormControl>
            <div style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Button
                title="Masuk"
                type="submit"
                disabled={isSubmitting}
              />
              <div role="button" className="text-2xl mb-3 text-center">TAILWIND</div>
              <div>
                <Link href="/auth/register">
                  <a>Register</a>
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div>
                <Link href="/auth/forgot-password">
                  <a style={{ fontSize: '10px' }}>Lupa Password</a>
                </Link>
              </div>
            </div>
          </form>
        </FormContent>
      </Content>
    </Layout>
  )
})

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`
const FormContent = styled.div`
  width: 400px;
  padding: 1.5rem;
  // text-align: center;
  background-color: #FFFFFF;
  border-radius: 20px;

  @media only screen and ${device?.mobileS} {
    width: 88%;
    padding: 1rem;
  }
`
