import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/pages/Home.vue";
import Properties from "./components/pages/Properties.vue";
import Contact from "./components/pages/Contact.vue";
import PropertySingle from "./components/pages/PropertySingle.vue";
import Register from "./components/pages/Register.vue";
import SubmitProperty from "./components/pages/SubmitProperty.vue";
import EditProfile from "./components/pages/user/EditProfile.vue";
import ChangePassword from "./components/pages/user/ChangePassword.vue";
import MyProperties from "./components/pages/user/MyProperties.vue";
import Favorites from "./components/pages/user/Favorites.vue";
import EditProperty from "./components/pages/user/EditProperty.vue";

import store from "./store";

const routes = [
    {path: '/', component: Home},
    {path: '/properties', component: Properties},
    {path: '/register', name: 'register',component: Register},
    {path: '/property/:id/:slug', component: PropertySingle},
    {path: '/submit-property', component: SubmitProperty, meta: { requiresAuth: true, }},
    {path: '/contact', component: Contact},
    {path: '/user/edit-profile', component: EditProfile, meta: { requiresAuth: true, }},
    {path: '/user/change-password', component: ChangePassword, meta: { requiresAuth: true, }},
    {path: '/user/my-properties', component: MyProperties, meta: { requiresAuth: true, }},
    {path: '/user/edit-property/:id', component: EditProperty, meta: { requiresAuth: true, }},
    {path: '/user/fav', component: Favorites, meta: { requiresAuth: true, }},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from) => {
    const authenticated = store.getters['auth/signedIn'];
    const user = store.getters['auth/user'];

    if (to.matched.some((record) => record.meta.requiresAuth)) {

        if (!authenticated || !user) {
            return { name: 'register' };
        }
    }

    if(to.name === 'register' && authenticated && user) {
        return { name: 'home' };
    }

    return true;
});

export default router;
