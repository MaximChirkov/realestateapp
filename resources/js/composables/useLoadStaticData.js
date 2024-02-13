import {onMounted, ref} from "vue";
import {propertyFinalizingList, propertyTypes, rentAmountPerList} from "../api/static_data";

export const useLoadStaticData = ({selectedCountryId = 0, selectedStateId = 0, selectedCityId = 0} = {}) => {

    const allAreas = ref([]);
    const countries = ref([]);
    const states = ref([]);
    const cities = ref([]);
    const selectedCountry = ref(selectedCountryId ? selectedCountryId : null);
    const selectedState = ref(selectedStateId ? selectedStateId : null);
    const selectedCity = ref(selectedCityId ? selectedCityId : null);

    const features = ref([]);

    const loadStaticData = (callback = null) => {
        window.axios.get("/api/static_data").then(res => {
            allAreas.value = res.data.areas;
            countries.value = res.data.areas;
            console.log(res.data);
            features.value = res.data.features;

            // store in locale storage
            window.localStorage.setItem("static_data", JSON.stringify({areas: allAreas.value, features: features.value}));

            if(callback) {
                callback(allAreas, countries, features);
            }
        });
    }

    const loadStates = (country) => {
        states.value = [];
        cities.value = [];

        const area = allAreas.value.find(a => a.id === parseInt(country));

        if(area) {
            states.value = area.states;
        }
    }

    const loadCities = (state, country) => {
        cities.value = [];

        const area = allAreas.value.find(a => a.id === country);
        if(area && area.states.length > 0) {
            const targetState = area.states.find(s => s.id === parseInt(state));
            if(targetState && targetState.cities) {
                cities.value = targetState.cities;
            }
        }
    }

    const handleSelectCountry = val => {
        selectedCountry.value = val;

        loadStates(selectedCountry.value);
    }

    const handleSelectState = val => {
        selectedState.value = val;

        loadCities(selectedState.value, selectedCountry.value);
    }

    const handleSelectCity = val => {
        selectedCity.value = val;
    }

    const getYears = function () {
        const currentYear = new Date().getFullYear();
        const years = [currentYear];
        for(let i=1; i < 20; i++) {
            years.unshift(currentYear - i);
        }

        return years;
    };

    onMounted(() => {
        loadStaticData(() => {
            if (selectedCountry.value) {
                loadStates(selectedCountry.value);

                if (selectedState.value) {
                    loadCities(selectedState.value, selectedCountry.value);
                }
            }
        });
    });

    return {
        propertyFinalizingList,
        rentAmountPerList,
        propertyTypes,
        features,
        countries,
        states,
        cities,
        handleSelectCountry,
        handleSelectState,
        handleSelectCity,
        selectedCountry,
        selectedState,
        selectedCity,
        getYears,
        loadStates,
        loadCities
    }
}
