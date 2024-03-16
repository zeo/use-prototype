import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { AdditionGame, Home } from "./pages";
import "./app.css";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/games/addition",
            name: "games.addition",
            component: AdditionGame,
        },
    ],
});

createApp(App)
    .use(router)
    .mount('#app');