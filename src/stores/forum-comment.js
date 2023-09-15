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
    // eslint-disable-next-line no-unused-vars
    createForumComment (context, createForumCommentData) {
        return HTTP_API().post(`forum-comments`, createForumCommentData)
            .then(response => {
                return response.data
            })
    },

    // eslint-disable-next-line no-unused-vars
    createCommentReply (context, createCommentReplyData) {
        return HTTP_API().post(`forum-comments/${createCommentReplyData.parentCommentId}`, createCommentReplyData)
            .then(response => {
                return response.data
            })
    },

    // eslint-disable-next-line no-unused-vars
    createUserActions({ commit }, payload) {
        return HTTP_API().post('user-actions/create', payload)
    },

    // eslint-disable-next-line no-unused-vars
    deleteCommentToAPI({ commit }, commentId) {
        return HTTP_API().delete(`forum-comments/${commentId}`)
    }   
}

const getters = {
    
}

export default { namespaced: true, state, mutations, actions, getters }