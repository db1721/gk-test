<template>
    <div class="row">
        <div class="bbp-single-user-details">
            <div class="row">
                <div class="bbp-user-avatar">
                    <span class="vcard">
                        <a href="javascript:void(0)">
                            <img :src="current_user.profile_image ? current_user.profile_image : '//placehold.it/80x80'" alt="" class="avatar">
                        </a>
                    </span>
                    <div class="bbp-user-avatar" style="margin-top: 20px" v-if="user && user.id == current_user.id">
                        <router-link class="btn btn-primary" :to="{ name: 'edit-user-profile' }">Edit Profile</router-link>
                    </div>
                </div>
                <div class="bbp-user-navigation">
                    <div >
                        <h2 >{{ current_user.username ? current_user.username : current_user.email }}</h2>
                        <p class="bbp-user-forum-role">Forum Role: Member</p>
                        <h3 id="profile">Profile</h3>
                        <p class="bbp-user-section">{{ current_user.about }}</p>
                    </div>
                </div>
            </div>
            <!-- 
                OLD
                <div class="bbp-user-navigation">
                <div class="row">
                    <div class="col-md-6">
                        <ul>
                            <li class="current"><a href="javascript:void(0)">Profile</a></li>
                            <li><a href="javascript:void(0)">Topic Started</a></li>
                            <li><a href="javascript:void(0)">Replies Created</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul>
                            <li><a href="javascript:void(0)">Favorites</a></li>
                        </ul>
                    </div>
                </div>
            </div> -->

            
        </div>

        <div class="tabs">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li :class="{ active: current_tab == 'topic' }">
                    <a @click="current_tab = 'topic'" href="javascript:void(0)" data-toggle="tab">Topic Started: {{ current_user.forumCount }}</a>
                </li>
                <li :class="{ active: current_tab == 'replies' }">
                    <a @click="current_tab = 'replies'" href="javascript:void(0)" data-toggle="tab">Replies Created: {{ current_user.commentCount }}</a>
                </li>
                <!-- <li>
                    <a href="javascript:void(0)" data-toggle="tab">Favorites: 4</a>
                </li> -->
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane fade in" :class="{ active: current_tab == 'topic' }" id="topic-started" v-if="current_tab == 'topic'">
                    <ul>
                        <li v-for="user_forum in user_forums" :key="user_forum.id">
                            <router-link :to="{ name: 'forum-view', params: { forum_system_name: user_forum.system_name } }">{{ user_forum.title }}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade in" :class="{ active: current_tab == 'replies' }" id="replies-created" v-if="current_tab == 'replies'">
                    <div class="repliescreated" v-for="user_reply in user_replies" :key="user_reply.id">
                        <strong>{{ user_reply.user.username }}</strong> commented on <router-link :to="{ name: 'forum-view', params: { forum_system_name: user_reply.forum.system_name } }">{{ user_reply.forum.title }}</router-link>
                        <blockquote>{{ user_reply.comment }}</blockquote>
                    </div>
                </div>
                <!-- <div class="tab-pane fade" id="favorites">
                    <div class="favorites">
                        <strong>username</strong> favorited the <a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet sollicitudin sem, vel iaculis turpis tempus sed.</a>
                    </div>
                    <div class="favorites">
                        <strong>username</strong> favorited the <a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet sollicitudin sem, vel iaculis turpis tempus sed.</a>
                    </div>
                    <div class="favorites">
                        <strong>username</strong> favorited the <a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet sollicitudin sem, vel iaculis turpis tempus sed.</a>
                    </div>
                    <div class="favorites">
                        <strong>username</strong> favorited the <a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet sollicitudin sem, vel iaculis turpis tempus sed.</a>
                    </div>
                </div> -->
            </div>
        </div>

        <!-- 
            OLD
            <div class="bbp-user-body">
            <h2>Profile</h2>
            <p class="bbp-user-section">{{ current_user.about }}</p>
            <p class="bbp-user-forum-role">
                Forum Role: Member
            </p>
            <p class="bbp-user-topic-count">
                Topics Started: {{ current_user.forumCount }}
            </p>
            <p class="bbp-user-reply-count">
                Replies Created: {{ current_user.commentCount }}
            </p>
        </div> -->

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserMixin from '../../mixins/user-mixin'

export default {
    mixins: [ UserMixin ],

    data () {
        return {
            current_user: {
                id: 0
            },

            current_tab: 'topic',

            user_forums: [],
            user_replies: []
        }
    },

    created () {
        if (this.$route.params.username && this.$route.params.username != '') {
            this.getUserProfileFromAPI(this.$route.params.username)
                .then(({ data }) => {
                    this.current_user = data
                    this.getForumsByUsername(data.username)
                        .then(response => {
                            this.user_forums = response.data
                        })

                    this.getRepliesByUsername(this.user.username)
                        .then(response => {
                            this.user_replies = response.data
                        })
                })
        } 
        else {
            if (this.user.id) {
                this.current_user = this.user
                this.getForumsByUsername(this.user.username)
                    .then(response => {
                        this.user_forums = response.data
                    })

                this.getRepliesByUsername(this.user.username)
                    .then(response => {
                        this.user_replies = response.data
                    })
            }
            
            this.eventBus.on('user-loaded', () => {
                this.current_user = this.user
                this.getForumsByUsername(this.user.username)
                    .then(response => {
                        this.user_forums = response.data
                    })

                this.getRepliesByUsername(this.user.username)
                    .then(response => {
                        this.user_replies = response.data
                    })
            })
        }
    },

    watch: {
        user () {
            this.current_user = this.user
        }
    },

    methods: {
        ...mapActions('userStore', ['getForumsByUsername', 'getRepliesByUsername'])
    }
}
</script>
