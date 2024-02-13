<template>
    <div class="box-two proerty-item">
        <div class="item-thumb">
            <router-link :to="getPropertyDetailUrl()"><img :src="property.pictures[0].image_url" :alt="property.title"></router-link>
            <div v-if="this.show_fav_icon" class="fav-wrapper">
                <a class="add-to-fav" href="#" v-if="!property.isFav" @click.prevent="addToFav" title="add to favorites">
                    <i class="fa fa-star-o"></i>
                </a>
                <a class="add-to-fav fav-selected" href="#" v-else @click.prevent="removeFromFav" title="remove from favorites">
                    <i class="fa fa-star"></i>
                </a>
            </div>
        </div>

        <div class="item-entry overflow ">
            <h5><router-link :to="getPropertyDetailUrl()"> {{property.title}} </router-link></h5>
            <div class="dot-hr"></div>
            <span class="pull-left"><b> Area :</b> {{property.area}}m </span>
            <span class="proerty-price pull-right"> $ {{formatMoney(property.price)}}</span>
            <p style="display: none;" v-if="property.description">{{property.description}}</p>
            <div class="property-icon">
                <span v-for="(feature, index) in getFeatures()" :key="index">
                    <img :src="'/public/template/assets/img/icon/' + feature.icon"> ({{feature.val}}){{index === getFeatures().length - 1 ? '' : '|'}}
                </span>

                <div class="dealer-action pull-right" v-if="show_actions">
                    <router-link :to="`/user/edit-property/${property.id}`" class="button">Edit </router-link>
                    <a href="#" @click.prevent="deleteProperty" class="button delete_user_car">Delete</a>
                    <router-link :to="getPropertyDetailUrl()" class="button">View</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useToast} from "vue-toastification";
import {formatMoney, slugify} from "../../api/helpers";
import {useFavorites} from "../../composables/useFavorites";

export default {
    name: "PropertyTemplate",
    props: ["property", "show_actions", "show_fav_icon"],
    emits: ["onPropertyDeleted", "onAddToFavorite", "onRemoveFromFavorite"],
    setup(props, context) {
        const toast = useToast();

        const {isPropertyInFavorites, addToFavorites, removeFromFavorites} = useFavorites();

        props.property.isFav = isPropertyInFavorites(props.property.id);

        const getPropertyDetailUrl= function () {
            return `/property/${props.property.id}/${slugify(props.property.title)}`;
        }

        const getFeatures = function () {
            let features = [];
            if(props.property.bedrooms) {
                features = [...features, {icon: 'bed.png', val: props.property.bedrooms}];
            }

            if(props.property.bathrooms) {
                features = [...features, {icon: 'shawer.png', val: props.property.bathrooms}];
            }

            if(props.property.garages) {
                features = [...features, {icon: 'cars.png', val: props.property.garages}];
            }

            return features;
        }

        const deleteProperty = function () {
            if(window.confirm("Are you sure to delete this property?")) {
                window.axios.delete(`/api/property/${props.property.id}`).then(response => {
                    if (response.data.status) {
                        toast.success(response.data.message);
                        context.emit('onPropertyDeleted', props.property.id);
                    }
                });
            }
        }

        function addToFav() {
            addToFavorites(props.property.id);
            props.property.isFav=true;

            context.emit('onAddToFavorite', props.property.id);
        }

        function removeFromFav() {
            removeFromFavorites(props.property.id);
            props.property.isFav=false;

            context.emit('onRemoveFromFavorite', props.property.id);
        }

        return {
            formatMoney,
            getPropertyDetailUrl,
            getFeatures,
            deleteProperty,
            addToFav,
            removeFromFav
        }
    }
}
</script>

<style scoped>
.item-thumb {
    position: relative;
}
.fav-wrapper {
    position: absolute;
    top: 14px;
    left: 15px;
    font-size: 30px;
}

.fav-selected {
    color: #FDC600;
    border-color: #FDC600;
}
</style>
