import { request } from '../utils/request'

export async function apiRegister (data: any) {
  return request({
    url: '/auth/register',
    auth: false,
    data,
    method: 'post'
  })
}

export async function apiLogin (data: any) {
  return request({
    url: '/auth/login',
    auth: false,
    data,
    method: 'post'
  })
}

export async function apiGetProfile (ctx: any = null) {
  return request({
    url: '/auth/me',
    auth: true,
    method: 'get',
    context: ctx
  })
}
