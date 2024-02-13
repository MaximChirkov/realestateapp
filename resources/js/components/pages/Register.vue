<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Home New account / Sign in </h1>
                </div>
            </div>
        </div>
    </div>
    <div class="register-area" style="background-color: rgb(249, 249, 249);">
        <div class="container">
            <div class="col-md-6">
                <div class="box-for overflow">
                    <div class="col-md-12 col-xs-12 register-blocks">
                        <h2>New account : </h2>
                        <form action="#" method="post" @submit.prevent="handleRegister">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" name="name" v-model="registerForm.name" />
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" name="email" v-model="registerForm.email" />
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" name="password" v-model="registerForm.password" />
                            </div>
                            <div class="form-group">
                                <label>Confirm Password</label>
                                <input type="password" class="form-control" name="password_confirmation" v-model="registerForm.password_confirmation" />
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-default" :disabled="!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.password_confirmation">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box-for overflow">
                    <div class="col-md-12 col-xs-12 login-blocks">
                        <h2>Login : </h2>
                        <form action="#" method="post" @submit.prevent="handleLogin">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" name="email" v-model="loginForm.email" />
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" name="password" v-model="loginForm.password" />
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-default" :disabled="!loginForm.email || !loginForm.password"> Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useLogin} from "../../composables/useLogin.js";
import {useRegister} from "../../composables/useRegister.js";

export default {
    name: "Register",
    setup() {
        const {loginForm, handleLogin} = useLogin();
        const {registerForm, handleRegister} = useRegister();

        return {
            loginForm,
            registerForm,
            handleLogin,
            handleRegister
        }
    }
}
</script>
