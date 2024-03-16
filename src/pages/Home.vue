<script setup lang="ts">
const buttons = [
    {
        text: "Addition",
        route: "games.addition"
    },

    {
        text: "Bus Sommen",
        route: "games.addition"
    }
]
</script>

<template>
    <div class="min-h-screen bg-pink-100 p-4 flex flex-col">
        <h1 class="text-center my-12 text-2xl font-bold text-pink-700">
            Learning Game
        </h1>

        <div class="flex flex-grow w-100 flex-col gap-2">
            <router-link
                v-for="button in buttons" 
                :to="{ name: button.route }" 
                class="bg-pink-300 text-pink-800 w-100 p-2 rounded-md text-center"
            >
                {{ button.text }}
            </router-link>
        </div>

        <div class="text-center">
            <p class="italic text-sm">0LAUK0 PRE - Group 9</p>
        </div>
    </div>
</template>