<template>
  <HeaderBar />

  <div class="main" role="main">
    <!-- <SubHeader /> -->

    <!-- Main Content -->
    <section class="page-content">
			<div class="container">
        <router-view />
      </div>
    </section>
    <!-- End Main Content -->

    <Footer />
    <notifications />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import HeaderBar from './components/template/HeaderBar.vue'
// import SubHeader from './components/template/SubHeader.vue'
// import Footer from './components/template/Footer.vue'

export default {
  name: 'App',
  
  components: {
    HeaderBar,
    // SubHeader,
    Footer
  },

  computed: {
    ...mapGetters('authStore', {
      hasUser: 'hasUser',
      hasAuthToken: 'hasAuthToken',
      token: 'token'
    })
  },

  created () {
    if (this.hasAuthToken && ! this.hasUser) {
      this.processGetSelf(this.token)
        .then(() => {
          this.eventBus.emit('user-loaded')
        })
    }
  },

  methods: {
    ...mapActions('authStore', ['processGetSelf'])
  }
}
</script>

<style scoped lang="css">
  @import "./assets/css/bootstrap.min.css";
  @import "./assets/css/fonts/font-awesome/css/font-awesome.css";
  @import "./assets/css/theme.css";
  @import "./assets/css/theme-elements.css";
  @import "./assets/css/animate.min.css";
  @import "./assets/css/skins/gunkustom-color.css";
  @import "./assets/css/custom.css";
</style>