import { request } from '../utils/request'

const apiSendCode = async (type: any) => {
  return request({
    url: `/auth/request-verify/${type}`,
    auth: true,
    method: 'get'
  })
}

const verificationCode = async (data: any) => {
  console.log('MASUK KE REQUEST ', data)
  return request({
    url: '/auth/verification',
    auth: false,
    data,
    method: 'post'
  })
}

const resendVerificationCode = async (data: any) => {
  return request({
    url: '/auth/resend/verification',
    auth: false,
    data,
    method: 'post'
  })
}

const apiVerifyPhoneFirebase = async (data: any) => {
  return request({
    url: '/auth/verif-phone',
    auth: true,
    data,
    method: 'put'
  })
}

export {
  verificationCode,
  resendVerificationCode,
  apiVerifyPhoneFirebase,
  apiSendCode
}
