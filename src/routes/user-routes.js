import ViewProfile from '../pages/user/Profile.vue'
import EditProfile from '../pages/user/EditProfile.vue'
import MainUserComponent from '../pages/user/Main.vue'

export default [
    {
        name: 'user',
        path: '/user',
        component: MainUserComponent,
        children: [
            {
                name: 'user-profile',
                path: 'profile/:username?',
                component: ViewProfile
            },

            {
                name: 'edit-user-profile',
                path: 'edit-profile',
                component: EditProfile
            },
        ]
    }
]