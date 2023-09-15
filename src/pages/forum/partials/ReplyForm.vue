<template>
    <div :class="{ 'comment-respond': true, 'main-reply-form': type == 'forum-topic-reply' }" v-if="visible">
        <h3 class="reply-title">
            {{ type == 'comment-reply' ? 'Reply to: ' + parent_user.username : 'Leave a reply' }}
        </h3>
        <!-- <p class="comment-notes text-muted"><i>Your email address will not be published. Required fields are marked <span class="required">*</span></i></p> -->

        <VeeForm v-slot="{ handleSubmit }" 
            :validation-schema="type == 'comment-reply' ? comment_reply_schema : forum_topic_reply_schema"
            :initial-values="initialValues" 
            as="div"
        >
            <form @submit="handleSubmit($event, saveCommentReply)">
                <div class="form-group">
                    <label for="">Comment</label>
                    <Field v-slot="{ field }" name="comment" as="textarea" class="form-control">
                        <textarea :bind="field" name="comment" cols="30" rows="10" placeholder="Lets get started"></textarea>
                    </Field>
                    <ErrorMessage name="comment" class="validation-field-error" />
                </div>
                <button type="submit" class="btn btn-primary">Send Comment</button>
            </form>
        </VeeForm>

        <div v-if="type == 'forum-topic-reply'" id="main-reply-form"></div>
    </div>
</template>

<script>
import FormMixin from '../../../mixins/form-mixin'
import * as yup from 'yup'
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['type', 'parent_user', 'forum', 'visible', 'parent_comment'],

    mixins: [ FormMixin ],

    data () {
        return {
            forum_topic_reply_schema: {
                categoryId: yup.number().positive().required(),
                userId: yup.number().positive().required(),
                forumId: yup.number().positive().required(),
                comment: yup.string().required('Please enter a content').min(1, 'Comment Content is required')
            },

            comment_reply_schema: {
                categoryId: yup.number().positive().required(),
                parentCommentId: yup.number().positive().required(),
                userId: yup.number().positive().required(),
                forumId: yup.number().positive().required(),
                comment: yup.string().required('Please enter a content').min(1, 'Comment Content is required')
            },

            initialValues: {
                categoryId: null,
                userId: null,
                forumId: null,
                comment: ''
            }
        }
    },

    created () {
        this.initialValues.forumId      = this.forum.id
        this.initialValues.categoryId   = this.forum.categoryId

        if (this.user.id) {
            this.initialValues.userId       = this.user.id
        }

        if (this.type == 'comment-reply') {
            this.initialValues.parentCommentId = this.parent_comment.id
        }
    },

    computed: {
        ...mapGetters('authStore', {
            user: 'user'
        })
    },

    methods: {
        ...mapActions('forumCommentStore', ['createForumComment', 'createCommentReply']),

        saveCommentReply (saveCommentData) {
            saveCommentData.forumId    = this.forum.id
            saveCommentData.categoryId = this.forum.categoryId

            if (this.type == 'comment-reply') {
                this.createCommentReply(saveCommentData)
                    .then(newChildComment => {
                        this.initialValues.comment = ''
                        this.$emit('comment-reply-created', newChildComment)
                    })
                    .catch(error => {
                        this.$notify({
                            type: "error",
                            title: 'Reply Error',
                            text: error.response.data.message
                        })
                    })
                return
            }

            this.createForumComment(saveCommentData)
                .then(newComment => {
                    this.initialValues.comment = ''
                    this.$emit('comment-created', newComment)
                })
                .catch(error => {
                    this.$notify({
                        type: "error",
                        title: 'Reply Error',
                        text: error.response.data.message
                    })
                })
        }
    }
}
</script>