import {reactive} from "vue";
import {useToastError} from "./useToastError.js";

export const useRegister = () => {
    const {displayErrors, toast} = useToastError();

    const registerForm = reactive({email: "", name: "", password: "", password_confirmation: ""});

    const handleRegister = () => {
        window.axios.post("/api/register", registerForm).then(registerResponse => {
            toast.success("Registered successfully! Now you can sign in");
            resetRegisterForm();
        }).catch(error => {
            displayErrors(error.response);
        });
    }

    const resetRegisterForm = () => {
        registerForm.name = "";
        registerForm.email = "";
        registerForm.password = "";
        registerForm.password_confirmation = "";
    }

    return {
        registerForm,
        handleRegister
    }
}
