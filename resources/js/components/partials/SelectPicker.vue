<template>
    <select :name="name" class="selectpicker" ref="selectpickerref" data-live-search="true" data-live-search-style="begins" :title="title">
        <option v-for="opt in options" :key="opt.id" :value="opt.id" :selected="opt.id === content">{{opt.name}}</option>
    </select>
</template>

<script>
export default {
    name: "SelectPicker",
    props: ["name", "title", "options", "selected"],
    emits: ["onChange"],
    data() {
        return {
            content: this.selected
        }
    },
    methods: {
    },
    mounted() {
        this.content = this.selected;

        $(document).ready(() => {
            $(`select[name=${this.$refs.selectpickerref.name}]`).selectpicker();

            $(`select[name=${this.$refs.selectpickerref.name}]`).on('changed.bs.select', (e, clickedIndex, isSelected, previousValue) => {
                this.content = parseInt(e.target.value);
                this.$emit('onChange', this.content);
            });
        });
    },
    watch: {
        options(newVal, oldVal) {
            if(this.$refs.selectpickerref) {
                setTimeout(() => $(`select[name=${this.$refs.selectpickerref.name}]`).selectpicker('refresh'), 1000);
            }
        },
        selected(newVal, oldVal) {
            if(newVal !== oldVal) {
                this.content = parseInt(newVal);
                if(this.$refs.selectpickerref) {
                    $(`select[name=${this.$refs.selectpickerref.name}]`).val(this.content);
                    $(`select[name=${this.$refs.selectpickerref.name}]`).selectpicker("refresh");
                }
            }
        }
    }
}
</script>
