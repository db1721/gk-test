<template>
    <div class="row">
        <ul class="forums bbp-replies">
            <li class="bbp-body">
                <div class="topic">
                    <div class="bbp-reply-author">
                        <user-profile-image :user="forum.user" />
                    </div>
                    <div class="bbp-reply-content">
                        <div class="bbp-reply-header clearfix">
                            <div class="bbp-meta">
                                <div class="bbp-reply-post-date">{{ forum.createdAt }}</div>
                                <a v-if="user.id" href="javascript:void(0)" class="btn btn-sm btn-default" @click="goToMainReplyForm">
                                    <i class="fa fa-reply"></i> Reply
                                </a>
                                <a v-if="user.id && forum.userId == user.id" href="javascript:void(0)" style="margin-left: 5px;" class="btn btn-sm btn-default" @click="deleteForum">
                                    <i class="fa fa-reply"></i> Delete
                                </a>
                                <router-link :to="{ name: 'login-register' }" v-if="! user || ! user.id">Login or Register</router-link>
                            </div>
                        </div>
                        <div class="bbp-reply-title">
                            <h3><a href="javascript:void(0)">{{ forum.title }}</a></h3>
                        </div>
                        <div class="bbp-reply-entry" v-html="forum.content"></div>
                        <div class="forum-links-container" v-if="forumLinksLoaded">
                            <vue-plyr :key="index" v-for="(video, index) in detectYoutubeLinks(forum.links)" :ref="`youtube_${index}`">
                                <div class="plyr__video-embed">
                                    <iframe :src="video" />
                                </div>
                            </vue-plyr>
                        </div>

                        <div class="forum-links-container" v-if="forumLinksLoaded">
                            <div class="row single-photo-container" :key="index" v-for="(photo, index) in forum.images" :ref="`youtube_${index}`">
                                <img :src="photo" class="col-md-4" />
                            </div>
                        </div>
                        <div class="bbp-arrow"></div>
                    </div>
                </div>
            </li>
        </ul>

        <!-- Comments -->
        <div class="comments-wrapper">
            <h3>Comments ({{ forum.commentCount }})</h3>
            <ol class="commentlist">
                <li class="comment" v-for="(comment, commentIndex) in forum.comments" :key="comment.id">
                    <div class="comment-wrapper">
                        <div class="comment-author vcard">
                            <user-profile-image :user="comment.user" :comment_reply="true" />

                            <span class="says">says:</span>
                            <div class="comment-meta">
                                <a href="javascript:void(0)">{{ comment.createdAt }}</a>
                                <a href="javascript:void(0)" class="comment-edit-link"></a>
                            </div>
                        </div>
                        <div class="comment-reply" v-if="user.id">
                            <button class="btn btn-sm btn-default" @click="showCommentReply(comment.id)">
                                <i class="fa fa-reply"></i> {{ showCommentReplyId == comment.id ? 'Close' : 'Reply' }}
                            </button>
                            <button class="btn btn-sm btn-default" v-if="user.id == comment.userId" @click="deleteComment(comment.id, commentIndex)">
                                <i class="fa fa-minus"></i> Delete
                            </button>
                        </div>
                        <div class="comment-reply" v-else>
                            <button class="btn btn-sm btn-default" @click="$router.push({ name: 'login-register' })">
                                Login or Register
                            </button>
                        </div>
                        <div class="comment-body" v-html="comment.comment"></div>
                        <div class="comment-links-container" v-if="forumLinksLoaded">
                            <vue-plyr :key="index" v-for="(video, index) in detectYoutubeLinks(comment.links)" :ref="`youtube_${index}`">
                                <div class="plyr__video-embed">
                                    <iframe :src="video" />
                                </div>
                            </vue-plyr>
                            <!-- <youtube-player  /> -->
                        </div>
                    </div>

                    <reply-form
                        v-if="comment"
                        type="comment-reply"
                        :parent_user="comment.user"
                        :visible="showCommentReplyId == comment.id"
                        :forum="forum"
                        :parent_comment="comment"
                        @comment-reply-created="appendChildComment"
                    />

                    <ul class="children">
                        <li class="comment" v-for="(child_comment, childCommentIndex) in comment.childComments" :key="child_comment.id" style="padding-bottom: 20px;">
                            <div class="comment-wrapper">
                                <div class="comment-author vcard">
                                    <user-profile-image :user="child_comment.user" :comment_reply="true" />

                                    <span class="says">says:</span>
                                    <div class="comment-meta">
                                        <a href="javascript:void(0)">{{ child_comment.updatedAt }}</a>
                                        <a href="javascript:void(0)" class="comment-edit-link"></a>
                                    </div>
                                </div>
                                <div class="comment-reply" v-if="user.id">
                                    <button class="btn btn-sm btn-default" @click="showCommentReply(child_comment.id)">
                                        <i class="fa fa-reply"></i> {{ showCommentReplyId == child_comment.id ? 'Close' : 'Reply' }}
                                    </button>
                                    <button class="btn btn-sm btn-default" v-if="user.id == child_comment.userId" @click="deleteChildComment(child_comment.id, childCommentIndex, comment.id)">
                                        <i class="fa fa-minus"></i> Delete
                                    </button>
                                </div>
                                <div class="comment-body" v-html="child_comment.comment"></div>
                                <div class="reply-comment-links-container" v-if="forumLinksLoaded">
                                    <vue-plyr :key="index" v-for="(video, index) in detectYoutubeLinks(child_comment.links)" :ref="`youtube_${index}`">
                                        <div class="plyr__video-embed">
                                            <iframe :src="video" />
                                        </div>
                                    </vue-plyr>
                                    <!-- <youtube-player  /> -->
                                </div>
                            </div>
                            <reply-form
                                v-if="child_comment"
                                type="comment-reply"
                                :parent_user="child_comment.user"
                                :visible="showCommentReplyId == child_comment.id"
                                :forum="forum"
                                :parent_comment="comment"
                                @comment-reply-created="appendChildComment"
                            />
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
        <!-- Comments / End -->

        <!-- Comments Form -->
        <reply-form
            v-if="forum.id && user.id"
            type="forum-topic-reply"
            :parent_user="forum.user"
            :visible="true"
            :forum="forum"
            @comment-created="appendComment"
        />
        <!-- Comments Form / End -->
    </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { mapActions, mapGetters } from 'vuex'
