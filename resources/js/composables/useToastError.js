import {useToast} from "vue-toastification";

export const useToastError = () => {
    const toast = useToast();

    const displayErrors = (response) => {
        if(response.data.message) {
            toast.error(response.data.message);
        }
        if(response.data.errors) {
            let errorArr = [];
            for(let field in response.data.errors) {
                errorArr.push(response.data.errors[field][0]);
            }
            toast.error(errorArr.join("\n"));
        }
    }

    return {
        toast,
        displayErrors
    }
}
