import React from 'react'
import Router from 'next/router'
import getConfig from 'next/config'
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

type FormInputProps = {
  username: string,
  password: string
}

const { publicRuntimeConfig } = getConfig()

const loginAction = async (data: FormInputProps) => {
  const response = await fetch(`${publicRuntimeConfig.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error("Fetching Error");
  }
  
  return await response.json()
}

export default function Login () {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>()

  const onSubmit = async (data: FormInputProps) => {
    const login = await loginAction(data)
    if (login?.success) {
      setCookie(null, 'jwt', login?.data?.access_token , {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      Router.push('/conversation')
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
                    required: 'Username Required*',
                    // pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
                    {errors?.username?.type === 'required' && errors?.username?.message}
                    {errors?.username?.type === 'pattern' && 'Email Invalid'}
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
            <div style={{ marginTop: '2rem' }}>
              <Button
                title="Masuk"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </FormContent>
      </Content>
    </Layout>
  )
}

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
