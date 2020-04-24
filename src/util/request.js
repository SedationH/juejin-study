import axios from 'axios'

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['X-Agent'] = 'Juejin/Android'
    return config
  }
)

export default service