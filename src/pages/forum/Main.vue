<template>
    <div class="row">
        <search-component />

        <div class="pull-right">
            <button class="btn btn-primary" v-if="user.id" type="button" @click="$router.push({ name: 'forum-save' })">Create New Topic</button>
        </div>

        <!-- Forum section 1 -->
        <div v-for="main_category in main_categories" :key="main_category.id">
            <h2 class="bbp-forum-subtitle">
                {{ main_category.name }}
            </h2>
        
            <ul class="bbp-forums">
                <li class="bbp-header">
                    <ul class="forum-titles">
                        <li class="bbp-forum-info">Forum</li>
                        <li class="bbp-forum-topic-count">Topics</li>
                        <li class="bbp-forum-reply-count">Posts</li>
                        <li class="bbp-forum-freshness">Most Recent Topic</li>
                    </ul>
                </li><!-- .bbp-header -->

                <li class="bbp-body" v-for="category in main_category.childCategories" :key="category.id">
                    <ul class="forum">
                        <li class="bbp-forum-info">
                            <router-link 
                                :to="{ name: 'forum-list-by-category', params: { forum_category_system_name: category.system_name } }" 
                                class="bbp-forum-title" 
                                title="General"
                            >
                                {{ category.name }}
                            </router-link>
                            <!-- <div class="bbp-forum-content">Class aptent taciti</div> -->
                        </li>
                        <li class="bbp-forum-topic-count">{{ category.forumCount }}</li>
                        <li class="bbp-forum-reply-count">{{ category.commentCount }}</li>
                        <li class="bbp-forum-freshness" v-if="category.latestForum">
                            <router-link :to="{ name: 'forum-view', params: { forum_system_name: category.latestForum.system_name } }">{{ category.latestForum.title }}</router-link>
                            <p class="bbp-topic-meta">
                                <span class="bbp-topic-freshness-author">
                                    <router-link :to="{ name: 'user-profile', params: { username: category.latestForum.user.username } }" class="bbp-author-name">by: {{ category.latestForum.user.username }}</router-link>
                                </span>
                            </p>
                        </li>
                        <li class="bbp-forum-freshness" v-else>
                            None
                        </li>
                    </ul>
                </li><!-- .bbp-body -->
            </ul>
        </div>
        <!-- .forums-directory -->
        <!-- Forum 1 / End -->
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
        if (this.main_categories.length == 0) {
            this.getAllMainCategoriesFromAPI()
        }
    },

    computed: {
        ...mapGetters('forumCategoryStore', {
            main_categories: 'main_categories'
        }),

        ...mapGetters('authStore', {
            user: 'user'
        }),
    },

    methods: {
        ...mapActions('forumCategoryStore', ['getAllMainCategoriesFromAPI'])
    }
}
</script>
