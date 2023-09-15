<template>
    <div class="title-accent aligncenter">
        <h1>Welcome to GunKustom Forum</h1>
        <hr class="sm">
    </div>
    <figure class="alignleft">
        <img src="/images/1966-ar15-assault-rifle-patent-print-m-16-blueprint-greg-edwards.jpg" width="600" height="450" alt="1966 AR15 Assault Rifle Patent Print M16 Blueprint by Greg Edwards">
    </figure>
    <p>This site is very new and a lot will be added to it. I have been very much inspired by PC partpicker and want to take that format and apply it to custom firearms. I hope all of us (including myself) will be able to enjoy the ease and simplicity that will come from this site when putting together a parts list for our AR-15's.</p>
    <p>Since the site needs to be well established before I can apply for the affiliate links, it will take some time before we have a list builder that will give a compatibility filter and also allow you to search through multiple distributors to get exactly what you need for your build. In the meantime, please use the forums and make an account as this will help expedite the legitimacy of the site for when we apply for affiliate links.</p>
    <p>Stay free.</p>
    <p>Very respectfully,</p>
    <p><em><strong>Michael Karpstein</strong></em>
    <br>Founder</p>
    <!-- <router-link :to="{ name: 'login-register' }" class="btn btn-primary">Register</router-link> -->
    <Email />
</template>

<script>
import Email from '../../components/template/Email.vue';
export default {
    components: { Email },
    created () {
        // console.log(process.env.VUE_APP_API_URL)
        // this.$ga.page(this.$router)
        this.$gtag.pageview(this.$route)
    }
}
</script>
