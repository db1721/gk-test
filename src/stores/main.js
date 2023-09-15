import { createStore } from "vuex"
import authStore from './auth'
import userStore from './user'
import forumStore from './forum'
import forumCategoryStore from './forum-category'
import forumCommentStore from './forum-comment'

export const store = createStore({
    modules: {
        authStore,
        userStore,
        forumStore,
        forumCategoryStore,
        forumCommentStore
    }
})