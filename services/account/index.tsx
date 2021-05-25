import { request } from '../utils/request'

const apiEditProfile = async (data: any) => {
  return request({
    url: '/profile-update',
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangePassword = async (data: any) => {
  return request({
    url: '/auth/change-password',
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangeEmail = async (data: any) => {
  return request({
    url: '/profile-update/email',
    auth: true,
    data,
    method: 'put'
  })
}

const apiChangePhone = async (data: any) => {
  return request({
    url: '/profile-update/phone',
    auth: true,
    data,
    method: 'put'
  })
}

const apiSendCode = async (type: any) => {
  return request({
    url: `/auth/request-verify/${type}`,
    auth: true,
    method: 'post'
  })
}

const apiVerifyCode = async (data: any) => {
  return request({
    url: '/auth/verification',
    auth: true,
    data,
    method: 'post'
  })
}

export {
  apiEditProfile,
  apiChangePassword,
  apiChangeEmail,
  apiChangePhone,
  apiSendCode,
  apiVerifyCode
}
