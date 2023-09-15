import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('authStore', {
            user: 'user'
        })
    },

    methods: {
        ...mapActions('authStore', ['processRegistrationToAPI', 'processLoginToAPI']),

        processLogin(loginData) {
            loginData.username = loginData.email
            
            this.$notify({
                title: 'Login',
                text: 'Logging in ...'
            })

            this.processLoginToAPI(loginData)
                .then(() => {
                    this.$notify({
                        type: 'success',
                        title: 'Login',
                        text: 'Login Successfully!!!'
                    })
                    this.$router.push({ name: 'forum' })
                })
                .catch(error => {
                    this.$notify({
                        type: "error",
                        title: 'Login Error',
                        text: error.response.data.message
                    })
                })
        },

        processRegistration(registrationData) {

            this.$notify({
                title: 'Registration',
                text: 'Processing Registration ...'
            })

            this.processRegistrationToAPI(registrationData)
                .then(() => {
                    this.$notify({
                        type: 'success',
                        title: 'Registration',
                        text: 'You Have Registered Successfully!!!'
                    })
                    this.$router.push({ name: 'forum' })
                })
                .catch(error => {
                    this.$notify({
                        type: "error",
                        title: 'Registration Error',
                        text: error.response.data.message
                    })
                })
        }
    }
}