import ReplyForm from './partials/ReplyForm.vue'
import UserProfileImage from './partials/UserProfileImage.vue'
import LinkMixin from '../../mixins/link-mixin'

export default {
    created () {
        this.linksLoaded = false
        this.initializeForum()
    },

    mixins: [LinkMixin],

    data () {
        return {
            showCommentReplyId: null,
            contentLoaded: '',
            // contentLinks: ['https://youtu.be/O36UzaP9O1c'],
            contentLinks: [],
            forumLinksLoaded: false
        }
    },

    components: {
        ReplyForm,
        UserProfileImage,
    },

    computed: {
        ...mapGetters('forumStore', {
            forum: 'forum'
        }),

        ...mapGetters('authStore', {
            user: 'user'
        })
    },

    methods: {
        ...mapActions('forumStore', ['getForumBySystemName', 'deleteForumToAPI']),
        ...mapActions('forumCommentStore', ['deleteCommentToAPI']),

        initializeForum () {
            const forum_system_name = this.$route.params.forum_system_name ? this.$route.params.forum_system_name : null

            if (! forum_system_name) {
                this.$router.push({ name: 'forum' })
            }

            if (! this.forum || this.forum.system_name != forum_system_name) {
                this.getForumBySystemName(forum_system_name)
                    .then(() => {
                        this.forumLinksLoaded = true
                    })
            }
            else {
                this.forumLinksLoaded = true
            }
        },

        showCommentReply (commentId) {
            if (this.showCommentReplyId == commentId) {
                this.showCommentReplyId = false
                return
            }

            this.showCommentReplyId = commentId
        },

        appendComment (comment) {
            this.forum.comments.push(comment)
        },

        appendChildComment (childComment) {
            this.showCommentReplyId = null
            this.forum.comments.find(comment => comment.id == childComment.parentCommentId)
                .childComments
                .push(childComment)
        },

        goToMainReplyForm () {
            const element = document.getElementById("main-reply-form");
            element.scrollIntoView({ behavior: "smooth", block: "end" });
        },

        deleteForum () {
            this.deleteForumToAPI(this.forum.id)
                .then(() => {
                    this.$router.go(-1)
                })
        },

        // eslint-disable-next-line no-unused-vars
        deleteComment (commentId, commentIndex) {
            // For Testing
            // const comments = this.forum.comments
            // console.log(comments.splice(commentIndex, 1))

            this.deleteCommentToAPI(commentId)
                .then(() => {
                    const comments = this.forum.comments
                    comments.splice(commentIndex, 1)
                })
        },

        // eslint-disable-next-line no-unused-vars
        deleteChildComment (commentId, commentIndex, parentCommentId) {
            const parentComment = this.forum.comments.find(comment => {
                return comment.id == parentCommentId
            })
            

            if (! parentComment) {
                return
            }

            // For Testing ...
            // const comments = parentComment.childComments
            // console.log(comments.splice(commentIndex, 1))
            this.deleteCommentToAPI(commentId)
                .then(() => {
                    const comments = parentComment.childComments
                    comments.splice(commentIndex, 1)
                })
        }
    }
}
</script>

<style lang="css" scoped>
    .comment-links-container {
        width: 500px;
    }

    .reply-comment-links-container {
        width: 320px;
    }

    .single-photo-container {
        margin-left: 10px;
        margin-bottom: 10px;
    }
</style>