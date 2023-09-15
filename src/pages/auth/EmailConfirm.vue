<template>
    <div>Processing</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    created () {
        if (! this.$route.query.token || ! this.$route.query.email) {
            this.$router.push({ name: '404-not-found' })
            return
        }

        this.validateUserEmailAndTokenToAPI({
            email: this.$route.query.email,
            token: this.$route.query.token
        })
        .then(() => {
            this.$router.push({ name: 'login-register' })
            return
        })
        .catch(() => {
            this.$router.push({ name: '404-not-found' })
            return            
        })
    },

    methods: {
        ...mapActions('authStore', ['validateUserEmailAndTokenToAPI'])
    }
}
</script>
