export const formatMoney = (amount) => {
    return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const slugify = text =>
    text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')

export const serializeObject = function(obj) {
    let str = [];
    for(let p in obj){
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}

export const getSearchParamsFromStore = function (data) {
    let params = {};

    const stateData = {...data};
    const {search_params, sorting_params, paginate_params} = stateData;

    search_params.range_fields = {...search_params.range_fields};
    search_params.features = [...search_params.features];

    // check for status and delete the appropriate data
    if(search_params['status'] === 'Sale') {
        delete search_params['range_fields']['rent'];
        delete search_params['rent_per'];
    } else if(search_params['status'] === 'Rent') {
        delete search_params['range_fields']['price'];
    } else {
        delete search_params['range_fields']['rent'];
        delete search_params['range_fields']['price'];
    }

    for (let key in search_params) {

        if(key !== "range_fields" && key !== "features") {
            if(search_params[key]) {
                params[key] = encodeURIComponent(search_params[key]);
            }
        } else if (key === "range_fields") {
            for(let subkey in search_params.range_fields) {
                if(search_params.range_fields[subkey].min || search_params.range_fields[subkey].max) {
                    params[subkey] = search_params.range_fields[subkey].min + ',' + search_params.range_fields[subkey].max;
                }
            }
        } else if (key === "features" && search_params.features.length > 0) {
            params[key] = search_params.features.join(",");
        }
    }

    params['sorting_field'] = sorting_params.sortBy;
    params['sorting_order'] = sorting_params.sortOrder;

    params['per_page'] = paginate_params.per_page;
    params['page'] = paginate_params.page;

    return params;
}
