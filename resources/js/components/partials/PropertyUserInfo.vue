<template>
    <div class="dealer-widget">
        <div class="dealer-content">
            <div class="inner-wrapper">
                <div class="clear">
                    <div class="col-xs-4 col-sm-4 dealer-face">
                        <a href="#">
                            <i class="fa fa-user"></i>
                        </a>
                    </div>
                    <div class="col-xs-8 col-sm-8 ">
                        <h3 class="dealer-name">
                            <a href="#">{{propertyDetails.user.name}}</a><br/>
                            <span>Real Estate Agent</span>
                        </h3>
                    </div>
                </div>
                <div class="clear">
                    <ul class="dealer-contacts">
                        <li><i class="pe-7s-mail strong"> </i> {{propertyDetails.user.email}}</li>
                        <li v-if="propertyDetails.user.phone"><i class="pe-7s-call strong"> </i> {{propertyDetails.user.phone}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PropertyUserInfo",
    props: ["propertyDetails"]
}
</script>

<style scoped>
.dealer-face .fa-user {
    font-size: 96px;
    color: #fff;
}
</style>
