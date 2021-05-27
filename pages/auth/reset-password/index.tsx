import React from 'react'
import { useRouter } from 'next/router'
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
import { apiResetPassword } from '../../../services/auth/forgotPassword'

type FormInputProps = {
  confirm_password: string,
  password: string
}

export default loggedChecked(function REsetPassword () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>()

  const onSubmit = async (data: FormInputProps) => {
    const { query } = router
    const login = await apiResetPassword('email', {
      account: query?.email,
      password: data?.password
    })
    if (login?.success) {
      router.push({
        pathname: '/stand/auth/login'
      })
    }
    console.log(data, login)
  }

  return (
    <Layout title="Login">
      <Content>
        <FormContent>
          <h3>Reset Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Button
                title="Reset"
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
