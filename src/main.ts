import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { AdditionGame, AdditionGameMulti, AdditionGameSingle, SubtractionGame, Home, SubtractionGameSingle, SubtractionGameMulti, BusGame, BusGameSingle, BusGameMulti } from "./pages";
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
        {
            path: "/games/addition/single",
            name: "games.addition.single",
            component: AdditionGameSingle,
        },
        {
            path: "/games/addition/multi",
            name: "games.addition.multi",
            component: AdditionGameMulti,
        },
        {
            path: "/games/subtraction",
            name: "games.subtraction",
            component: SubtractionGame,
        },
        {
            path: "/games/subtraction/single",
            name: "games.subtraction.single",
            component: SubtractionGameSingle,
        },
        {
            path: "/games/subtraction/multi",
            name: "games.subtraction.multi",
            component: SubtractionGameMulti,
        },
        {
            path: "/games/bus",
            name: "games.bus",
            component: BusGame,
        },
        {
            path: "/games/bus/single",
            name: "games.bus.single",
            component: BusGameSingle,
        },
        {
            path: "/games/bus/multi",
            name: "games.bus.multi",
            component: BusGameMulti,
        },
    ],
});

createApp(App)
    .use(router)
    .mount('#app');