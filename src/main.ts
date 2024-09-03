import { createApp } from 'vue';
import ECharts from 'vue-echarts';
import VScaleScreen from 'v-scale-screen';
import DataVVue3 from '@kjgl77/datav-vue3';
import 'echarts';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App);
const VScreen = document.documentElement;

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);
app.use(DataVVue3);
app.component('VScaleScreen', VScaleScreen);
app.component('VueEcharts', ECharts);

app.mount('#app');
