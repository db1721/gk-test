import { HTTP_API } from '@/helpers/http'

const initialState = () => ({

})

const state = initialState()

const mutations = {
    RESET_STATE(state) {
        Object.assign(state, initialState())
    }
}

const actions = {
    updateUserToAPI ({ commit }, user) {
        return HTTP_API().patch(`users/${user.id}/update`, user)
            .then(response => {
                commit('authStore/SET_USER', response.data, { root: true })
            })
    },

    updateUserProfileToAPI ({ commit, rootState }, { email, username, location, website, about }) {
        const userId = rootState.authStore.user.id
        return HTTP_API().patch(`users/${userId}/update-profile`, { email, username, location, website, about })
            .then(response => {
                commit('authStore/SET_USER', response.data, { root: true })
                return response.data
            })
    },

    uploadUserProfileImageToAPI ({ commit, rootState }, photo) {
        return HTTP_API().post(`users/${rootState.authStore.user.id}/update-image-profile`, photo)
            .then(response => {
                commit('authStore/SET_USER', response.data, { root: true })
                return response.data
            })
    },

    // eslint-disable-next-line no-unused-vars
    changeUserPasswordToAPI ({ commit }, userPasswordData) {
        return HTTP_API().post(`user/${userPasswordData.id}/update-password`, userPasswordData)
    },

    // eslint-disable-next-line no-unused-vars
    getUserProfileFromAPI ({ commit }, username) {
        return HTTP_API().get(`users/username/${username}`)
    },

    // eslint-disable-next-line no-unused-vars
    getForumsByUsername ({ commit }, username) {
        return HTTP_API().get(`users/username/${username}/forums`)
    },

    // eslint-disable-next-line no-unused-vars
    getRepliesByUsername ({ commit }, username) {
        return HTTP_API().get(`users/username/${username}/replies`)
    }
        
}

const getters = {

}

export default { namespaced: true, state, mutations, actions, getters }