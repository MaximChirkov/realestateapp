import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

import {getSearchParamsFromStore} from "../api/helpers";
import {SET_LAYOUT, SET_PAGINATE_PARAMS, SET_SORTING_PARAMS} from "../store/types";


export const useSubmitSearch = () => {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const submitSearch = () => {
        store.dispatch('search/resetPaginateSortParams');

        const params = doSearch();

        updateUrlQueryParams(params, true);
    }

    const doSearch = () => {
        const params = getSearchParamsFromStore({...store.state.search});

        store.dispatch('search/search', params);

        return params;
    }

    const handleLayout = layout => {
        store.commit(`search/${SET_LAYOUT}`, layout);

        let query = Object.assign({}, route.query);
        query = {...query, layout};
        router.replace({query});
    }

    const handlePerPage = perPage => {
        store.commit(`search/${SET_PAGINATE_PARAMS}`, {page: 1, per_page: perPage});

        const params = doSearch();

        updateUrlQueryParams(params);
    }

    const handleSorting = sortObj => {
        store.commit(`search/${SET_SORTING_PARAMS}`, {...sortObj});
        store.commit(`search/${SET_PAGINATE_PARAMS}`, {page: 1, per_page: store.state.search.paginate_params.per_page});

        const params = doSearch();

        updateUrlQueryParams(params);
    }

    const handlePaginate = page => {
        store.commit(`search/${SET_PAGINATE_PARAMS}`, {page, per_page: store.state.search.paginate_params.per_page});

        const params = doSearch();

        updateUrlQueryParams(params);
    }

    const updateUrlQueryParams = (params, reset = false) => {
        let query = Object.assign({}, route.query);

        if(reset) {
            if(Object.entries(params).length) {
                query = {...params};
                router.replace({query});
            } else {
                router.replace({});
            }

            return;
        }

        if(Object.entries(params).length) {
            query = {...query, ...params};
            router.replace({query});
        } else {
            router.replace({});
        }
    }

    const properties = computed(() => store.state.search.properties);
    const loading = computed(() => store.state.search.loading);
    const sortingParams = computed(() => store.state.search.sorting_params);
    const paginateParams = computed(() => store.state.search.paginate_params);
    const defaultLayout = computed(() => store.state.search.defaultLayout);


    return {
        submitSearch,
        properties,
        loading,
        sortingParams,
        paginateParams,
        defaultLayout,
        handleLayout,
        handlePerPage,
        handleSorting,
        handlePaginate,
        doSearch
    }
}
