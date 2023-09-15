<template>
    <footer>
        <div class="footer-icon">
            <img src="../../assets/images/Gunkustom-Icon-Logo-White.png" alt=""/>
        </div>
        <div class="social-icons">
            <p>Get connetcted</p>
            <a 
                href="https://www.instagram.com/gunkustom/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram">
                    <img src="../../assets/images/square-instagram.png" alt="square instagram logo"/>
            </a>
            <a 
                href="https://www.instagram.com/gunkustom/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Twitter">
                    <img src="../../assets/images/square-twitter.png" alt="square twitter logo"/>
            </a>
            <a 
                href="https://www.facebook.com/gunkustom" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Facebook">
                    <img src="../../assets/images/square-facebook.png" alt="square facebook logo"/>
            </a>
            <a 
                href="https://www.linkedin.com/company/gunkustom/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on LinkedIn">
                    <img src="../../assets/images/linkedin.png" alt="square linkedIn logo"/>
            </a>
        </div>
    </footer>
</template>

<style scoped lang="scss">
    @import '../../assets/css/_global.scss';

    footer {
        background-color: $army-green;
        height: 150px;
        margin-top: $space-90;
        display: flex;
        justify-content: space-around;
    }

    .footer-icon {
        width: 50%;
    }

    .social-icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 300px;
        flex-wrap: wrap;

        a {
            height: 50px;
        }

        p {
            width: 100%;
            color: $brand-white;
            margin-bottom: -10%;
        }
    }
</style>
