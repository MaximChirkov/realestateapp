<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Your Properties</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="content-area recent-property" style="background-color: #FFF;">
        <div class="container">
            <div class="row">

                <div class="col-md-9 pr-30 padding-top-40 properties-page user-properties">

                    <div class="section">

                        <SortingBar :per_page="params.per_page" :default_sort="params.sorting" :show_layout="false" container_class="pl0 pr-10" sorting_class="pull-left" per_page_class="pull-right"
                                    @onSelectPerPage="handlePerPage" @onSelectSort="handleSorting"
                        />

                    </div>

                    <div class="section" v-if="properties">
                        <div id="list-type" class="proerty-th-list">
                            <div class="col-md-4 p0" v-for="property of properties.data" :key="property.id">
                                <PropertyTemplate :property="property" :show_actions="true" @onPropertyDeleted="onPropertyDeleted" />
                            </div>
                        </div>
                    </div>

                    <div class="section" v-if="properties">
                        <div class="pull-right">
                            <Pagination :item="properties" @onPaginate="paginate" />
                        </div>
                    </div>

                </div>

                <div class="col-md-3 p0 padding-top-40">
                    <div class="blog-asside-right">
                        <div class="panel panel-default sidebar-menu wow fadeInRight animated" >

                        </div>

                        <div class="panel panel-default sidebar-menu wow fadeInRight animated">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useRouter, useRoute} from "vue-router";
import PropertyTemplate from "../../partials/PropertyTemplate.vue";
import Pagination from "../../partials/Pagination.vue";
import SortingBar from "../../partials/SortingBar.vue";
import {useFetchListings} from "../../../composables/useFetchListings.js";

export default {
    name: "MyProperties",
    components: {SortingBar, Pagination, PropertyTemplate},
    setup() {
        const router = useRouter();
        const route = useRoute();

        const {params, loadData, properties} = useFetchListings('/api/user_properties');

        const paginate = page => {
            params.page = page;
            loadData();
            const query = {...route.query, page};
            router.push({path: route.path, query});
        };

        const handleSorting = (sortObj) => {
            const rawObject = {...sortObj};

            params.sorting.sortBy = rawObject.sortBy;
            params.sorting.sortOrder = rawObject.sortOrder;
            params.page = 1;
            loadData();

            const query = {
                ...route.query,
                page: 1,
                sorting_field: rawObject.sortBy,
                sorting_order: rawObject.sortOrder
            };
            router.push({path: route.path, query});
        }

        const handlePerPage = perPage => {
            params.per_page = perPage;
            params.page = 1;
            loadData();
            const query = {...route.query, per_page: params.per_page, page: 1};
            router.push({query});
        }

        const onPropertyDeleted = pid => {
            //properties.value.data = properties.value.data.filter(p => p.id !== parseInt(pid));
            loadData();
        }

        loadData();

        return {
            properties,
            params,
            paginate,
            handlePerPage,
            handleSorting,
            onPropertyDeleted
        }
    }
}
</script>
