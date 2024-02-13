import {reactive, ref, watch} from "vue";
import {useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";

export const useSubmitPropertyForm = (isEdit = false) => {
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();

    const form = reactive({
        title: '',
        description: '',
        status: 'Sale',
        price: '',
        rent_amount_per: '',
        area: '',
        country: 0,
        state: 0,
        city: 0,
        bedrooms: 0,
        bathrooms: 0,
        rooms: 0,
        garages: 0,
        units: 0,
        floor_number: 0,
        year_built: 0,
        property_finalizing: '',
        phone: '',
        youtube_video: '',
        features: [],
        pictures: [],
        accept_terms: (!!window.localStorage.getItem("terms_accepted"))
    });

    const pictureFiles = ref([]);

    const validationErrors = ref([]);

    const handleSelectMainPicture = e => {
        form.pictures = [...form.pictures, e.target.files[0]];
    }

    const handleSelectOtherPictures = e => {
        form.pictures = [...form.pictures, ...e.target.files];
    }

    const handleOnSelectFeature = val => {
        form.features = form.features.find(v => v === parseInt(val)) !== undefined ? form.features : [...form.features, parseInt(val)];
    }

    const handleOnDeselectFeature = val => {
        form.features = form.features.filter(v => v !== parseInt(val));
    }

    const handleAcceptTerms = val => {
        form.accept_terms = true;
    }

    const handleRefuseTerms = val => {
        form.accept_terms = false;
    }

    const handleSubmit = () => {
        const { formData, headers } = getPayload();

        window.localStorage.setItem("terms_accepted", 1);

        window.axios.post(`/api/property${isEdit ? '/' + route.params.id : ''}`, formData, { headers }).then(response => {
            handleResponse(response);
        }).catch(error => {
            handleResponse(error.response);
        });
    };

    const getPayload = () => {
        const formData = new FormData();

        for(let field in form) {
            if(field === 'features' || field === 'pictures') {
                form[field].forEach(key => {
                    formData.append(`${field}[]`, key);
                });
            } else {
                formData.append(field, form[field]);
            }
        }

        if(isEdit) {
            formData.append("_method", "PUT");
        }

        const headers = { 'Content-Type': 'multipart/form-data' };

        return {formData, headers};
    }

    const handleResponse = response => {
        validationErrors.value = [];

        if(response.data.status) {
            toast.success(response.data.message);
            router.push("/user/my-properties");
            return;
        }

        if(response.data.errors) {
            for(let field in response.data.errors) {
                validationErrors.value = [...validationErrors.value, response.data.errors[field][0]];
            }
        }
    }

    return {
        form,
        handleSelectMainPicture,
        handleSelectOtherPictures,
        handleOnSelectFeature,
        handleOnDeselectFeature,
        handleAcceptTerms,
        handleRefuseTerms,
        handleSubmit,
        validationErrors,
        pictureFiles
    }
};
