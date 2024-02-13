<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">My Favorites</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="content-area recent-property" style="background-color: #FFF;">
        <div class="container">
            <div class="row">

                <div class="col-md-9 pr-30 padding-top-40 properties-page user-properties">

                    <div class="section" v-if="favoriteProperties.length > 0">
                        <div id="list-type" class="proerty-th-list">
                            <div class="col-md-4 p0" v-for="property of favoriteProperties" :key="property.id">
                                <PropertyTemplate :property="property" :show_actions="true" :show_fav_icon="true" @onRemoveFromFavorite="onRemoveFromFavorite" />
                            </div>
                        </div>
                    </div>

                    <div class="section" v-else>
                        <p class="text-center">No properties in favorite! <router-link to="/properties">Search properties</router-link></p>
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
import {ref} from "vue";
import {useFavorites} from "../../../composables/useFavorites";
import PropertyTemplate from "../../partials/PropertyTemplate.vue";

export default {
    name: "Favorites",
    components: {PropertyTemplate},
    setup() {
        const {getFavoritesFromStorage, searchFavorites} = useFavorites();

        const favoriteProperties = ref([]);

        if(getFavoritesFromStorage().length === 0) {
            favoriteProperties.value = [];
        } else {
            searchFavorites(properties => {
                favoriteProperties.value = properties;
            });
        }

        function onRemoveFromFavorite(pid) {
            favoriteProperties.value = favoriteProperties.value.filter(property => property.id !== parseInt(pid));
        }

        return {
            favoriteProperties,
            onRemoveFromFavorite
        }
    }
}
</script>
