import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import {
  useForm
} from 'react-hook-form'
import Layout from '../../../../components/Layout'
import {
  FormControl,
  Input,
  Label,
  ErrorInputMessage
} from '../../../../styles/FormStyle'
import Button from '../../../../components/Form/Button'
import {
  device
} from '../../../../styles/LayoutStyle'
import { apiChangePassword } from '../../../../services/account'

type FormInputProps = {
  password: string,
  confirm_password: string,
  old_password: string
}

export default function UpdatePassword () {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>({
    mode: "onBlur",
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true
  })

  const onSubmit = async (data: FormInputProps) => {
    const update = await apiChangePassword({
      new_password: data?.password,
      old_password: data?.old_password
    })
    if (update?.success) {
      Router.replace('/home/profile')
    }
    console.log(data, update)
  }

  return (
    <Layout title="Update Password">
      <Content>
        <FormContent>
          <h3>Update Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                type="password"
                id="old_password"
                className={errors?.old_password ? 'invalid' : ''}
                {...register('old_password', {
                  required: 'Old Password Required*',
                  minLength: {
                    value: 6,
                    message: 'Minimal 6 character'
                  }
                })}
              />
              <Label
                htmlFor="old_password"
                className={`active ${errors?.old_password ? 'invalid' : 'valid'}`}
              >Kata Sandi Lama</Label>
              {
                errors?.old_password && (
                  <ErrorInputMessage>{errors?.old_password?.message}</ErrorInputMessage>
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
