<template>
    <nav class="navbar navbar-default ">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/" class="navbar-brand"><img src='/public/template/assets/img/logo.png' alt=""></router-link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse yamm" id="navigation">
                <ul class="nav navbar-nav navbar-right">
                    <li><button class="navbar-btn nav-button wow bounceInRight login" @click="$router.push('/register')" data-wow-delay="0.4s" v-if="!$store.state.auth.signedIn">Login</button></li>

                    <li class="dropdown" v-if="$store.state.auth.signedIn" data-wow-delay="0.4s">
                        <a href="#" class="dropdown-toggle navbar-btn" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hi {{$store.state.auth.user.name}} <span class="caret"></span></a>
                        <ul class="dropdown-menu" style="right: auto !important;">
                            <li><router-link to="/user/edit-profile">Edit Profile</router-link></li>
                            <li><router-link to="/user/my-properties">My Properties</router-link></li>
                            <li><router-link to="/user/fav">Favorites</router-link></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#" @click="handleLogout()">Logout</a></li>
                        </ul>
                    </li>

                    <li><button class="navbar-btn nav-button wow fadeInRight" @click="$router.push('/submit-property')" data-wow-delay="0.5s">Submit</button></li>
                </ul>

                <ul class="main-nav nav navbar-nav navbar-right">
                    <li class="ymm-sw " data-wow-delay="0.1s">
                        <router-link to="/">Home</router-link>
                    </li>

                    <li class="wow fadeInDown" data-wow-delay="0.1s">
                        <router-link to="/properties">Properties</router-link>
                    </li>

                    <li class="wow fadeInDown" data-wow-delay="0.4s">
                        <router-link to="/contact">Contact</router-link>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
import {useLogin} from "../../composables/useLogin.js";

export default {
    name: "Menu",
    setup() {
        const {handleLogout} = useLogin();
        return {
            handleLogout
        }
    }
}
</script>
