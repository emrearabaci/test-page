import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import axios from 'axios';

axios.defaults.baseURL = 'https://api.bek.org.tr/api/Test';

Vue.config.productionTip = false;

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Custom Styles
import './assets/styles/main/app.scss';

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
