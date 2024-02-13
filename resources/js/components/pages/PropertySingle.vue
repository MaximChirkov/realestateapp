<template>
    <div class="fa-3x" v-if="loading">
        <i class="fa fa-spinner fa-spin"></i>
    </div>
    <div v-if="propertyDetails">
        <div class="page-head">
            <div class="container">
                <div class="row">
                    <div class="page-head-content">
                        <h1 class="page-title">{{propertyDetails.title}} </h1>
                    </div>
                </div>
            </div>
        </div>
        <!-- End page header -->

        <!-- property area -->
        <div class="content-area single-property" style="background-color: #FCFCFC;">&nbsp;
            <div class="container">

                <div class="clearfix padding-top-40" >

                    <div class="col-md-8 single-property-content prp-style-1 ">
                        <div class="row">
                            <div class="light-slide-item">
                                <div class="clearfix">
                                    <div class="favorite-and-print">
                                        <a class="add-to-fav" href="#" v-if="!propertyDetails.isFav" @click.prevent="addToFavorites(propertyDetails.id); propertyDetails.isFav=true;" title="add to favorites">
                                            <i class="fa fa-star-o"></i>
                                        </a>
                                        <a class="add-to-fav fav-selected" href="#" v-else @click.prevent="removeFromFavorites(propertyDetails.id); propertyDetails.isFav=false;" title="remove from favorites">
                                            <i class="fa fa-star"></i>
                                        </a>
                                        <a class="printer-icon " href="javascript:window.print()">
                                            <i class="fa fa-print"></i>
                                        </a>
                                    </div>

                                    <ul id="image-gallery" class="gallery list-unstyled cS-hidden">

                                        <li v-for="picture in propertyDetails.pictures" :key="picture.id" :data-thumb="picture.image_url">
                                            <img :src="picture.image_url" :alt="propertyDetails.title" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="single-property-wrapper">
                            <div class="single-property-header">
                                <h1 class="property-title pull-left">{{propertyDetails.title}} in {{propertyDetails.country.name}}</h1>
                                <span class="property-price pull-right">{{getFormattedPrice(propertyDetails)}}</span>
                            </div>

                            <div class="property-meta entry-meta clearfix ">

                                <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-tag">
                                        <img :src="`/public/template/assets/img/icon/${propertyDetails.status === 'sale'?'sale-orange.png':'rent-orange.png'}`">
                                    </span>
                                    <span class="property-info-entry">
                                        <span class="property-info-label">Status</span>
                                        <span class="property-info-value">For {{propertyDetails.status}}</span>
                                    </span>
                                </div>

                                <div class="col-xs-6 col-sm-3 col-md-3 p-b-15" v-if="propertyDetails.area">
                                    <span class="property-info icon-area">
                                        <img src="/public/template/assets/img/icon/room-orange.png">
                                    </span>
                                    <span class="property-info-entry">
                                        <span class="property-info-label">Area</span>
                                        <span class="property-info-value">{{propertyDetails.area}} <b class="property-info-unit">Sq Ft</b></span>
                                    </span>
                                </div>

                                <div class="col-xs-6 col-sm-3 col-md-3 p-b-15" v-if="propertyDetails.bedrooms">
                                    <span class="property-info-icon icon-bed">
                                        <img src="/public/template/assets/img/icon/bed-orange.png">
                                    </span>
                                    <span class="property-info-entry">
                                        <span class="property-info-label">Bedrooms</span>
                                        <span class="property-info-value">{{propertyDetails.bedrooms}}</span>
                                    </span>
                                </div>

                                <div class="col-xs-6 col-sm-3 col-md-3 p-b-15" v-if="propertyDetails.bathrooms">
                                    <span class="property-info-icon icon-garage">
                                        <img src="/public/template/assets/img/icon/shawer-orange.png">
                                    </span>
                                    <span class="property-info-entry">
                                        <span class="property-info-label">Bathrooms</span>
                                        <span class="property-info-value">{{propertyDetails.bathrooms}}</span>
                                    </span>
                                </div>

                                <div class="col-xs-6 col-sm-3 col-md-3 p-b-15" v-if="propertyDetails.rooms">
                                    <span class="property-info-icon icon-garage">
                                        <img src="/public/template/assets/img/icon/room-orange.png">
                                    </span>
                                    <span class="property-info-entry">
                                        <span class="property-info-label">Other rooms</span>
                                        <span class="property-info-value">{{propertyDetails.rooms}}</span>
                                    </span>
                                </div>

                                <div class="col-xs-6 col-sm-3 col-md-3 p-b-15" v-if="propertyDetails.garages">
                                    <span class="property-info-icon icon-bed">
                                        <img src="/public/template/assets/img/icon/cars-orange.png">
                                    </span>
                                    <span class="property-info-entry">
                                        <span class="property-info-label">Car garages</span>
                                        <span class="property-info-value">{{propertyDetails.garages}}</span>
                                    </span>
                                </div>


                            </div>
                            <!-- .property-meta -->

                            <div class="section" v-if="propertyDetails.description">
                                <h4 class="s-property-title">Description</h4>
                                <div class="s-property-content">
                                    <p>{{propertyDetails.description}}</p>
                                </div>
                            </div>
                            <!-- End description area  -->

                            <div class="section additional-details">

                                <h4 class="s-property-title">Additional Details</h4>

                                <ul class="additional-details-list clearfix">
                                    <li v-if="propertyDetails.units">
                                        <span class="col-xs-6 col-sm-4 col-md-4 add-d-title">Units</span>
                                        <span class="col-xs-6 col-sm-8 col-md-8 add-d-entry">{{propertyDetails.units}}</span>
                                    </li>

                                    <li v-if="propertyDetails.year_built">
                                        <span class="col-xs-6 col-sm-4 col-md-4 add-d-title">Built In</span>
                                        <span class="col-xs-6 col-sm-8 col-md-8 add-d-entry">{{propertyDetails.year_built}}</span>
                                    </li>
                                    <li v-if="propertyDetails.floor_number">
                                        <span class="col-xs-6 col-sm-4 col-md-4 add-d-title">Floor number</span>
                                        <span class="col-xs-6 col-sm-8 col-md-8 add-d-entry">{{propertyDetails.floor_number}}</span>
                                    </li>

                                    <li v-if="propertyDetails.property_finalizing">
                                        <span class="col-xs-6 col-sm-4 col-md-4 add-d-title">Property Finalizing</span>
                                        <span class="col-xs-6 col-sm-8 col-md-8 add-d-entry">{{propertyDetails.property_finalizing}}</span>
                                    </li>

                                    <li v-if="propertyDetails.phone">
                                        <span class="col-xs-6 col-sm-4 col-md-4 add-d-title">Phone</span>
                                        <span class="col-xs-6 col-sm-8 col-md-8 add-d-entry">{{propertyDetails.phone}}</span>
                                    </li>

                                </ul>
                            </div>
                            <!-- End additional-details area  -->

                            <div class="section property-features" v-if="propertyDetails.features.length > 0">

                                <h4 class="s-property-title">Features</h4>
                                <ul>
                                    <li v-for="feature in propertyDetails.features" :key="feature.id"><a href="#">{{feature.title}}</a></li>
                                </ul>

                            </div>
                            <!-- End features area  -->

                            <div class="section property-video" v-if="propertyDetails.youtube_video">
                                <h4 class="s-property-title">Property Video</h4>
                                <div class="video-thumb">
                                    <a class="video-popup" :href="propertyDetails.youtube_video" title="Virtual Tour" target="_blank">
                                        <img :src="propertyDetails.pictures[0].image_url" class="img-responsive wp-post-image" alt="Video">
                                        <i class="fa fa-play-circle"></i>
                                    </a>
                                </div>
                            </div>
                            <!-- End video area  -->



                            <div class="section property-share">
                                <h4 class="s-property-title">Share width your friends </h4>
                                <div class="roperty-social">
                                    <ul>
                                        <li><a title="Share this on facebok " href="#"><img src="/public/template/assets/img/social_big/facebook_grey.png"></a></li>
                                        <li><a title="Share this on delicious " href="#"><img src="/public/template/assets/img/social_big/delicious_grey.png"></a></li>
                                        <li><a title="Share this on tumblr " href="#"><img src="/public/template/assets/img/social_big/tumblr_grey.png"></a></li>
                                        <li><a title="Share this on twitter " href="#"><img src="/public/template/assets/img/social_big/twitter_grey.png"></a></li>
                                        <li><a title="Share this on linkedin " href="#"><img src="/public/template/assets/img/social_big/linkedin_grey.png"></a></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- End video area  -->

                        </div>
                    </div>


                    <div class="col-md-4 p0">
                        <aside class="sidebar sidebar-property blog-asside-right">
                            <PropertyUserInfo :property-details="propertyDetails" />

                            <div class="panel panel-default sidebar-menu wow fadeInRight animated">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Ads her  </h3>
                                </div>
                                <div class="panel-body recent-property-widget">
                                    <img src="/public/template/assets/img/ads.jpg">
                                </div>
                            </div>

                        </aside>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useToastError} from "../../composables/useToastError";
