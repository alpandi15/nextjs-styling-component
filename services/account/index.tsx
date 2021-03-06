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

export {
  apiEditProfile,
  apiChangePassword,
  apiChangeEmail,
  apiChangePhone
}
