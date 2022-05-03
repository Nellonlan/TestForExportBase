require('./bootstrap');
window.Vue = require('vue').default;

import App from './components/App'
import Posts from './components/pages/posts/Index'
import ValidationErrors from './components/parts/validationErrors'
import {VueRecaptcha} from 'vue-recaptcha';

Vue.component('posts', Posts);
Vue.component('validation-errors', ValidationErrors);
Vue.component('vue-recaptcha', {VueRecaptcha});

const app = new Vue({
    el: '#app',
    render: h => h(App)
});
