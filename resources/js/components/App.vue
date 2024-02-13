<template>
    <Menu/>
    <router-view></router-view>
    <Footer/>
</template>

<script>
import Menu from "./partials/Menu.vue";
import Footer from "./partials/Footer.vue";

export default {
    name: "App",
    components: {Footer, Menu},
    setup() {
        return {}
    }
}
</script>
