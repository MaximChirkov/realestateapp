<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Search Properties</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="properties-area recent-property" style="background-color: #FFF;">
        <div class="container">
            <div class="row">

                <SearchSidebar />

                <div class="col-md-9  pr0 padding-top-40 properties-page">
                    <div class="col-md-12 clear">

                        <SortingBar :per_page="paginateParams.per_page" :default_sort="sortingParams" :default_layout="defaultLayout" :show_layout="true"
                                    container_class="col-xs-10 pl0" @onSelectPerPage="handlePerPage" @onSelectSort="handleSorting" @onSelectLayout="handleLayout"
                        />

                    </div>

                    <div class="col-md-12 clear">
                        <div class="fa-3x" v-if="loading">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                        <div id="list-type" v-if="!loading && properties && properties.data && properties.data.length > 0" :class="defaultLayout === 'list' ? 'proerty-th-list':'proerty-th'">

                            <div class="col-sm-6 col-md-4 p0" v-for="property of properties.data" :key="property.id">
                                <PropertyTemplate :property="property" :show_actions="false" />
                            </div>

                        </div>

                        <div v-else class="proerty-th">
                            <p class="text-center" style="margin-top: 10px">No properties match your search</p>
                        </div>
                    </div>

                    <div class="col-md-12" v-if="!loading && properties && properties.data && properties.data.length > 0">
                        <div class="pull-right">
                            <Pagination :item="properties" @onPaginate="handlePaginate" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useSubmitSearch} from "../../composables/useSubmitSearch";

import SearchSidebar from "../partials/SearchSidebar.vue";
import PropertyTemplate from "../partials/PropertyTemplate.vue";
import SortingBar from "../partials/SortingBar.vue";
import Pagination from "../partials/Pagination.vue";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
    name: "Properties",
    components: {Pagination, SortingBar, PropertyTemplate, SearchSidebar},
    setup() {
        const route = useRoute();
        const store = useStore();

        const {
            properties, loading, sortingParams, paginateParams, defaultLayout,
            handleLayout, handlePerPage, handleSorting, handlePaginate, doSearch
        } = useSubmitSearch();

        store.dispatch('search/setSearchDefaults');

        if (Object.keys(route.query).length > 0) {
            store.dispatch('search/bulkStoreUpdate', {...route.query});
        }

        onMounted(() => {
            doSearch();
        });

        return {
            properties,
            loading,
            sortingParams,
            paginateParams,
            defaultLayout,
            handleLayout,
            handlePerPage,
            handleSorting,
            handlePaginate
        }
    }
}
</script>
