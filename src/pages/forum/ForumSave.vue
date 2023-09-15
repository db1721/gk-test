<template>
    <div class="tt-wrapper-inner">
            <h1 class="tt-title-border">
                Create New Topic
            </h1>
            <VeeForm v-slot="{ handleSubmit }" :validation-schema="create_forum_schema" :initial-values="initial_values" as="div">
                <form class="form-default form-create-topic" @submit="handleSubmit($event, saveForum)">
                    <div class="form-group">
                        <label for="inputTopicTitle">Topic Title</label>
                        <div class="tt-value-wrapper">
                            <Field name="title" type="text" class="form-control" placeholder="Subject of your topic" />
                            <ErrorMessage name="title" class="validation-field-error" />
                            <!-- <span class="tt-value-input">99</span> -->
                        </div>
                        <div class="tt-note">Describe your topic well, while keeping the subject as short as possible.</div>
                    </div>
                    <div class="pt-editor">
                        <h6 class="pt-title">Topic Body</h6>
                        <div class="pt-row">
                            <div class="form-group">
                                <Field v-slot="{ field }" name="content" as="textarea" class="form-control">
                                    <textarea :bind="field" name="content"  rows="5" placeholder="Lets get started"></textarea>
                                </Field>
                                <ErrorMessage name="content" class="validation-field-error" />
                                <div class="row" style="padding-left: 15px; padding-top: 10px;">
                                    <div
                                        v-for="image in imagePreviews"
                                        :key="image"
                                        class="previewBlock col-md-2"
                                        :style="{ 'background-image': `url(${image})` }">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="inputTopicTitle">Category</label>
                                        <Field name="categoryId" as="select" class="form-control">
                                            <optgroup v-for="main_category in main_categories" :label="main_category.name" :key="main_category.id">
                                                <option :value="category.id" v-for="category in main_category.childCategories" :key="category.id">{{ category.name }}</option>
                                            </optgroup>
                                        </Field>
                                        <ErrorMessage name="categoryId" class="validation-field-error" />
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="inputTopicTags">Tags</label>
                                        <input type="text" name="name" class="form-control" id="inputTopicTags" placeholder="Use comma to separate tags">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button 
                                        type="submit" class="btn btn-primary btn-width-lg"
                                        :class="{ 'reduce-opacity': savingForum }"
                                    >
                                        {{ savingForum ? 'Saving ... Please Wait ...' : 'Save Post' }}
                                    </button>
                                </div>

                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary" @click="$refs.fileInput.click()">Upload Profile Picture</button>
                                    <input
                                        v-if="! savingForum"
                                        @change="uploadForumImage"
                                        style="display: none"
                                        ref="fileInput"
                                        type="file"
                                        multiple
                                        accept="image/*" 
                                        label="Upload Picture" 
                                        :key="imageFileInputKey"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </VeeForm>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormMixin from '../../mixins/form-mixin'
import * as yup from 'yup'

export default {
    mixins: [ FormMixin ],

    created () {
        if (this.main_categories.length == 0) {
            this.getAllMainCategoriesFromAPI()
        }

        if (this.$route.params.forum_category_id) {
            this.initial_values.categoryId = this.$route.params.forum_category_id
        }
    },

    data () {
        return {
            create_forum_schema: {
                categoryId: yup.number().positive('Please select a category').required(),
                title: yup.string().required('Please enter a title').min(5),
                content: yup.string().required('Please enter a content').min(5),
            },

            initial_values: {
                categoryId: 0,
                title: '',
                content: '',
            },

            imageFileInputKey: 0,

            formData: new FormData(),

            forumImageUploads: [],

            imagePreviews: [],

            savingForum: false
        }
    },

    computed: {
        ...mapGetters('forumCategoryStore', {
            main_categories: 'main_categories'
        }),

        ...mapGetters('authStore', {
            user: 'user'
        })
    },

    methods: {
        ...mapActions('forumCategoryStore', ['getAllMainCategoriesFromAPI']),
        ...mapActions('forumStore', ['saveForumByUser']),

        uploadForumImage (event) {
            this.forumImageUploads.push(event.target.files[0])

            this.imagePreviews = []
            for (const imageIndex in this.forumImageUploads) {
                this.imagePreviews.push(URL.createObjectURL(this.forumImageUploads[imageIndex]))
            }
        },

        saveForum (forumData) {
            if (this.savingForum) {
                return
            }

            this.$notify({
                title: 'Saving',
                text: 'Forum Saving ...'
            })
            this.savingForum = true

            forumData.userId = this.user.id
            this.formData.set('forumData', JSON.stringify(forumData))

            // Append the image uploads in the formData ...
            for (const imageIndex of Object.keys(this.forumImageUploads)) {
                this.formData.append('photos', this.forumImageUploads[imageIndex], this.forumImageUploads[imageIndex].name)
            }

            this.saveForumByUser(this.formData)
                .then(forum => {
                    this.$notify({
                        type: 'success',
                        title: 'Forum Saved',
                        text: 'Forum Saved Successfully!'
                    })
                    this.$router.push({ name: 'forum-view', params: { forum_system_name: forum.system_name } })
                })
                .catch(error => {
                    this.savingForum = false
                    console.log(error)
                    console.log('Error please try again')
                    this.$notify({
                        type: "error",
                        title: 'Topic Create Error',
                        text: error.response.data.message
                    })
                })
        }
    }
}
</script>
<style scoped lang="css">
    .previewBlock {
        display: block;
        cursor: pointer;
        margin-right: 10px! important;
        width: 180px;
        height: 150px;        
        margin: 0 auto 20px;
        background-position: center center;
        background-size: cover;
    }

    .reduce-opacity {
        opacity: .5;
    }
</style>