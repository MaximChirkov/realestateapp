<template>
    <div class="slider-area">
        <div class="slider">
            <div id="bg-slider" class="owl-carousel owl-theme">

                <div class="item"><img src="/public/template/assets/img/slide1/slider-image-1.jpg?fcff47&fcff47" alt="Mirror Edge"></div>
                <div class="item"><img src="/public/template/assets/img/slide1/slider-image-2.jpg?fcff47&fcff47" alt="The Last of us"></div>
                <div class="item"><img src="/public/template/assets/img/slide1/slider-image-4.jpg?fcff47&fcff47" alt="GTA V"></div>

            </div>
        </div>
        <div class="container slider-content">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                    <h2>property Searching Just Got So Easy</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi deserunt deleniti, ullam commodi sit ipsam laboriosam velit adipisci quibusdam aliquam teneturo!</p>
                    <div class="search-form wow pulse" data-wow-delay="0.8s">

                        <form action="#" class=" form-inline" @submit.prevent="redirectToSearchPage">

                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Key word"  v-model="searchForm.keyword" />
                            </div>
                            <div class="form-group">
                                <select id="basic" class="selectpicker show-tick form-control" v-model="searchForm.status">
                                    <option value=""> -Status- </option>
                                    <option value="Rent">Rent</option>
                                    <option value="Sale">Sale</option>

                                </select>
                            </div>

                            <button class="btn search-btn" type="submit"><i class="fa fa-search"></i></button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- property area -->
    <div class="content-area recent-property" style="padding-bottom: 60px; background-color: rgb(252, 252, 252);">
        <div class="container">
            <div class="row">
                <div class="col-md-12  padding-top-40 properties-page">
                    <div class="col-md-12 ">

                        <SortingBar :per_page="params.per_page" :default_sort="params.sorting" :default_layout="defaultLayout" :show_layout="true" container_class="col-xs-10 pl0" sorting_class="pull-left" per_page_class="pull-right"
                                    @onSelectPerPage="handlePerPage" @onSelectSort="handleSorting" @onSelectLayout="handleLayout"
                        />

                    </div>

                    <div class="col-md-12 " v-if="properties">
                        <div id="list-type" :class="defaultLayout === 'list' ? 'proerty-th-list':'proerty-th'">

                            <div class="col-sm-6 col-md-3 p0" v-for="property of properties" :key="property.id">
                                <PropertyTemplate :property="property" :show_actions="false" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useFetchListings} from "../../composables/useFetchListings";
import SortingBar from "../partials/SortingBar.vue";
import PropertyTemplate from "../partials/PropertyTemplate.vue";
import {useRouter} from "vue-router";

export default {
    name: "Home",
    components: {PropertyTemplate, SortingBar},
    setup() {
        const router = useRouter();

        const {params, loadData, properties} = useFetchListings('/api/latest_properties');

        const defaultLayout = ref('list');

        const searchForm = reactive({keyword: "", status: ""});

        const handleSorting = (sortObj) => {
            const rawObject = {...sortObj};

            params.sorting.sortBy = rawObject.sortBy;
            params.sorting.sortOrder = rawObject.sortOrder;
            params.page = 1;
            loadData();
        }

        const handlePerPage = perPage => {
            params.per_page = perPage;
            params.page = 1;
            loadData();
        }

        const handleLayout = layoutType => {
            defaultLayout.value = layoutType;
        }

        const redirectToSearchPage = function () {
            if (!searchForm.keyword && !searchForm.status) {
                router.push({path: '/properties'});

                return false;
            }

            const query = {};
            if (searchForm.keyword) {
                query.keyword = searchForm.keyword;
            }

            if (searchForm.status) {
                query.status = searchForm.status;
            }
            router.push({path: '/properties', query});
        }

        loadData();

        return {
            properties,
            params,
            defaultLayout,
            handlePerPage,
            handleSorting,
            handleLayout,
            redirectToSearchPage,
            searchForm
        }
    },
    mounted() {
        $(document).ready(function () {
            $("#bg-slider").owlCarousel({
                navigation: false, // Show next and prev buttons
                slideSpeed: 100,
                autoPlay: 5000,
                paginationSpeed: 100,
                singleItem: true,
                mouseDrag: false,
                transitionStyle: "fade"
            });
        });
    }
}
</script>
<style scoped>
.page-subheader h4 {
    background-color: #FDC600;
    display: inline-block;
    padding: 5px 10px;
    color: #fff;
    font-weight: bold;
    font-size: 21px;
}
</style>
