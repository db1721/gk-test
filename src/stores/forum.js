import { HTTP_API } from '@/helpers/http'

const initialState = () => ({
    forums: [],
    forums_by_category: [],
    
    forum: {
        id: null,
        system_name: null,
        user: {
            id: null,
            username: null
        }
    },

    search_results: []
})

const state = initialState()

const mutations = {
    SET_FORUMS_BY_CATEGORY (state, forums) {
        state.forums_by_category = forums
    },

    SET_FORUM: (state, forum) => state.forum = forum,

    SET_SEARCH_RESULTS (state, search_results) {
        state.search_results = search_results
    },

    EMPTY_SEARCH_RESULTS (state) {
        state.search_results = []
    },

    RESET_STATE(state) {
        Object.assign(state, initialState())
    }
}

const actions = {
    getForumsByCategorySystemNameFromAPI({ commit }, categorySystemName) {
        return HTTP_API().get(`forums/get-by-category-system-name/${categorySystemName}`)
            .then(response => {
                commit('SET_FORUMS_BY_CATEGORY', response.data)
                return response.data
            })
    },

    getForumsByCategoryIdFromAPI ({ commit }, categoryId) {
        return HTTP_API().get(`forums/get-by-category-id/${categoryId}`)
            .then(response => {
                commit('SET_FORUMS_BY_CATEGORY', response.data)
            })
    },

    getForumBySystemName ({ commit }, forum_system_name) {
        return HTTP_API().get(`forums/get-by-system-name/${forum_system_name}`)
            .then(response => {
                commit('SET_FORUM', response.data)
                return response.data
            })
    },

    // eslint-disable-next-line no-unused-vars
    saveForumByUser ({ commit }, formData) {
        return HTTP_API().post(`forums/create`, formData)
            .then(response => {
                return response.data
            })
    },

    // eslint-disable-next-line no-unused-vars
    createUserActions({ commit }, payload) {
        return HTTP_API().post('user-actions/create', payload)
    },

    searchForums ({ commit }, params) {
        params.page     = params.page ? params.page : 1
        params.search   = params.search ? params.search : ''

        return HTTP_API().get(`forums?page=${params.page}&search=${params.search}`)
            .then(response => {
                commit('SET_SEARCH_RESULTS', response.data.data)
                return response.data
            })
    },

    deleteForumToAPI ({ commit }, forumId) {
        return HTTP_API().delete(`forums/${forumId}`)
            .then(response => {
                commit('SET_FORUM', {
                    id: null,
                    system_name: null,
                    user: {
                        id: null,
                        username: null
                    }
                })

                return response.data
            })
    }
}

const getters = {
    forums_by_category: state => state.forums_by_category,
    forum: state => state.forum,
    search_results: state => state.search_results
}

export default { namespaced: true, state, mutations, actions, getters }