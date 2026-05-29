import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import './style.css';
import App from './App.vue';

// Capture PWA install prompt early
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (window as any).deferredPrompt = e;
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
