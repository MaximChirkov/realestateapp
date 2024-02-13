<template>
    <div class="pagination" v-if="item && item.total > item.data.length">
        <ul>
            <li :class="{disabled: item.current_page === 1}"><a href="#" :class="{disabled: item.current_page === 1}" @click.prevent="handlePage(item.current_page - 1)">Prev</a></li>
            <li v-for="(n,index) in item.last_page" :key="index" :class="{active: item.current_page === n}"><a :class="{disabled: item.current_page === n}" href="#" @click.prevent="handlePage(n)">{{n}}</a></li>
            <li><a href="#" :class="{disabled: item.current_page === item.last_page}" @click.prevent="handlePage(item.current_page + 1)">Next</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["item"],
    emits: ["onPaginate"],
    methods: {
        handlePage(page) {
            this.$emit('onPaginate', page);
        }
    }
}
</script>
<style scoped>
a.disabled {
    color: gray;
    pointer-events: none;
}
</style>
