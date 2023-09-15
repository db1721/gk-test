import { HTTP_API } from '@/helpers/http'

const initialState = () => ({
    main_categories: [],

    category: {
        id: 0,
    },

    current_category: {
        id: false,
        name: '',
        system_name: ''
    }
})

const state = initialState()

const mutations = {
    SET_MAIN_CATEGORIES (state, categories) {
        state.main_categories = categories
    },

    SET_CATEGORY (state, category) {
        state.category = category
    },

    RESET_STATE(state) {
        Object.assign(state, initialState())
    }
}

const actions = {
    getAllMainCategoriesFromAPI({ commit }) {
        return HTTP_API().get(`forum-categories/main`)
            .then(({ data }) => {
                commit('SET_MAIN_CATEGORIES', data)
                return data
            })
    },

    getForumCategoryBySystemName ({ commit }, forumCategorySystemName) {
        return HTTP_API().get(`forum-categories/system_name/${forumCategorySystemName}`)
            .then(({ data }) => {
                commit('SET_CATEGORY', data)
                return data
            })
    },

    // eslint-disable-next-line no-unused-vars
    createUserActions({ commit }, payload) {
        return HTTP_API().post('user-actions/create', payload)
    }
}

const getters = {
    main_categories: state => state.main_categories,
    current_category: state => state.current_category,
    category: state => state.category
}

export default { namespaced: true, state, mutations, actions, getters }