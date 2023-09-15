<template>
    <div class="row">
        <div class="col-md-6">
            <div class="box">
                <h3>Login</h3>
                <VeeForm v-slot="{ handleSubmit }" :validation-schema="login_schema" as="div">
                    <form @submit="handleSubmit($event, processLogin)">
                        <div class="form-group">
                            <label>Username or email address <span class="required">*</span></label>
                            <Field name="email" type="text" class="form-control" />
                            <ErrorMessage name="email" class="validation-field-error" />
                        </div>
                        <div class="form-group">
                            <div class="clearfix">
                                <label class="pull-left">
                                    Password <span class="required">*</span>
                                </label>
                                <span class="pull-right"><a href="#">Lost password?</a></span>
                            </div>
                            <Field name="password" type="password" class="form-control" />
                            <ErrorMessage name="password" class="validation-field-error" />
                        </div>
                        <button type="submit" class="btn btn-primary btn-inline">Login</button>
                        <label for="remember" class="checkbox-inline">
                            <input type="checkbox" name="remember" id="remember"> Remember me
                        </label>
                    </form>
                </VeeForm>
            </div>
        </div>
        <div class="col-md-6">
            <div class="spacer-lg visible-sm visible-xs"></div>
            <div class="box">
                <h3>Register</h3>
                <VeeForm v-slot="{ handleSubmit }" :validation-schema="registration_schema" as="div">
                    <form @submit="handleSubmit($event, processRegistration)">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Username<span class="required">*</span></label>
                                    <Field name="username" type="text" class="form-control" />
                                    <ErrorMessage name="username" class="validation-field-error" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Email address <span class="required">*</span></label>
                                    <Field name="email" type="email" class="form-control" />
                                    <ErrorMessage name="email" class="validation-field-error" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>
                                        Password <span class="required">*</span>
                                    </label>
                                    <Field name="password" type="password" class="form-control" />
                                    <ErrorMessage name="password" class="validation-field-error" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>
                                        Re-enter Password <span class="required">*</span>
                                    </label>
                                    <Field name="re_password" type="password" class="form-control" />
                                    <ErrorMessage name="re_password" class="validation-field-error" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </VeeForm>
            </div>
        </div>
    </div>
</template>

<script>
import FormMixin from '../../mixins/form-mixin'
import AuthMixin from '../../mixins/auth-mixin'
import * as yup from 'yup';

export default {
    data () {
        return {
            login_schema: yup.object({
                email: yup.string().required('Email is required'),
                password: yup.string().required('Password is required').min(8),
            }),

            registration_schema: yup.object({
                email: yup.string().required('Email is required').email('Must be a valid Email'),
                username: yup.string().required('Username is required'),
                password: yup.string().required('This is required').min(8, 'Minimum of 8 characters is required'),
                re_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('This is required'),
            }),
        }
    },

    mixins: [ FormMixin, AuthMixin ]    
}
</script>
