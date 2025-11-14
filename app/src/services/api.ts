import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 20000
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (r) => r,
    (error) => {
        const msg = error?.response?.data?.message || error?.message || 'Request failed'
        return Promise.reject(new Error(msg))
    }
)

export default api
