<template>
    <a href="javascript:void(0)" class="bbp-author-avatar">
        <img 
            :src="user.profile_image ? user.profile_image : '//placehold.it/70x70'" 
            :alt="user.username" 
            :class="comment_reply ? 'gravatar' : 'avatar'"
            @click="goToUserProfile(user)"
        />
    </a>

    <h5 v-if="comment_reply" @click="goToUserProfile(user)" style="cursor: pointer">{{ user.username }}</h5>

    <a v-if="! comment_reply" href="javascript:void(0)" class="bbp-author-name" @click="goToUserProfile(user)">{{ user.username }}</a>
    <div class="bbp-author-role" v-if="! comment_reply">user</div>

    <div class="bbps-post-count" v-if="! comment_reply && user.forums">Post count: {{ user.forums.length }}</div>
</template>

<script>
export default {
    props: ['user', 'comment_reply'],

    methods: {
        goToUserProfile (user) {
            this.$router.push({ name: 'user-profile', params: { username: user.username } })
        }
    }
}
</script>
