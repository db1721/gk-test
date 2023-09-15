import axios from 'axios'
import { HTTP_API } from '@/helpers/http'

const initialState = () => ({
    token: localStorage.getItem('auth-token') ? JSON.parse(localStorage.getItem('auth-token')) : null,
    user: {
        id: null
    },
})

const state = initialState()

const mutations = {
    SET_TOKEN(state, token) {
        localStorage.setItem('auth-token', JSON.stringify(token))
        state.token = token
    },

    UNSET_TOKEN() {
        localStorage.removeItem('auth-token')
        state.token = null
    },

    SET_USER(state, user) {
        state.user = user
    },

    RESET_STATE(state) {
        Object.assign(state, initialState())
    }
}

const actions = {
    processRegistrationToAPI ({ commit, dispatch }, registrationData) {
        return axios.post(process.env.VUE_APP_AUTH_URL + 'register', registrationData)
            .then(({ data }) => {
                commit('SET_TOKEN', data)
                dispatch('processGetSelf', data)
            })
    },

    processGetSelf ({ commit, dispatch }, token) {
        return axios.get(process.env.VUE_APP_API_URL + 'auth/self', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        }).then(({ data }) => {
            return commit('SET_USER', data)
        })
        .catch(() => {
            dispatch('processLogout')
        })
    },

    processLoginToAPI({ commit, dispatch }, loginData) {
        return axios.post(process.env.VUE_APP_AUTH_URL + 'login', loginData)
            .then(({ data }) => {
                commit('SET_TOKEN', data)
                dispatch('processGetSelf', data)
            })
    },

    processLogout({ commit, dispatch }) {
        commit('UNSET_TOKEN')
        dispatch('resetAllApplicationState')
    },

    checkIfUserChangedDefaultPassword() {
        return HTTP_API().get(`self/check-if-default-password`)
    },

    resetAllApplicationState({ commit }) {
        // First Unset Token ...
        commit('UNSET_TOKEN')
        // Reset Auth State ...
        commit('RESET_STATE')

        // commit('userStore/RESET_STATE', {}, { root: true })
        return
    },

    // eslint-disable-next-line no-unused-vars
    createUserActions({ commit }, payload) {
        return HTTP_API().post('user-actions/create', payload)
    },

    // eslint-disable-next-line no-unused-vars
    validateUserEmailAndTokenToAPI ({ commit }, payload) {
        return HTTP_API().post('auth/validate-email', payload)
    }

}

const getters = {
    token: state => state.token,
    hasAuthToken: state => !!state.token,
    hasUser: state => state.user && state.user.id,
    isAuthenticated: state => !!state.token && state.user && state.user.id,
    user: state => state.user
}

export default { namespaced: true, state, mutations, actions, getters }