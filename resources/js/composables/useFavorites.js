import {useToast} from "vue-toastification";

export const useFavorites = () => {
    const toast = useToast();

    function writeToStorage(favs) {
        window.localStorage.setItem("favorites", JSON.stringify(favs));
    }

    function getFavoritesFromStorage() {
        return window.localStorage.getItem("favorites") ? JSON.parse(window.localStorage.getItem("favorites")) : [];
    }

    function addToFavorites(pid) {
        let favs = getFavoritesFromStorage();

        if(favs.find(i => parseInt(i) === parseInt(pid)) === undefined) {
            favs = [...favs, pid];
            writeToStorage(favs);
        }

        toast.success("Property added to favorites");

        return favs;
    }

    function removeFromFavorites(pid) {
        let favs = getFavoritesFromStorage();

        if(favs.find(i => parseInt(i) === parseInt(pid)) !== undefined) {
            favs = favs.filter(i => parseInt(i) !== parseInt(pid));
            writeToStorage(favs);
        }

        toast.success("Property removed from favorites");

        return favs;
    }

    function isPropertyInFavorites(pid) {
        let favs = getFavoritesFromStorage();

        return favs.find(i => parseInt(i) === parseInt(pid)) !== undefined;
    }

    function searchFavorites(cb) {
        window.axios.get('/api/search', {params: {
                ids: getFavoritesFromStorage().join(",")
            }
        }).then(response => {
            cb(response.data.properties.data);
        });
    }

    return {
        addToFavorites,
        removeFromFavorites,
        isPropertyInFavorites,
        getFavoritesFromStorage,
        searchFavorites
    }
}
