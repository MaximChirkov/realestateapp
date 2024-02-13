import './bootstrap';
import {createApp} from "vue";
import router from './routes.js';
import App from "./components/App.vue";
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';
import store from './store';

createApp(App).use(router).use(Toast).use(store).mount('#app');
