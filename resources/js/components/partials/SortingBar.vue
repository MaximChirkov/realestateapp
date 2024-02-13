<template>
    <div class="page-subheader sorting" :class="container_class">
        <ul class="sort-by-list" :class="sorting_class">
            <li v-for="sort in sortingParams" :key="sort.field" :class="{active: defaultSort.sortBy === sort.field}">
                <a href="javascript:void(0);" @click.prevent="handleSorting(sort.field, defaultSort.sortOrder === 'ASC' ? 'DESC' : 'ASC')">
                    {{sort.text}} <i :class="`fa fa-sort-amount-${defaultSort.sortOrder === 'ASC' ? 'asc' : 'desc'}`"></i>
                </a>
            </li>
        </ul><!--/ .sort-by-list-->

        <div class="items-per-page" :class="per_page_class">
            <label for="items_per_page"><b>Property per page :</b></label>
            <div class="sel">
                <select id="items_per_page" name="per_page" @change="handlePerPage">
                    <option v-for="page of pagesList" :key="page" :value="page" :selected="page === perPage">{{page}}</option>
                </select>
            </div><!--/ .sel-->
        </div><!--/ .items-per-page-->
    </div>

    <div class="col-xs-2 layout-switcher" v-if="show_layout">
        <a v-for="(layout, index) of layouts" :key="layout.type" :class="'layout-'+layout.type + (layout.type === defaultLayout ? ' active':'')" :style="index > 0 ? 'margin-left: 5px':''" href="javascript:void(0);" @click="handleLayout(layout.type)"> <i class="fa" :class="layout.classname"></i>  </a>
    </div><!--/ .layout-switcher-->
</template>

<script>
export default {
    name: "SortingBar",
    props: [
        "per_page", "default_sort", "default_layout", "show_layout",
        "container_class", "sorting_class", "per_page_class"
    ],
    emits: ["onSelectPerPage", "onSelectSort", "onSelectLayout"],
    data() {
        return {
            sortingParams: [
                {text: 'Property Date', field: 'updated_at'},
                {text: 'Property Price', field: 'price'}
            ],
            pagesList: [6, 9, 12, 15, 30, 45, 60],
            layouts: [
                {type: 'list', classname: 'fa-th-list'},
                {type: 'grid', classname: 'fa-th'}
            ],
            perPage: parseInt(this.per_page),
            defaultSort: this.default_sort,
            defaultLayout: this.default_layout
        }
    },
    methods: {
        handlePerPage(e) {
            this.perPage = parseInt(e.target.value);

            this.$emit('onSelectPerPage', this.perPage);
        },
        handleSorting(sortBy, sortOrder) {
            this.defaultSort = {sortBy, sortOrder};

            this.$emit('onSelectSort', this.defaultSort);
        },
        handleLayout(type) {
            this.defaultLayout = type;

            this.$emit('onSelectLayout', this.defaultLayout);
        }
    },
    mounted() {
        this.perPage = parseInt(this.per_page);
        this.defaultSort = this.default_sort;
        this.defaultLayout = this.default_layout;
    },
    watch: {
        per_page(newVal, oldVal) {
            if(newVal != oldVal) {
                this.perPage = parseInt(newVal);
            }
        },
        default_sort(newVal, oldVal) {
            if({...newVal}.sortBy != {...oldVal}.sortBy || {...newVal}.sortOrder != {...oldVal}.sortOrder) {
                this.defaultSort = {...newVal};
            }
        }
    }
}
</script>
