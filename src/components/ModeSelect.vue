<script setup lang="ts">
import lovePng from "../assets/love.png";

const { singleRoute, multiRoute } = defineProps<{
    singleRoute: string,
    multiRoute: string
}>();
</script>

<template>
    <div class="min-h-screen bg-wisteria-500 p-4 flex flex-col">
        <h1 class="text-center my-12 text-2xl font-bold text-black">
            Cownting Time
        </h1>

        <div class="flex flex-grow w-100 flex-col gap-2">
            <router-link
                :to="{ name: singleRoute }" 
                class="bg-wisteria-400 text-black text-xl w-100 p-2 rounded-md text-center"
            >
                Single Player
            </router-link>

            <router-link
                :to="{ name: multiRoute }" 
                class="bg-wisteria-400 text-black text-xl w-100 p-2 rounded-md text-center"
            >
                Multiplayer
            </router-link>
        </div>

        <div class="mx-auto">
            <img :src="lovePng" class="w-64 h-auto"/>
        </div>
    </div>
</template>