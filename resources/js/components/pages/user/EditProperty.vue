<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Edit property #{{this.$route.params.id}}</h1>
                </div>
            </div>
        </div>
    </div>

    <!-- property area -->
    <div class="content-area submit-property" style="background-color: #FCFCFC;">&nbsp;
        <div class="container">
            <div class="clearfix" >

                <PropertyForm is-edit="1" />

            </div>
        </div>
    </div>
</template>

<script>
import PropertyForm from "../../partials/PropertyForm.vue";

export default {
    name: "EditProperty",
    components: {PropertyForm}
}
</script>
