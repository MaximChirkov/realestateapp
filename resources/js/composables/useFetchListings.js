import {reactive, ref} from "vue";
import {useRoute} from "vue-router";

export const useFetchListings = (endpoint) => {
    const route = useRoute();

    const properties = ref(null);

    const params = reactive({sorting: {sortBy: 'updated_at', sortOrder: 'DESC'}, page: 1, per_page: 6});

    if(route.query.sorting_field) {
        params.sorting.sortBy = route.query.sorting_field;
    }
    if(route.query.sorting_order) {
        params.sorting.sortOrder = route.query.sorting_order;
    }
    if(route.query.page) {
        params.page = route.query.page;
    }
    if(route.query.per_page) {
        params.per_page = route.query.per_page;
    }

    const loadData = () => {
        window.axios.get( `${endpoint}?${getParamStr()}`).then(response => {
            properties.value = response.data.properties;
        });
    }

    const getParamStr = () => {
        let paramArr = [];

        for(let p in params) {
            if(p === 'sorting') {
                paramArr.push(`sorting_field=${params[p].sortBy}`);
                paramArr.push(`sorting_order=${params[p].sortOrder}`);
            } else {
                paramArr.push(`${p}=${params[p]}`);
            }
        }

        return paramArr.join("&");
    }

    return {
        loadData,
        properties,
        params,
        getParamStr
    }
}
