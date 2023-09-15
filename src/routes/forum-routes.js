import MainForumPage from '../pages/forum/Main.vue'
import ForumListByCategory from '../pages/forum/ForumListByCategory.vue'
import ForumView from '../pages/forum/ForumView.vue'
import ForumSave from '../pages/forum/ForumSave.vue'

export default [
    {
        name: 'forum',
        path: '/forum',
        component: MainForumPage
    },

    {
        name: 'forum-list-by-category',
        path: '/forum/list-by-category/:forum_category_system_name',
        component: ForumListByCategory
    }, 

    {
        name: 'forum-view',
        path: '/forum/:forum_system_name',
        component: ForumView
    },

    {
        name: 'forum-save',
        path: '/forum/save/:forum_category_id?',
        component: ForumSave
    }
]