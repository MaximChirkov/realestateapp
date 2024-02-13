<template>
    <div class="checkbox">
        <label>
            <input :type="type" ref="checkboxref" :name="name" :value="value" :checked="defaultChecked" /> <strong>{{text}}</strong>
        </label>
    </div>
</template>

<script>
export default {
    name: "ICheckInput",
    props: ["value", "text", "name", "type", "defaultChecked"],
    mounted() {
        const self = this;

        $(document).ready(function () {
            $(`input[name=${self.$refs.checkboxref.name}]`).iCheck({
                checkboxClass: "icheckbox_square-yellow",
                radioClass: "iradio_square-yellow",
                increaseArea: '20%'
            });

            $(document).on("ifChecked ifUnchecked", `input[name=${self.$refs.checkboxref.name}]`, function (e) {
                if(e.type === 'ifChecked') {
                    self.$emit('onChecked', e.target.value);
                } else if (e.type === 'ifUnchecked') {
                    self.$emit('onUnchecked', e.target.value);
                }
            });
        });
    },
    watch: {
        defaultChecked(newVal, oldVal) {
            if(newVal !== oldVal) {
                if(newVal) {
                    $(`input[name=${this.$refs.checkboxref.name}]`).iCheck('check');
                } else {
                    $(`input[name=${this.$refs.checkboxref.name}]`).iCheck('uncheck');
                }
            }
        }
    }
}
</script>
