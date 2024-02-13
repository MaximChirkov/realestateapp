<template>
    <div ref="myRange">
        <label :for="id">{{label}}:</label>
        <div class="range-wrapper">
            <input type="number" placeholder="from" :min="min" :max="max" :step="step" :value="updatedSliderValue[0]" @change="emitValue($event, 'from')" />
            <input type="number" placeholder="to" :min="min" :max="max" :step="step" :value="updatedSliderValue[1]" @change="emitValue($event, 'to')" />
        </div>
    </div>
</template>

<script>
export default {
    name: "NumberRange",
    props: ["label", "id", "sliderValue", "min", "max", "step"],
    emits: ["onChange"],
    data() {
        return {
            updatedSliderValue: this.sliderValue
        }
    },
    methods: {
        emitValue(event, key) {
            const updated = !isNaN(parseInt(event.target.value)) ? parseInt(event.target.value) : 0;

            if(key === 'from') {
                this.updatedSliderValue = [updated, this.updatedSliderValue[1]];
            } else {
                this.updatedSliderValue = [this.updatedSliderValue[0], updated];
            }

            this.$emit('onChange', this.updatedSliderValue);
        }
    },
    watch: {
        sliderValue(newVal, oldVal) {
            if(newVal[0] !== oldVal[0] || newVal[1] !== oldVal[1]) {
                this.updatedSliderValue = [...newVal];
            }
        }
    }
}
</script>

<style scoped>
input[type=number] {
    width: 40%;
    border: 1px solid #ccc;
}

.range-wrapper input:last-child {
    margin-left:5px;
}
</style>
