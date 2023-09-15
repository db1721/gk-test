import Notifications from '@kyvg/vue3-notification'
import mitt from 'mitt';
import VueGtag from 'vue-gtag';
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default new class Bootstrapper {
    vueApp = false
    router = false

    setMainVueInstance (vueApp) {
        this.vueApp = vueApp
        return this
    }

    initializePlugins () {
        this.initializeNotificationPopup()
        this.initilizeEventBus()
        this.initializeYoutubePlayer()
    }

    initializeNotificationPopup () {
        this.vueApp.use(Notifications)
    }

    initilizeEventBus () {
        this.vueApp.config.globalProperties.eventBus = mitt()
    }

    initializeYoutubePlayer () {
        this.vueApp.use(VuePlyr)
    }

    setRouter (router) {
        this.router = router
        return this
    }

    initializeGoogleAnalytics () {
        this.vueApp.use(VueGtag, {
            config: {
                id: 'G-W268C43SY5'
            }
        })

        return this
    }
}