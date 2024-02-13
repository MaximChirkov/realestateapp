<template>
    <div class="col-md-3 p0 padding-top-40">
        <div class="blog-asside-right pr0">
            <div class="panel panel-default sidebar-menu wow fadeInRight animated" >
                <div class="panel-heading">
                    <h3 class="panel-title">Smart search</h3>
                </div>
                <div class="panel-body search-widget">
                    <form action="#" class=" form-inline" @submit.prevent="submitSearch(); scrollTop();">
                        <fieldset>
                            <div class="row">
                                <div class="col-xs-12">
                                    <input type="text" class="form-control" name="keyword" placeholder="Key word" v-model="keyword" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="row">
                                <div class="col-xs-12">

                                    <SelectPicker title="Select your country" :options="countries" name="country" :selected="country" @onChange="onCountryChange" />

                                </div>
                                <div class="col-xs-12">

                                    <SelectPicker title="Select your State" :options="states" name="state" :selected="state" @onChange="onStateChange" />

                                </div>
                                <div class="col-xs-12">

                                    <SelectPicker title="Select your City" :options="cities" name="city" :selected="city" @onChange="onCityChange" />

                                </div>

                                <div class="col-xs-12" style="margin-top: 7px">

                                    <select name="status" class=" show-tick form-control" v-model="status">
                                        <option value=""> -Type- </option>
                                        <option v-for="type in propertyTypes" v-bind:key="type" :value="type">{{type}} </option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="padding-5">
                            <div class="row">
                                <div class="col-xs-12" v-show="status === 'Sale'">
                                    <NumberRange label="Price range ($)" id="price-range" :min="0" :max="100000000" :step="1" :slider-value="price" @onChange="onRangeChange('price', $event)" />
                                </div>
                                <div class="col-xs-12" v-show="status === 'Rent'">
                                    <NumberRange label="Rent range ($)" id="rent-range" :min="0" :max="100000000" :step="1" :slider-value="rent" @onChange="onRangeChange('rent', $event)" />

                                </div>
                                <div class="col-xs-12" v-show="status === 'Rent'">
                                    <select name="rent_amount_per" class="form-control" v-model="rentPer">
                                        <option value="">- Rent Per -</option>
                                        <option v-for="rPer in rentAmountPerList" :key="rPer.id" :value="rPer.id">{{rPer.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="padding-5">
                            <div class="row">
                                <div class="col-xs-12">
                                    <NumberRange label="Min baths" id="min-baths" :min="0" :max="50" :step="1" :slider-value="baths" @onChange="onRangeChange('bathrooms', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min bed" id="min-bed" :min="0" :max="50" :step="1" :slider-value="beds" @onChange="onRangeChange('bedrooms', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min area" id="min-area" :min="0" :max="500" :step="1" :slider-value="area" @onChange="onRangeChange('area', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min rooms" id="min-rooms" :min="0" :max="50" :step="1" :slider-value="rooms" @onChange="onRangeChange('rooms', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min garages" id="min-garages" :min="0" :max="10" :step="1" :slider-value="garages" @onChange="onRangeChange('garages', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min units" id="min-units" :min="0" :max="1000" :step="1" :slider-value="units" @onChange="onRangeChange('units', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min floors" id="min-floor_number" :min="0" :max="100" :step="1" :slider-value="floor_numbers" @onChange="onRangeChange('floor_number', $event)" />
                                </div>

                                <div class="col-xs-12">
                                    <NumberRange label="Min year built" id="min-year_built" :min="0" :max="(new Date()).getFullYear()" :step="1" :slider-value="year_built" @onChange="onRangeChange('year_built', $event)" />
                                </div>

                                <div class="col-xs-12" style="margin-top: 7px">

                                    <select name="property_finalizing" class="form-control" v-model="propertyFinalizing">
                                        <option value="">- Property Finalizing -</option>
                                        <option v-for="finalizing in propertyFinalizingList" :key="finalizing" :value="finalizing">{{finalizing}}</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset class="padding-5">
                            <div class="row">
                                <div class="col-xs-12" v-for="feature in features" v-bind:key="feature.id">
                                    <ICheckInput type="checkbox" :name="'feature'+feature.id" :value="feature.id" :text="feature.title" @onChecked="onSelectFeature" @onUnchecked="onUnselectFeature" :default-checked="this.$store.state.search.search_params.features.find(i => i == feature.id) !== undefined" />
                                </div>

                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="row">
                                <div class="col-xs-12">
                                    <input class="button btn largesearch-btn" value="Search" type="submit">
                                </div>
                            </div>
                        </fieldset>

                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {useStore} from "vuex";


import ICheckInput from "./ICheckInput.vue";
import NumberRange from "./NumberRange.vue";
import SelectPicker from "./SelectPicker.vue";

import {useSearchFilters} from "../../composables/useSearchFilters.js";
import {useLoadStaticData} from "../../composables/useLoadStaticData.js";
import {useSubmitSearch} from "../../composables/useSubmitSearch";
import {SET_SEARCH_CITY, SET_SEARCH_COUNTRY, SET_SEARCH_STATE} from "../../store/types.js";

export default {
    name: "SearchSidebar",
    components: {SelectPicker, NumberRange, ICheckInput},
    setup() {
        const store = useStore();

        const {country, state, city, keyword, status, baths, beds, price, rent, area,
            rooms, garages, units, floor_numbers, year_built, rentPer,
            propertyFinalizing, onRangeChange, onSelectFeature, onUnselectFeature} = useSearchFilters();

        const {rentAmountPerList, propertyFinalizingList, propertyTypes,
            features, countries, states, cities, handleSelectCountry, handleSelectState,
            handleSelectCity, selectedCountry, selectedState, selectedCity} = useLoadStaticData({selectedCountryId: country, selectedStateId: state, selectedCityId: city});

        const {submitSearch} = useSubmitSearch();

        const scrollTop = () => {
            document.querySelector('.properties-page').scrollIntoView({
                behavior: 'smooth'
            });
        }
        const onCountryChange = e => {
            handleSelectCountry(e);

            store.commit(`search/${SET_SEARCH_COUNTRY}`, selectedCountry.value);
            store.commit(`search/${SET_SEARCH_STATE}`, 0);
            store.commit(`search/${SET_SEARCH_CITY}`, 0);
        }

        const onStateChange = e => {
            handleSelectState(e);
            store.commit(`search/${SET_SEARCH_STATE}`, selectedState.value);
            store.commit(`search/${SET_SEARCH_CITY}`, 0);
        }

        const onCityChange = e => {
            handleSelectCity(e);
            store.commit(`search/${SET_SEARCH_CITY}`, selectedCity.value);
        }


        return {
            propertyFinalizingList,
            rentAmountPerList,
            propertyTypes,
            features,
            countries,
            states,
            cities,
            country,
            state,
            city,
            keyword,
            status,
            rentPer,
            baths,
            beds,
            price,
            rent,
            area,
            rooms,
            garages,
            units,
            floor_numbers,
            year_built,
            propertyFinalizing,
            onRangeChange,
            onSelectFeature,
            onUnselectFeature,
            onCountryChange,
            onStateChange,
            onCityChange,
            submitSearch,
            scrollTop
        }
    }
}
</script>
