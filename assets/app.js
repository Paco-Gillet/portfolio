import { createApp } from 'vue'
import App from './components/App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import './styles/main.css';

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
