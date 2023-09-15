import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('authStore', {
            user: 'user'
        })
    },

    methods: {
        ...mapActions('userStore', ['updateUserToAPI', 'getUserProfileFromAPI'])
    }
}