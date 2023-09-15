<template>
    <header class="header header-default">
        <div class="header-top">
            <div class="container">
                <div class="header-top-right" v-if="isAuthenticated">
                    <span class="login">
                        <i class="fa fa-user"></i>
                        <router-link :to="{ name: 'user-profile' }">
                            Welcome {{ user.username }}
                        </router-link>
                    </span>
                    <span class="register">
                        <a style="cursor: pointer" @click="logoutUser">
                            <i class="fa fa-sign-out"></i> Logout
                        </a>
                    </span>
                </div>
                <div class="header-top-right" v-else>
                    <!-- <span class="login">
                        <i class="fa fa-lock"></i>
                        <router-link :to="{ name: 'login-register' }">
                            Login
                        </router-link>
                    </span>
                    <span class="register">
                        <i class="fa fa-pencil-square-o"></i>Not a member? <router-link :to="{ name: 'login-register' }">Register</router-link>
                    </span> -->
                </div>
            </div>
        </div>
        <div class="header-main">
            <div class="container">
                <nav class="navbar navbar-default fhmm" role="navigation">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="dropdown">
                            <i class="fa fa-bars"></i>
                        </button>
                        <!-- Logo -->
                        <div class="logo">
                            <router-link to="/">
                                <img src="../../assets/images/gunkustom-logo-179x47.png" alt="GunKustom | Custom Fireams & Ammunitions">
                            </router-link> 
                            <!-- <h1><a href="index.html">GunKustom</a></h1> -->
                            <p class="tagline">Custom Firearms & Ammnutions</p>
                        </div>
                        <!-- Logo / End -->
                    </div><!-- end navbar-header -->

                    <div id="main-nav" class="navbar-collapse collapse">
                        <ul class="nav navbar-nav">
                            <!-- Mega Menu -->
                            <li class="dropdown fhmm-fw">
                                <router-link to="/" data-toggle="dropdown" class="dropdown-toggle disabled dropdown-toggle__caret-holder">
                                    Home
                                </router-link>
                                <!-- <a class="dropdown-toggle dropdown-toggle__caret"><b class="caret"></b></a> -->
                            </li>
                            <!-- Mega Menu / End -->

                            <!-- Mega Menu -->
                            <li class="dropdown fhmm-fw">
                                <router-link 
                                    class="dropdown-toggle dropdown-toggle__caret-holder" 
                                    :to="{ name: 'about-us' }">About Us
                                </router-link>
                                <!-- <a class="dropdown-toggle dropdown-toggle__caret"><b class="caret"></b></a> -->
                            </li>
                           <!-- <li class="dropdown fhmm-fw">
                                <router-link 
                                    class="dropdown-toggle dropdown-toggle__caret-holder" 
                                    :to="{ name: 'forum' }">Forum
                                </router-link>
                                 <a class="dropdown-toggle dropdown-toggle__caret"><b class="caret"></b></a> 
                            </li> -->
                            <!-- Mega Menu -->
                            <!-- <li class="dropdown">
                                <router-link :to="{ name: 'forum' }" data-toggle="dropdown" class="dropdown-toggle disabled dropdown-toggle__caret-holder">Blog</router-link>
                                <a class="dropdown-toggle dropdown-toggle__caret"><b class="caret"></b></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">Long Guns</a></li>
                                    <li><a href="#">Hand Guns</a></li>
                                    <li><a href="#">Gunsmithing</a></li>
                                    <li><a href="#">Accessories</a></li>
                                    <li><a href="#">Custom Builds</a></li>
                                    <li><a href="#">Miscellaneous</a></li>
                                </ul>
                            </li> -->
                            <li class="dropdown fhmm-fw">
                                <router-link 
                                    class="dropdown-toggle dropdown-toggle__caret-holder" 
                                    :to="{ name: 'contact-us' }">Contact Us
                                </router-link>
                                <!-- <a class="dropdown-toggle dropdown-toggle__caret"><b class="caret"></b></a> -->
                            </li>
                        </ul><!-- end nav navbar-nav -->
                    </div><!-- end #main-nav -->

                </nav><!-- end navbar navbar-default fhmm -->
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'


export default {
    mounted () {
        $('.dropdown-toggle').dropdown();
        $(document).on('click', '.fhmm .dropdown-menu', function(e) {
            e.stopPropagation()
        });

        $('.navbar-toggle').on('click', function () {
            $('.navbar-collapse').collapse('toggle');
        });

        $('.dropdown-toggle').on('click', function () {
            $('.navbar-collapse').collapse('toggle');
        });
    },

    computed: {
        ...mapGetters('authStore', {
            isAuthenticated: 'isAuthenticated',
            user: 'user'
        })
    },

    methods: {
        ...mapActions('authStore', ['processLogout']),

        logoutUser () {
            this.processLogout()
                .then(() => {
                    this.$router.push({ name: 'forum' })
                })
        }
    }
}
</script>
