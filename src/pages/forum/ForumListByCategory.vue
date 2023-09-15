<template>
    <div>
        <div class="row">
            <search-component />

            <div class="pull-right">
                <button class="btn btn-primary" v-if="user.id" type="button" @click="$router.push({ name: 'forum-save', params: { forum_category_id: category.id } })">Create New Topic</button>
            </div>

            <!-- Forum section 1 -->
            <h2 class="bbp-forum-subtitle">{{ category.name }}</h2>
            
            <ul class="bbp-forums desktop-forum">
                <li class="bbp-header">
                    <ul class="forum-titles">
                        <li class="bbp-forum-topic">Topic</li>
                        <li class="bbp-forum-topic-submitted">Submitted By</li>
                        <li class="bbp-forum-reply-count">Replies</li>
                        <li class="bbp-forum-view-count">View</li>
                        <li class="bbp-forum-last-post">Last reply</li>
                    </ul>
                </li><!-- .bbp-header -->

                <li class="bbp-body">
                    <ul class="forum" v-for="forum in forums_by_category" :key="forum.id">
                        <li class="bbp-forum-topic">
                            <!-- <a class="bbp-forum-title" href="#" title="General">Custom Builds</a> -->
                            <router-link class="bbp-forum-title" :to="{ name: 'forum-view', params: { forum_system_name: forum.system_name } }">{{ forum.title }}</router-link>
                            <div class="bbp-forum-content">{{ forum.content.slice(0, 50) }}</div>
                        </li>
                        <li class="bbp-forum-topic-submitted">
                            <a href="javascript:void(0)" @click="goToUserProfile(forum.user)">{{ forum.user.username[0].toUpperCase() + forum.user.username.substring(1) }}</a>
                        </li>
                        <li class="bbp-forum-reply-count">{{ forum.comments.length }}</li>
                        <li class="bbp-forum-view-count">{{ forum.viewed }}</li>
                        <li class="bbp-forum-last-post">
                            <a href="javascript:void(0)">{{ forum.comments.length > 0 ? forum.comments[forum.comments.length - 1].comment : 'No replies yet' }}</a>
                            <p class="bbp-topic-meta">
                                <span class="bbp-topic-freshness-author" v-if="forum.comments.length > 0">
                                    <a href="javascript:void(0)" class="bbp-author-name" @click="goToUserProfile(forum.comments[forum.comments.length - 1].user)">{{ forum.comments[forum.comments.length - 1].user.username[0].toUpperCase() + forum.comments[forum.comments.length - 1].user.username.substring(1) }}</a>
                                </span>
                            </p>
                        </li>
                    </ul>
                </li><!-- .bbp-body -->
            </ul><!-- .forums-directory -->
            <!-- Forum 1 / End -->
        </div>
    </div>
    <div class="mobile-forum"> <!--START of MOBILE forum-->
        <div v-for="forum in forums_by_category" :key="forum.id">
            <p>
                <span class="bbp-header">TOPIC:</span> 
                <span class="bbp-forum-title">
                    <router-link :to="{ name: 'forum-view', params: { forum_system_name: forum.system_name } }">{{ forum.title }}</router-link>
                </span>
            </p>
            <p class="bb-forum-content">{{ forum.content.slice(0, 50) }}</p>
            <p>
                <span class="bbp-header">SUBMITTED BY: </span> 
                <span class="bbp-forum-topic-submitted">
                    <a href="javascript:void(0)" @click="goToUserProfile(forum.user)">{{ forum.user.username[0].toUpperCase() + forum.user.username.substring(1) }}</a>
                </span>
            </p>
            <p><span class="bbp-header">REPLIES: </span> {{ forum.comments.length }}</p>
            <p><span class="bbp-header">VIEW:  </span> {{ forum.viewed }}</p>
            <p>
                <span class="bbp-header">LAST POST: </span>
                <span class="bbp-forum-last-post">
                    <a href="javascript:void(0)">{{ forum.comments.length > 0 ? forum.comments[forum.comments.length - 1].comment : 'No replies yet' }}</a>
                </span>
            </p>
            <p class="bbp-topic-meta">
                <span class="bbp-topic-freshness-author" v-if="forum.comments.length > 0">
                    <a href="javascript:void(0)" class="bbp-author-name" @click="goToUserProfile(forum.comments[forum.comments.length - 1].user)">{{ forum.comments[forum.comments.length - 1].user.username[0].toUpperCase() + forum.comments[forum.comments.length - 1].user.username.substring(1) }}</a>
                </span>
            </p>
            <hr>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchComponent from './partials/Search.vue'

export default {
    components: {
        SearchComponent
    },

    created () {
        const route_category_system_name = this.$route.params.forum_category_system_name

        // if (! this.category.id || this.category.system_name != route_category_system_name) {
            this.getForumCategoryBySystemName(route_category_system_name)
            this.getForumsByCategorySystemNameFromAPI(route_category_system_name)
        // }
    },

    computed: {
        ...mapGetters('authStore', {
            user: 'user'
        }),
        
        ...mapGetters('forumStore', {
            forums_by_category: 'forums_by_category'
        }),

        ...mapGetters('forumCategoryStore', {
            category: 'category'
        })
    },

    methods: {
        ...mapActions('forumCategoryStore', ['getForumCategoryBySystemName']),
        ...mapActions('forumStore', ['getForumsByCategorySystemNameFromAPI']),

        goToUserProfile (user) {
            this.$router.push({ name: 'user-profile', params: { username: user.username } })
        }
    }
}
</script>
