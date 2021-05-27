import React from 'react'
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
import { withAuthSync } from '../../../components/Security/auth'
import { apiRegister } from '../../../services/auth'
import { useUserContext } from '../../../components/Context/UserContext'

type FormInputProps = {
  name: string,
  username: string,
  email: string,
  password: string,
  confirm_password: string,
  phone: string
}

export default withAuthSync(function Register () {
  const state = useUserContext()
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>({
    mode: "onBlur"
  })

  const onSubmit = async (data: FormInputProps) => {
    const login = await apiRegister(data)
    if (login?.success) {
      setCookie(null, TOKEN, login?.data?.access_token , {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })

      Router.push('/home')
    }
    console.log(data, login)
  }

  console.log('STATE CONTEXT ', state)
  return (
    <Layout title="Edit Profile">
      <Content>
        <FormContent>
          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                type="text"
                id="name"
                className={errors?.name ? 'invalid' : ''}
                {...register('name',
                  {
                    required: 'Name Required*',
                    maxLength: { value: 30, message: 'Max Length 30 character' },
                    minLength: { value: 6, message: 'Min Length 6 character' }
                  })
                }
              />
              <Label
                htmlFor="name"
                className={`active ${errors?.name ? 'invalid' : 'valid'}`}
              >Name</Label>
              {
                errors?.name && (
                  <ErrorInputMessage>
                    {errors?.name?.message}
                  </ErrorInputMessage>
                )
              }
            </FormControl>
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
              >Username</Label>
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
                type="text"
                id="phone"
                className={errors?.phone ? 'invalid' : ''}
                {...register('phone',
                  {
                    required: 'Phone Required*',
                    maxLength: { value: 30, message: 'Max Length 30 character' },
                    minLength: { value: 6, message: 'Min Length 6 character' },
                    pattern: {
                      value: /^(^08)(\d{3,4}-?){2}\d{3,4}$/,
                      message: 'Use Phone Number Format'
                    }
                  })
                }
              />
              <Label
                htmlFor="phone"
                className={`active ${errors?.phone ? 'invalid' : 'valid'}`}
              >Phone Number</Label>
              {
                errors?.phone && (
                  <ErrorInputMessage>
                    {errors?.phone?.message}
                  </ErrorInputMessage>
                )
              }
            </FormControl>
            <FormControl>
              <Input
                type="password"
                id="password"
                className={errors?.password ? 'invalid' : ''}
                {...register('password', {
                  required: 'Password Required*',
                  minLength: {
                    value: 6,
                    message: 'Minimal 6 character'
                  }
                })}
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
            <FormControl>
              <Input
                type="password"
                id="confirm_password"
                className={errors?.confirm_password ? 'invalid' : ''}
                {...register('confirm_password', {
                  required: 'Confirm Password Required*',
                  minLength: {
                    value: 6,
                    message: 'Minimal 6 character'
                  },
                  validate: value => {
                    const check = value === watch('password')
                    if (check) return true
                    return 'The passwords do not match'
                  }
                })}
              />
              <Label
                htmlFor="confirm_password"
                className={`active ${errors?.confirm_password ? 'invalid' : 'valid'}`}
              >Ulangi Kata Sandi</Label>
              {
                errors?.confirm_password && (
                  <ErrorInputMessage>{errors?.confirm_password?.message}</ErrorInputMessage>
                )
              }
            </FormControl>
            <div style={{ marginTop: '2rem' }}>
              <Button
                title="Edit"
                type="submit"
                disabled={isSubmitting}
              />
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
