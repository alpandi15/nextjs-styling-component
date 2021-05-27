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
import { withAuthSync } from '../../../../components/Security/auth'
import { apiEditProfile } from '../../../../services/account'
import { useUserContext } from '../../../../components/Context/UserContext'

type FormInputProps = {
  name: string,
  username: string,
  phone: string
}

export default withAuthSync(function EditProfile () {
  const state = useUserContext()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>({
    mode: "onBlur",
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
    defaultValues: {
      name: state?.user?.name,
      username: state?.user?.username,
      phone: state?.user?.phone
    },
    shouldFocusError: true,
    shouldUnregister: true
  })

  const onSubmit = async (data: FormInputProps) => {
    const login = await apiEditProfile(data)
    if (login?.success) {
      Router.replace('/home/profile')
    }
    console.log(data, login)
  }

  console.log('STATE CONTEXTs ', state)
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
