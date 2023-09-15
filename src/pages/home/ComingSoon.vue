<template>
    <header>
        <img alt="Gunkustom's logo" class="logo" src="../../assets/images/Gunkustom-Logo-White.png"/>
    </header>
    <section class="marquee" aria-describedby="Background image of an AR, with labels pointing to stock, scope and other parts">
        <div class="overlay">
            <h1>Launching Soon</h1>
            <span>Dream it. Build it. Order it.</span>
        </div>

    <div class="pointers" aria-hidden="true"></div> 
    </section>
    <main>
        <div class="intro-text">
            <div class="subheading">Say hello to the future of gun <em>kustomization</em>.</div>
            <p>Bring your dream rifle to life with Gunkustom’s all-in-one platform. Customize and save your build at your own pace or use our modular templates for the option that best suits you. Gunkustom integrates with the industry’s leading gun part manufacturers to give you real-time inventory information at the best prices. Click to order so you can spend less time searching, and more time shooting. Stay free.</p>
        </div>
        <Email />
    </main>
    <AltFooter />
</template>

<script>
    import Email from '../../components/template/Email.vue';
    import AltFooter from '../../components/template/AltFooter.vue';
    export default {
        components: { 
            Email,
        AltFooter },
        created () {
            // console.log(process.env.VUE_APP_API_URL)
            // this.$ga.page(this.$router)
            this.$gtag.pageview(this.$route)
        }
    }
</script>

<style scoped lang="scss">
    @import '/src/assets/css/_global.scss';

    .subheading {
        font-size: $sub-heading-size;
        font-family: $font-stack-bold;
        font-weight: 700;
    }

    em {
        color: $primary-orange;
        font-style: normal;
    }
    
    .overlay {
        color: #fff;
        z-index: 1;

        h1 {
            font-size: $marquee-size;
            margin-bottom: $space-8;
        }

        > span {
            font-size: $sub-heading-size;
            text-align: center;
            font-family: $font-stack-bold;
            display: block;
        }
    }
    @media screen and (max-width: 768px) {
       .overlay h1 {
            font-size: 3rem;
        }
    }

    @media screen and (max-width: 380px) {
        .overlay h1 {
            font-size: 2.5rem;
        }
    }

    header {
        background-color: #000;
        height: 125px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .pointers {
        background-image: url('../../assets/images/marquee-pointer.png') ;
        background-repeat: no-repeat;
        height: 450px;
        position: absolute;
        left: 10%;
        right: 0;
        top: 6%;
        background-size: contain;
    }
   
    .marquee {
        background-image: 
            linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 95%),            
            linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 55%),
            url('../../assets/images/marquee-background.png');  
          
        height: 500px;
        background-size: contain, contain, cover;
        background-repeat: no-repeat, no-repeat, no-repeat;
        display: flex;
        justify-content: center;
        position: relative;
    }

    @media screen and (max-width: 1280px) {
        .marquee {
            height: 450px;
        }
    }

    @media screen and (max-width: 1000px) {
        .marquee {
            height: 350px;
            background-position: center, center, center;
        }

        .pointers {
            left: 5%;
            height: 330px;
        }
    }
    
    main {

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
       
        margin-top: $space-90;

        > div {
            width: 40%;
        }
    }


    @media screen and (max-width: 800px) {
        main {
            flex-direction: column;
            flex-wrap: wrap;
            align-content: center;

            > div {
                width: 80%;

            }
            
        }

    }

    @media screen and (max-width: 600px) {
        .pointers {
            display: none;
        }
    }
</style>