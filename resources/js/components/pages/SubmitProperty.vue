<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Submit new property</h1>
                </div>
            </div>
        </div>
    </div>

    <!-- property area -->
    <div class="content-area submit-property" style="background-color: #FCFCFC;">&nbsp;
        <div class="container">
            <div class="clearfix" >

                <PropertyForm />

            </div>
        </div>
    </div>
</template>

<script>
import PropertyForm from "../partials/PropertyForm.vue";

export default {
    name: "SubmitProperty",
    components: {PropertyForm}
}
</script>
