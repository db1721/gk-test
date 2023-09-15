import axios from 'axios'
import Router from '../routes/main'
import { store } from '../stores/main'

function authHeadersForAPI() {
    const tokenData = window.localStorage.getItem('auth-token')

    if (tokenData == null) {
        return {
            headers: {}
        };
    }

    if (tokenData.access_token == '') {
        return {
            headers: {}
        }
    }

    let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(tokenData).access_token
    }

    return {
        headers: headers
    }
}

export const HTTP_API = (payload) => {
    const axiosInstance = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        headers: payload && payload.headers ? payload.headers : authHeadersForAPI().headers
    })

    axiosInstance.interceptors.response.use(response => response,
        error => {
            if (error.response) {
                if (error.response.data.role && error.response.data.role == 'user') {
                    store.dispatch('authStore/resetAllApplicationState')
                    Router.push({ name: 'login' })
                }
            }

            if (error.response.status == 401) {
                store.dispatch('authStore/resetAllApplicationState')
                alert('Another device was used to login your account!')
                Router.push({ name: 'login' })
            }

            return Promise.reject(error)
        })

    return axiosInstance
}