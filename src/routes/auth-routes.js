import LoginRegisterComponent from '../pages/auth/LoginRegister.vue'
import AuthEmailConfirmComponent from '../pages/auth/EmailConfirm.vue'

export default [
    {
        name: 'login-register',
        path: '/login-register',
        component: LoginRegisterComponent
    },
    {
        name: "auth-email-confirm",
        path: "/auth/confirm",
        component: AuthEmailConfirmComponent
    }
]