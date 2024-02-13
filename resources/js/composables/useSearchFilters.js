import {useStore} from "vuex";
import {computed} from "vue";

import {
    REMOVE_SEARCH_FEATURE,
    SET_SEARCH_CITY,
    SET_SEARCH_COUNTRY,
    SET_SEARCH_FEATURE,
    SET_SEARCH_KEYWORD,
    SET_SEARCH_PROPERTY_FINALIZING,
    SET_SEARCH_RANGE,
    SET_SEARCH_RENT_PER,
    SET_SEARCH_STATE,
    SET_SEARCH_STATUS
} from "../store/types";

export const useSearchFilters = () => {
    const store = useStore();

    const country = computed({get: () => store.state.search.search_params.country, set: (value) => {
            store.commit(`search/${SET_SEARCH_COUNTRY}`, value);
            store.commit(`search/${SET_SEARCH_STATE}`, 0);
            store.commit(`search/${SET_SEARCH_CITY}`, 0);
        }
    });

    const state = computed({get: () => store.state.search.search_params.state, set: (value) => {
            store.commit(`search/${SET_SEARCH_STATE}`, value);
            store.commit(`search/${SET_SEARCH_CITY}`, 0);
        }
    });
    const city = computed({get: () => store.state.search.search_params.city, set: (value) => store.commit(`search/${SET_SEARCH_CITY}`, value)});

    const keyword = computed({get: () => store.state.search.search_params.keyword, set: (value) => store.commit(`search/${SET_SEARCH_KEYWORD}`, value)});
    const status = computed({get: () => store.state.search.search_params.status, set: (value) => store.commit(`search/${SET_SEARCH_STATUS}`, value)});
    const rentPer = computed({get: () => store.state.search.search_params.rent_amount_per, set: (value) => store.commit(`search/${SET_SEARCH_RENT_PER}`, value)});
    const propertyFinalizing = computed({get: () => store.state.search.search_params.property_finalizing, set: (value) => store.commit(`search/${SET_SEARCH_PROPERTY_FINALIZING}`, value)});
    const price = computed(() => store.getters["search/range"]('price'));
    const rent = computed(() => store.getters["search/range"]('rent'));
    const beds = computed(() => store.getters["search/range"]('bedrooms'));
    const baths = computed(() => store.getters["search/range"]('bathrooms'));
    const area = computed(() => store.getters["search/range"]('area'));
    const rooms = computed(() => store.getters["search/range"]('rooms'));
    const garages = computed(() => store.getters["search/range"]('garages'));
    const units = computed(() => store.getters["search/range"]('units'));
    const floor_numbers = computed(() => store.getters["search/range"]('floor_number'));
    const year_built = computed(() => store.getters["search/range"]('year_built'));

    const onRangeChange = (field, data) => {
        store.commit(`search/${SET_SEARCH_RANGE}`, {field: field, value: {min: data[0], max: data[1]}});
    }

    const onSelectFeature = val => {
        store.commit(`search/${SET_SEARCH_FEATURE}`, val);
    }

    const onUnselectFeature = val => {
        store.commit(`search/${REMOVE_SEARCH_FEATURE}`, val);
    }

    return {
        country,
        state,
        city,
        keyword,
        status,
        rentPer,
        baths,
        price,
        rent,
        beds,
        area,
        rooms,
        garages,
        units,
        floor_numbers,
        year_built,
        propertyFinalizing,
        onRangeChange,
        onSelectFeature,
        onUnselectFeature
    };
}
