<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6">
                <div class="avatar-form-upload">
                    <div class="row no-gutter">
                        <div class="col-auto">
                            <div class="bbp-single-user-details">
                                <div class="bbp-user-avatar">
                                    <span class="vcard">
                                        <div>
                                            <img width="100" height="100" :src="initialValues.profile_image" class="avatar" />
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto ml-auto">
                                <button class="btn btn-primary" @click="$refs.fileInput.click()">Upload Profile Picture</button>
                                <input
                                    @change="uploadUserImage"
                                    style="display: none"
                                    ref="fileInput"
                                    type="file" 
                                    accept="image/*" 
                                    label="Upload Picture" 
                                    :key="imageFileInputKey"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <VeeForm v-slot="{ handleSubmit }" 
                    :validation-schema="update_profile_schema"
                    :initial-values="initialValues"
                    as="div"
                >
                    <form class="form-default" @submit="handleSubmit($event, saveProfile)">
                        <div class="profile-form-group">
                            <label for="settingsUserName">Username</label>
                            <Field v-slot="{ field }" name="username" as="input" class="form-control">
                                <input :bind="field" type="text" name="username" class="form-control" placeholder="bogart">
                            </Field>
                            <ErrorMessage name="username" class="validation-field-error" />
                        </div>
                        <div class="profile-form-group">
                            <label for="settingsEmail">Email Address</label>
                            <Field v-slot="{ field }" name="email" as="input" class="form-control">
                                <input :bind="field" type="email" name="email" class="form-control" placeholder="bogart">
                            </Field>
                            <ErrorMessage name="email" class="validation-field-error" />
                        </div>
                        <div class="profile-form-group">
                            <label for="settingsUserLocation">Location</label>
                            <Field v-slot="{ field }" name="location" as="input" class="form-control">
                                <input :bind="field" type="text" name="location" class="form-control" placeholder="Slovakia">
                            </Field>
                            <ErrorMessage name="location" class="validation-field-error" />
                        </div>
                        <div class="profile-form-group">
                            <label for="settingsUserWebsite">Website</label>
                            <Field v-slot="{ field }" name="website" as="input" class="form-control">
                                <input :bind="field" type="text" name="website" class="form-control" placeholder="Sample.com">
                            </Field>
                            <ErrorMessage name="website" class="validation-field-error" />
                        </div>
                        <div class="profile-form-group">
                            <label for="settingsUserAbout">About</label>
                            <Field v-slot="{ field }" name="about" as="textarea" class="form-control">
                                <textarea :bind="field" name="about" cols="30" rows="10" placeholder="Lets get started"></textarea>
                            </Field>
                            <ErrorMessage name="about" class="validation-field-error" />
                        </div>
                        <div class="profile-form-group">
                            <label for="settingsUserAbout">Notify me via Email</label>
                            <div class="checkbox-group">
                                <input type="checkbox" id="settingsCheckBox01" name="checkbox">
                                <label for="settingsCheckBox01" style="margin-left: 6px;">
                                    <span class="check"></span>
                                    <span class="tt-text">When someone replies to my thread</span>
                                </label>
                            </div>
                            <!-- <div class="checkbox-group">
                                <input type="checkbox" id="settingsCheckBox02" name="checkbox">
                                <label for="settingsCheckBox02">
                                    <span class="check"></span>
                                    <span class="tt-text">When someone likes my thread or reply</span>
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="settingsCheckBox03" name="checkbox">
                                <label for="settingsCheckBox03">
                                    <span class="check"></span>
                                    <span class="tt-text">When someone mentions me</span>
                                </label>
                            </div> -->
                        </div>
                        <div class="profile-form-group">
                            <button type="submit" class="btn btn-primary btn-inline">Save</button>
                        </div>
                    </form>
                </VeeForm>
            </div>
        </div>
    </div>
</template>

<script>
import UserMixin from '../../mixins/user-mixin'
import FormMixin from '../../mixins/form-mixin'
import * as yup from 'yup'
import { mapActions } from 'vuex'

export default {
    mixins: [ UserMixin, FormMixin ],

    data () {
        return {
            update_profile_schema: {
                username: yup.string().required('Username is required'),
                email: yup.string().required('Username is required')
            },

            initialValues: {
                username: '',
                email: '',
                location: '',
                website: '',
                about: '',
                profile_image: '//placehold.it/100x100'
            },

            imageFileInputKey: 0
        }
    },

    created () {
        if (this.user.id) {
            const { email, username, location, website, about, profile_image } = this.user
            this.setInitialValues({ email, username, location, website, about, profile_image })
        }

        this.eventBus.on('user-loaded', () => {
            const { email, username, location, website, about, profile_image } = this.user
            this.setInitialValues({ email, username, location, website, about, profile_image })
        })
    },
    
    methods: {
        ...mapActions('userStore', ['updateUserProfileToAPI', 'uploadUserProfileImageToAPI']),

        setInitialValues (userProfileData) {
            if (! userProfileData.profile_image || userProfileData.profile_image.length == 0) {
                userProfileData.profile_image = this.initialValues.profile_image
            }

            this.initialValues = userProfileData
        },

        saveProfile (userProfileData) {
            this.$notify({
                title: 'Update Profile',
                text: 'Updating Profile Data ...'
            })

            this.updateUserProfileToAPI(userProfileData)
                .then(() => {
                    this.$notify({
                        type: 'success',
                        title: 'Update Profile',
                        text: 'Your profile was updated successfully!!!'
                    })
                })
                .catch(error => {
                    this.$notify({
                        type: 'error',
                        title: 'Update User Profile Error',
                        text: error.response.data.message
                    })
                })
        },

        uploadUserImage (event) {
            const file = event.target.files[0]

            let formData = new FormData()
            formData.append('photo', file, file.name)

            this.$notify({
                title: 'Profile Image',
                text: 'Uploading Profile Image'
            })

            this.uploadUserProfileImageToAPI(formData)
                .then(user => {
                    const { email, username, location, website, about, profile_image } = user
                    this.setInitialValues({ email, username, location, website, about, profile_image })
                    this.$notify({
                        type: 'success',
                        title: 'Profile Image',
                        text: 'Profile Image Uploaded Successfully!!!'
                    })      
                })
                .catch(error => {
                    this.$notify({
                        type: 'error',
                        title: 'Update Profile Image Error',
                        text: error.response.data.message
                    })
                })
                .finally(() => {
                    this.imageFileInputKey++
                })
        }
    }
}
</script>

<style scoped>
    .profile-form-group {
        padding-top: 20px;
    }
</style>
