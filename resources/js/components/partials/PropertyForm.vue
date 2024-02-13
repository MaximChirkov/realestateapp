<template>
    <div class="wizard-container">
        <div class="wizard-card ct-wizard-orange" id="wizardProperty">
            <form action="#" method="post" @submit.prevent="handleSubmit" novalidate="novalidate">
                <div class="wizard-header">
                    <h3>
                        <b>Submit</b> YOUR PROPERTY <br />
                        <small>Please fill all the fields marked as required</small>
                    </h3>
                    <div v-if="validationErrors.length" class="alert alert-danger">
                        <ul>
                            <li v-for="error of validationErrors" :key="error">{{error}}</li>
                        </ul>
                    </div>
                </div>
                <ul class="nav nav-pills">
                    <li style="width: 25%;" :class="{'active': shownStep===1}"><a>Step 1 </a></li>
                    <li style="width: 25%;" :class="{'active': shownStep===2}"><a>Step 2 </a></li>
                    <li style="width: 25%;" :class="{'active': shownStep===3}"><a>Step 3 </a></li>
                    <li style="width: 25%;" :class="{'active': shownStep===4}"><a>Finished </a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane" :class="{'active': shownStep===1}" id="step1" v-show="shownStep === 1">
                        <div class="row p-b-15">
                            <h4 class="info-text">Let's start with the basic information</h4>
                            <div class="col-sm-4 col-sm-offset-1">
                                <div class="picture-container">
                                    <div class="picture">
                                        <img v-if="!pictureFiles.length" src="/public/template/assets/img/default-property.jpg" class="picture-src" title="select property image" />
                                        <img v-if="pictureFiles.length > 0" :src="pictureFiles[0].image_url" class="picture-src" title="update property image" />
                                        <input type="file" id="wizard-picture" name="mainPicture" accept="image/*" @input="handleSelectMainPicture" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Property title <small>(required)</small></label>
                                    <input name="title" type="text" class="form-control" placeholder="Super villa ..." v-model="form.title" />
                                </div>
                                <div class="form-group">
                                    <label>Property Type: (required)</label>
                                    <select name="status" class="form-control" v-model="form.status">
                                        <option v-for="type in propertyTypes" v-bind:key="type" :value="type">{{type}} </option>
                                    </select>
                                </div>
                                <div class="row">
                                    <div class="col-md-7">
                                        <div class="form-group">
                                            <label>Property Price / Rent <small>(required)</small></label>
                                            <input name="price" type="number" class="form-control" placeholder="3330000" v-model="form.price" />
                                        </div>
                                    </div>
                                    <div class="col-md-5" v-if="form.status === 'Rent'">
                                        <label>Rent Per <small>(for rent only)</small></label>
                                        <select name="rent_amount_per" class="form-control" v-model="form.rent_amount_per">
                                            <option>- Rent Per -</option>
                                            <option v-for="rentPer in rentAmountPerList" :key="rentPer.id" :value="rentPer.id">{{rentPer.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Phone <small>(empty if you wanna use default phone number)</small></label>
                                    <input name="phone" type="text" class="form-control" placeholder="+1 473 843 7436" v-model="form.phone" />
                                </div>
                                <div class="form-group">
                                    <label>Area <small>(required)</small></label>
                                    <input name="area" type="number" class="form-control" placeholder="200 Square Meter" v-model="form.area" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  End step 1 -->
                    <div class="tab-pane" :class="{'active': shownStep===2}" id="step2" v-show="shownStep === 2">
                        <h4 class="info-text">How much your Property is Beautiful ?</h4>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="col-sm-12">
                                    <div class="form-group"><label>Property Description :</label>
                                        <textarea name="description" class="form-control" v-model="form.description"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Property Country :</label>
                                        <SelectPicker title="Select your country" :options="countries" name="country" :selected="form.country" @onChange="onCountryChange" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Property State :</label>
                                        <SelectPicker title="Select your state" :options="states" name="state" :selected="form.state" @onChange="onStateChange" />
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <label>Property City :</label>
                                        <SelectPicker title="Select your city" :options="cities" name="city" :selected="form.city" @onChange="onCityChange" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 padding-top-15">
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label>Beds :</label>
                                        <input type="number" name="bedrooms" class="form-control" v-model="form.bedrooms" >
                                    </div>
                                </div>
                                <div class="col-sm-2">

                                    <div class="form-group">
                                        <label>Baths :</label>
                                        <input type="number" name="bathrooms" class="form-control" v-model="form.bathrooms" />
                                    </div>
                                </div>
                                <div class="col-sm-2">

                                    <div class="form-group">
                                        <label>Rooms :</label>
                                        <input type="number" name="rooms" class="form-control" v-model="form.rooms" />
                                    </div>
                                </div>
                                <div class="col-sm-2">

                                    <div class="form-group">
                                        <label>Units :</label>
                                        <input type="number" name="units" class="form-control" v-model="form.units" />
                                    </div>
                                </div>
                                <div class="col-sm-2">

                                    <div class="form-group">
                                        <label>Floor number :</label>
                                        <input type="number" name="floor_number" class="form-control" v-model="form.floor_number" />
                                    </div>
                                </div>
                                <div class="col-sm-2">

                                    <div class="form-group">
                                        <label>Garages :</label>
                                        <input type="number" name="garages" class="form-control" v-model="form.garages" />
                                    </div>
                                </div>
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>Year Built:</label>
                                        <select name="year_built" class="form-control" v-model="form.year_built">
                                            <option value="0">- Year Built -</option>
                                            <option v-for="year in getYears()" :key="year" :value="year">{{year}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>Property Finalizing:</label>
                                        <select name="property_finalizing" class="form-control" v-model="form.property_finalizing">
                                            <option>- Property Finalizing -</option>
                                            <option v-for="finalizing in propertyFinalizingList" :key="finalizing" :value="finalizing">{{finalizing}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br /><br />
                            <h4 style="margin-left:26px">Features</h4>
                            <div class="col-sm-12 padding-top-15 padding-bottom-15">
                                <div class="col-sm-3" v-for="feature in features" v-bind:key="feature.id">
                                    <div class="form-group">

                                        <ICheckInput type="checkbox" :name="'feature'+feature.id" :value="feature.id" :text="feature.title" v-on:onChecked="handleOnSelectFeature" v-on:onUnchecked="handleOnDeselectFeature" :defaultChecked="form.features.includes(feature.id)" />

                                    </div>
                                </div>

                            </div>

                            <br />
                        </div>
                    </div>
                    <!-- End step 2 -->
                    <div class="tab-pane" :class="{'active': shownStep===3}" id="step3" v-show="shownStep === 3">
                        <h4 class="info-text">Give us some images and video</h4>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Choose Images :</label>
                                    <input class="form-control" type="file" name="pictures" multiple accept="image/*" @input="handleSelectOtherPictures" />
                                    <p class="help-block">Select multiple images for your property .</p>
                                    <ul v-if="pictureFiles.length > 1" class="pictures">
                                        <li v-for="picture in pictureFiles.slice(1, pictureFiles.length)" :key="picture.id">
                                            <img :src="picture.image_url" width="100" height="80" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Property video :</label>
                                    <input class="form-control" placeholder="http://www.youtube.com" name="youtube_video" type="text" v-model="form.youtube_video" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  End step 3 -->
                    <div class="tab-pane" :class="{'active': shownStep===4}" id="step4" v-show="shownStep === 4">
                        <h4 class="info-text">Finished and submit</h4>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="">
                                    <p>
                                        <label><strong>Terms and Conditions</strong></label>
                                        By accessing or using  GARO ESTATE services, such as
                                        posting your property advertisement with your personal
                                        information on our website you agree to the
                                        collection, use and disclosure of your personal information
                                        in the legal proper manner
                                    </p>

                                    <ICheckInput type="checkbox" name="accept_terms" value="1" text="Accept terms and conditions." v-on:onChecked="handleAcceptTerms" v-on:onUnchecked="handleRefuseTerms" :default-checked="form.accept_terms" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  End step 4 -->
                </div>
                <div class="wizard-footer">
                    <div class="pull-right">
                        <input type='button' class='btn btn-next btn-primary' name='next' value='Next' @click="moveForward" v-show="shownStep >= 1 && shownStep < 4" />
                        <input type='submit' class='btn btn-primary ' name='finish' :value="!this.$route.params.id ? 'Finish' : 'Update'" :disabled="!form.accept_terms" v-show="shownStep === 4" />
                    </div>

                    <div class="pull-left">
                        <input type='button' class='btn btn-previous btn-default' name='previous' value='Previous' @click="moveBackward" v-show="shownStep > 1" />
                    </div>
                    <div class="clearfix"></div>
                </div>
            </form>
        </div>
        <!-- End submit form -->
    </div>
</template>

<script>
import {useRoute} from "vue-router";
import ICheckInput from "./ICheckInput.vue";
import SelectPicker from "./SelectPicker.vue";
import {useSetupFormWizard} from "../../composables/useSetupFormWizard";
import {useSubmitPropertyForm} from "../../composables/useSubmitPropertyForm";
import {useLoadStaticData} from "../../composables/useLoadStaticData";

export default {
    name: "PropertyForm",
    props: ["isEdit"],
    components: {SelectPicker, ICheckInput},
    setup(props) {
        const route = useRoute();

        const {form, handleSubmit, handleSelectMainPicture,
            handleSelectOtherPictures, handleAcceptTerms, handleRefuseTerms,
            handleOnDeselectFeature, handleOnSelectFeature, validationErrors, pictureFiles} = useSubmitPropertyForm(props.isEdit == '1');

        const {getYears, rentAmountPerList, propertyFinalizingList, propertyTypes,
            features, countries, states, cities, handleSelectCountry, handleSelectState,
            handleSelectCity, selectedCountry, selectedState, selectedCity, loadStates, loadCities} = useLoadStaticData({selectedCountryId: form.country, selectedStateId: form.state, selectedCityId: form.city});

        const {shownStep, moveForward, moveBackward} = useSetupFormWizard();

        const onCountryChange = e => {
            handleSelectCountry(e);
            form.country = selectedCountry.value;
            form.state = '';
            form.city = '';
        }

        const onStateChange = e => {
            handleSelectState(e);
            form.state = selectedState.value;
            form.city = '';
        }

        const onCityChange = e => {
            handleSelectCity(e);
            form.city = selectedCity.value;
        }

        if(props.isEdit == '1') {
            setTimeout(() => {
                window.axios.get(`/api/property/${route.params.id}`).then(res => {
                    if(res.data.status) {
                        const property = res.data.property;
                        for(let key in property) {
                            if(form.hasOwnProperty(key)) {
                                if(key === 'country' || key === 'state' || key === 'city') {
                                    form[key] = property[key] ? property[key].id : 0;
                                    if(key === 'country') {
                                        loadStates(form[key]);
                                    }

                                    if(key === 'state') {
                                        loadCities(form[key], form.country);
                                    }
                                } else if(key === 'features') {
                                    form[key] = property[key] ? property[key].map(f => f.id) : [];
                                } else if(key === 'pictures') {
                                    pictureFiles.value = property[key] ? property[key] : [];
                                } else {
                                    form[key] = property[key];
                                }
                            }
                        }
                    }
                });
            }, 500);
        }

        return {
            getYears,
            shownStep,
            moveForward,
            moveBackward,
            propertyTypes,
            rentAmountPerList,
            propertyFinalizingList,
            features,
            countries,
            states,
            cities,
            onCountryChange,
            onStateChange,
            onCityChange,
            form,
            handleSubmit,
            handleSelectMainPicture,
            handleSelectOtherPictures,
            handleAcceptTerms,
            handleRefuseTerms,
            handleOnSelectFeature,
            handleOnDeselectFeature,
            validationErrors,
            pictureFiles
        }
    }
}
</script>

<style scoped>
.btn[disabled] {
    background-color: #ccc;
    color: #000;
}

.pictures li {
    display: inline;
}
</style>
