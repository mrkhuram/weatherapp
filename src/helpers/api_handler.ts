import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL
const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.response.use(
  (resp) => resp,
  (error) => Promise.reject(error),
)

export async function get(url: string, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => response.data)
}
export async function post(url: string, body: any, config = {}) {
  return await axiosApi
    .post(url, { ...body })
    .then((response) => response.data)
    .catch((error) => {
      return error.data
    })
}