import {formatMoney} from "../../api/helpers";
import {rentAmountPerList} from "../../api/static_data";
import PropertyUserInfo from "../partials/PropertyUserInfo.vue";
import {useFavorites} from "../../composables/useFavorites";

export default {
    name: "PropertySingle",
    components: {PropertyUserInfo},
    setup() {
        const route = useRoute();
        const {displayErrors} = useToastError();

        const {addToFavorites, removeFromFavorites, isPropertyInFavorites} = useFavorites();

        let propertyDetails = ref(null);
        let loading = ref(true);

        loading.value = true;
        window.axios.get(`/api/property/${route.params.id}`).then(response => {
            loading.value = false;

            if(!response.data.status) {
                displayErrors({data: {message: 'Unable to fetch property'}});
                return;
            }

            propertyDetails.value = response.data.property;

            propertyDetails.value.isFav = isPropertyInFavorites(propertyDetails.value.id);

            setTimeout(initializeSlider, 300);

        }).catch(err => {
            loading.value = false;
            console.error(err);
        });

        function getFormattedPrice(property)
        {
            if(property.status === 'Sale') {
                return '$' + formatMoney(property.price);
            } else {
                return '$' + formatMoney(property.price) +' ' + (rentAmountPerList.find(l => l.id == property.rent_amount_per)).name;
            }
        }

        function initializeSlider()
        {
            $(document).ready(function () {

                var slide = $('#image-gallery').lightSlider({
                    gallery: true,
                    item: 1,
                    thumbItem: 9,
                    slideMargin: 0,
                    speed: 500,
                    auto: true,
                    loop: true,
                    onSliderLoad: function () {
                        $('#image-gallery').removeClass('cS-hidden');
                    }
                });
            });
        }

        return {
            propertyDetails,
            loading,
            getFormattedPrice,
            addToFavorites,
            removeFromFavorites,
            isPropertyInFavorites
        }
    }
}
</script>

<style scoped>
.gallery .lslide {
    background-color: #ccc;
}

.single-property-header .property-title {
    font-size: 23px;
}

.single-property-header .property-price {
    font-size: 27px;
}

.video-popup {
    position: relative;
}

.video-popup .fa-play-circle {
    position: absolute;
    top: 143px;
    left: 181px;
    font-size: 56px;
}

.fav-selected {
    color: #FDC600;
    border-color: #FDC600;
}
</style>
