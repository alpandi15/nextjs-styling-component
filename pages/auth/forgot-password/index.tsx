import React from 'react'
import Router from 'next/router'
import moment from 'moment'
import styled from 'styled-components'
import {
  useForm
} from 'react-hook-form'
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
import { apiForgotPassword } from '../../../services/auth/forgotPassword'
import { set } from '../../../services/utils/storage'
import { FORGOT_EXPIRED_CODE } from '../../../constants'

type FormInputProps = {
  email: string
}

export default function ForgotPassword () {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>()

  const onSubmit = async (data: FormInputProps) => {
    const response = await apiForgotPassword('email', {
      account: data?.email,
      roleId: 2
    })
    if (response?.success) {
      await set(FORGOT_EXPIRED_CODE, moment(response?.data?.expired, 'YYYY-MM-DD HH:mm:ss').add({ hours: 7 }))
      Router.push({
        pathname: '/auth/forgot-password/verification',
        query: { email: data?.email }
      })
    } else if (typeof response.detail === 'object') {
      Router.push({
        pathname: '/auth/forgot-password/verification',
        query: { email: data?.email }
      })
    } else {
      alert('Error ')
    }
  }

  return (
    <Layout title="Forgot Password">
      <Content>
        <FormContent>
          <h3>Forgot Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                type="text"
                id="email"
                className={errors?.email ? 'invalid' : ''}
                {...register('email',
                  {
                    required: 'Email Required*',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Email Format Invalid'
                    }
                  })
                }
              />
              <Label
                htmlFor="email"
                className={`active ${errors?.email ? 'invalid' : 'valid'}`}
              >Email</Label>
              {
                errors?.email && (
                  <ErrorInputMessage>
                    {errors?.email?.message}
                  </ErrorInputMessage>
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
                title="Send Code"
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

ForgotPassword.requireAuth = true
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
