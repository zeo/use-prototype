<script setup lang="ts">
import welcomePng from "../assets/welcome.png"

const buttons = [
    {
        text: "Addition Game",
        route: "games.addition"
    },
    {
        text: "Subtraction Game",
        route: "games.subtraction",
    },
    {
        text: "Bus Games",
        route: "games.bus"
    }
]
</script>

<template>
    <div class="min-h-screen bg-wisteria-500 p-4 flex flex-col">
        <h1 class="text-center my-12 text-2xl font-bold text-black">
            Cownting Time
        </h1>

        <div class="flex flex-grow w-100 flex-col gap-2">
            <router-link
                v-for="button in buttons" 
                :to="{ name: button.route }" 
                class="bg-wisteria-400 text-black text-xl w-100 p-2 rounded-md text-center"
            >
                {{ button.text }}
            </router-link>
        </div>

        <div class="mx-auto">
            <img :src="welcomePng" class="w-64 h-auto"/>
        </div>
    </div>
</template>