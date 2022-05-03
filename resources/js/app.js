require('./bootstrap');
window.Vue = require('vue').default;

import App from './components/App'
import Posts from './components/pages/posts/Index'
import ValidationErrors from './components/parts/validationErrors'

Vue.component('posts', Posts);
Vue.component('validation-errors', ValidationErrors);

const app = new Vue({
    el: '#app',
    render: h => h(App)
});
