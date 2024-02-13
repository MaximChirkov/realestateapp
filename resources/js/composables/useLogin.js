import {reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useToastError} from "./useToastError.js";

export const useLogin = () => {
    const store = useStore();
    const router = useRouter();
    const {displayErrors, toast} = useToastError();

    const loginForm = reactive({email: "", password: ""});

    const handleLogin = () => {
        window.axios.get(window.sanctumEndpoint).then(response => {
            window.axios.post("/api/login", loginForm).then(loginResponse => {
                toast.success("Signed in successfully!");
                store.dispatch("auth/login", {signedIn: true, user: loginResponse.data.user});
                router.push("/");
                resetLoginForm();
            }).catch(error => {
                displayErrors(error.response);
            });
        });
    }

    const handleLogout = () => {
        window.axios.get(window.sanctumEndpoint).then(response => {
            window.axios.post("/api/logout").then(logoutResponse => {
                console.log(logoutResponse);
                store.dispatch("auth/logout");
                router.push("/");
            });
        });
    }

    const resetLoginForm = () => {
        loginForm.email = "";
        loginForm.password = "";
    }

    return {
        loginForm,
        handleLogin,
        handleLogout
    }
}
