import { createRouter, createWebHistory } from "vue-router";

// import AuthRoutes from './auth-routes'
// import UserRoutes from './user-routes'
// import ForumRoutes from './forum-routes'
import ComingSoonComponent from '../pages/home/ComingSoon.vue'
// import AboutUsComponent from '../pages/home/AboutUs'
// import ContactUsComponent from '../pages/home/ContactUs'
// import PageNotFound from '../pages/PageNotFound'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            // HomePage Page ...
            path: '/',
            name: 'home',
            component: ComingSoonComponent // HomePageComponent
        },

        // {
        //     // HomePage Page ...
        //     path: '/about-us',
        //     name: 'about-us',
        //     component: AboutUsComponent
        // },

        // {
        //     // HomePage Page ...
        //     path: '/contact-us',
        //     name: 'contact-us',
        //     component: ContactUsComponent
        // },

        // { 
        //     path: "/:pathMatch(.*)*",
        //     name: '404-not-found', 
        //     component: PageNotFound 
        // },

        // ...AuthRoutes,
        // ...ForumRoutes,
        // ...UserRoutes,
    ]
})