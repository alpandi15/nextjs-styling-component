import React from 'react'
import { useRouter } from 'next/router'
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
import { loggedChecked } from '../../../components/Security/auth'
import { verificationCode } from '../../../services/auth/verificationService'
import { set, get } from '../../../services/utils/storage'
import {
  FORGOT_EXPIRED_CODE,
  TYPE_CODE_FORGOT,
  TYPE_ACCOUNT_EMAIL,
} from '../../../constants'
import CountDown from '../../../components/CountdownTimer'

type FormInputProps = {
  code: string
}

const getExpiredStorage = async () => {
  return get(FORGOT_EXPIRED_CODE)
}

export default loggedChecked(function ForgotPassword () {
  const [expiredCode, setExpiredCode] = React.useState(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormInputProps>()

  React.useEffect(() => {
    const getStorage = async () => {
      const expired = await getExpiredStorage()
      setExpiredCode(expired)
    }
    getStorage()
  }, [])

  const onSubmit = async (data: FormInputProps) => {
    const { query } = router
    console.log('QUERY ', query)
    const response = await verificationCode({
      code: data?.code,
      account: query.email,
      typeCode: TYPE_CODE_FORGOT,
      typeAccount: TYPE_ACCOUNT_EMAIL,
    })
    if (response?.success) {
      router.push({
        pathname: '/auth/reset-password',
        query: { email: query?.email }
      })
    }
    console.log(data, response)
  }

  return (
    <Layout title="Forgot Password">
      <Content>
        <FormContent>
          <h3>Verifikasi Kode</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Input
                type="text"
                id="code"
                className={errors?.code ? 'invalid' : ''}
                {...register('code',
                  {
                    required: 'Code Required*'
                  })
                }
              />
              <Label
                htmlFor="code"
                className={`active ${errors?.code ? 'invalid' : 'valid'}`}
              >Code</Label>
              {
                errors?.code && (
                  <ErrorInputMessage>
                    {errors?.code?.message}
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
                title="Verifikasi"
                type="submit"
                disabled={isSubmitting}
              />

            <CountContent>
              <span>Sisa Waktu: </span>
              {
                expiredCode && (
                  <CountDown timeTillDate={new Date(expiredCode)} timeOut={() => console.log('Waktu habis')} title="Time Out" />
                )
              }
            </CountContent>
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

const CountContent = styled.div`
  display: flex;
`