import {
    SET_SEARCH_CITY,
    SET_SEARCH_COUNTRY,
    SET_SEARCH_KEYWORD,
    SET_SEARCH_FEATURE,
    SET_SEARCH_PROPERTY_FINALIZING,
    SET_SEARCH_RANGE,
    SET_SEARCH_RENT_PER,
    SET_SEARCH_STATE,
    SET_SEARCH_STATUS,
    REMOVE_SEARCH_FEATURE,
    SET_SEARCH_FEATURES,
    SET_SEARCH_PROPERTIES,
    SET_LOADING,
    SET_SORTING_PARAMS,
    SET_PAGINATE_PARAMS,
    SET_LAYOUT
} from "./types";

export default {
    namespaced: true,
    state: () => ({
        search_params: {
            keyword: "",
            country: "",
            state: "",
            city: "",
            status: "",
            rent_amount_per: "",
            range_fields: {
                price: {min: 0, max: 0},
                rent: {min: 0, max: 0},
                bathrooms: {min: 0, max: 0},
                bedrooms: {min: 0, max: 0},
                area: {min: 0, max: 0},
                rooms: {min: 0, max: 0},
                garages: {min: 0, max: 0},
                units: {min: 0, max: 0},
                floor_number: {min: 0, max: 0},
                year_built: {min: 0, max: 0}
            },
            property_finalizing: "",
            features: []
        },
        sorting_params: {
            sortBy: 'updated_at',
            sortOrder: 'DESC'
        },
        paginate_params: {
            page: 1,
            per_page: 30
        },
        defaultLayout: 'grid',
        properties: null,
        loading: true
    }),
    mutations: {
        [SET_SEARCH_KEYWORD](state, data) {
            state.search_params.keyword = data;
        },
        [SET_SEARCH_COUNTRY](state, data) {
            state.search_params.country = data;
        },
        [SET_SEARCH_STATE](state, data) {
            state.search_params.state = data;
        },
        [SET_SEARCH_CITY](state, data) {
            state.search_params.city = data;
        },
        [SET_SEARCH_STATUS](state, data) {
            state.search_params.status = data;
        },
        [SET_SEARCH_RENT_PER](state, data) {
            state.search_params.rent_amount_per = data;
        },
        [SET_SEARCH_PROPERTY_FINALIZING](state, data) {
            state.search_params.property_finalizing = data;
        },
        [SET_SEARCH_RANGE](state, data) {
            state.search_params.range_fields[data.field] = data.value;
        },
        [SET_SEARCH_FEATURES](state, data) {
            state.search_params.features = data;
        },
        [SET_SEARCH_FEATURE](state, data) {
            if(state.search_params.features.find(i => i === parseInt(data)) === undefined) {
                state.search_params.features = [...state.search_params.features, parseInt(data)];
            }
        },
        [REMOVE_SEARCH_FEATURE](state, data) {
            if(state.search_params.features.find(i => i === parseInt(data)) !== undefined) {
                state.search_params.features = state.search_params.features.filter(i => i !== parseInt(data));
            }
        },
        [SET_SEARCH_PROPERTIES](state, data) {
            state.properties = data;
        },
        [SET_LOADING](state, data) {
            state.loading = data;
        },
        [SET_SORTING_PARAMS](state, data) {
            state.sorting_params = data;
        },
        [SET_PAGINATE_PARAMS](state, data) {
            state.paginate_params = data;
        },
        [SET_LAYOUT](state, data) {
            state.defaultLayout = data;
        }
    },
    getters: {
        range(state) {
            return (field) => {
                return [{...state.search_params.range_fields[field]}.min, {...state.search_params.range_fields[field]}.max];
            }
        }
    },
    actions: {
        async search({commit}, params) {
            commit(SET_LOADING, true);
            // call the search api
            const response = await window.axios.get('/api/search', {params});
            commit(SET_LOADING, false);
            if(response.status === 200) {
                commit(SET_SEARCH_PROPERTIES, response.data.properties);
            }
        },
        bulkStoreUpdate({commit, state}, queryParams) {
            if(queryParams['keyword']) {
                commit(SET_SEARCH_KEYWORD, queryParams['keyword']);
            }
            if(queryParams['country']) {
                commit(SET_SEARCH_COUNTRY, parseInt(queryParams['country']));
            }
            if(queryParams['state']) {
                commit(SET_SEARCH_STATE, parseInt(queryParams['state']));
            }
            if(queryParams['city']) {
                commit(SET_SEARCH_CITY, parseInt(queryParams['city']));
            }
            if(queryParams['status']) {
                commit(SET_SEARCH_STATUS, queryParams['status']);
            }
            if(queryParams['rent_amount_per']) {
                commit(SET_SEARCH_RENT_PER, parseInt(queryParams['rent_amount_per']));
            }
            if(queryParams['property_finalizing']) {
                commit(SET_SEARCH_PROPERTY_FINALIZING, queryParams['property_finalizing']);
            }
            if(queryParams['features']) {
                commit(SET_SEARCH_FEATURES, queryParams['features'].split(",").map(v => parseInt(v)));
            }
            const rangeFields = ["price", "rent", "bathrooms", "bedrooms", "area", "rooms", "garages", "units", "floor_number", "year_built"];
            rangeFields.map(field => {
                if(queryParams[field]) {
                    const rangeVal = queryParams[field].split(",");
                    if(rangeVal[0] || rangeVal[1]) {
                        commit(SET_SEARCH_RANGE, {field, value: {min: parseInt(rangeVal[0]), max: parseInt(rangeVal[1])}});
                    }
                }
            });
            if(queryParams['layout']) {
                commit(SET_LAYOUT, queryParams['layout']);
            }
            if(queryParams['page'] || queryParams['per_page']) {
                commit(SET_PAGINATE_PARAMS, {page: queryParams['page'] ? queryParams['page'] : state.paginate_params.page,
                    per_page: queryParams['per_page'] ? queryParams['per_page'] : state.paginate_params.per_page });
            }
            if(queryParams['sorting_field'] && queryParams['sorting_order']) {
                commit(SET_SORTING_PARAMS, {sortBy: queryParams['sorting_field'], sortOrder: queryParams['sorting_order']});
            }
        },
        resetPaginateSortParams({commit}) {
            commit(SET_PAGINATE_PARAMS, {page: 1, per_page: 30});
            commit(SET_SORTING_PARAMS, {sortBy: 'updated_at', sortOrder: 'DESC'});
        },
        setSearchDefaults({commit, dispatch}) {
            dispatch('resetPaginateSortParams');
            commit(SET_SEARCH_KEYWORD, "");
            commit(SET_SEARCH_COUNTRY, "");
            commit(SET_SEARCH_STATE, "");
            commit(SET_SEARCH_CITY, "");
            commit(SET_SEARCH_STATUS, "");
            commit(SET_SEARCH_RENT_PER, "");
            commit(SET_SEARCH_PROPERTY_FINALIZING, "");
            commit(SET_SEARCH_FEATURES, []);
            const rangeFields = ["price", "rent", "bathrooms", "bedrooms", "area", "rooms", "garages", "units", "floor_number", "year_built"];
            rangeFields.map(field => {
                commit(SET_SEARCH_RANGE, {field, value: {min: 0, max: 0}});
            });
        }
    }
}
