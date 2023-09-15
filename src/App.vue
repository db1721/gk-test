<template>
  <!-- <ComingSoon /> -->
  <router-view />
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
// import ComingSoon from './pages/home/ComingSoon.vue'

export default {
  name: 'App',
  
//   components: {
   
//     ComingSoon
// },

  // computed: {
  //   ...mapGetters('authStore', {
  //     hasUser: 'hasUser',
  //     hasAuthToken: 'hasAuthToken',
  //     token: 'token'
  //   })
  // },

  // created () {
  //   if (this.hasAuthToken && ! this.hasUser) {
  //     this.processGetSelf(this.token)
  //       .then(() => {
  //         this.eventBus.emit('user-loaded')
  //       })
  //   }
  // },

  // methods: {
  //   ...mapActions('authStore', ['processGetSelf'])
  // }
}
</script>

<style  lang="scss">
@import './assets/css/_global.scss';
@import './assets/css/base.scss';


 
  
</style>