import axios from 'axios'
import getConfig from 'next/config'
import { TOKEN } from '../../constants'
import { getCookies } from './storage'

const { publicRuntimeConfig } = getConfig()

type Params = {
  fullUrl?: boolean,
  url: string,
  method: string,
  data: Object,
  auth: boolean,
  type?: string,
  requiredToken?: boolean,
  responseHtml?: boolean,
  headers?: any,
  params?: Object,
}

export async function request({
  fullUrl = false,
  url,
  data,
  auth = false,
  requiredToken = false,
  responseHtml = false,
  headers = {
    'Content-Type': 'application/json'
  },
  params = {},
  type = 'json',
  method
}: Params) {
  const useUrl = (fullUrl ? url : `${publicRuntimeConfig.API_URL}${url}`)
  const token = await getCookies(TOKEN)

  switch (type) {
    case 'json': {
      headers = {
        'Content-Type': 'application/json'
      }
      break
    }
    case 'form-data': {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      break
    }
    default:
  }

  if ((!token && auth && !requiredToken) || (typeof token === 'object' && auth && !requiredToken)) {
    return {
      success: false,
      message: 'Unauthenticated'
    }
  }

  if (auth && !!token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response: any = {}

  try {
    switch (method) {
      case 'get': {
        response = await axios.get(`${useUrl}`, { maxContentLength: 2000, params: { ...data, ...params }, headers })
        break
      }
      case 'post': {
        response = await axios.post(`${useUrl}`, data, { params, headers })
        break
      }
      case 'put': {
        response = await axios.put(`${useUrl}`, data, { headers })
        break
      }
      case 'delete': {
        response = await axios.delete(`${useUrl}`, { data, headers })
        break
      }
      default:
    }
    if (responseHtml) {
      return Promise.resolve({
        success: true,
        data: response.data
      })
    }

    return Promise.resolve({
      success: true,
      ...response.data
    })
  } catch (error) {
    const { response } = error
    let msg
    let dat
    let statusCode
    let detailData = ''
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      const { detail } = data
      detailData = detail
      msg = data.message || statusText
      dat = {
        ...data
      } || {}
    } else {
      statusCode = 600
      if (Object.prototype.hasOwnProperty.call(error, 'message')) {
        msg = error.message || 'Network Error'
      } else {
        msg = error
      }
    }
    return {
      success: false,
      detail: detailData,
      statusCode,
      message: msg,
      data: dat
    }
  }
}