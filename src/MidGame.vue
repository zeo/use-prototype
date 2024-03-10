<script setup lang="ts">
const { p1, p2, sum, restart } = defineProps<{
    p1: number;
    p2: number;
    sum: number;
    restart: () => void;
}>()
</script>

<template>
    <h1 style="text-align: center; margin-top: 64px;">Count to {{ sum }} apples!</h1>

    <div style="display: flex; justify-content: center;">
        <template v-for="_ in p1">
            <img style="margin-right: 8px; width: 48px; height: 48px; margin-top: auto; margin-bottom: auto;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
        </template>
    </div>

    <div style="display: flex; justify-content: center;">
        <h1 style="margin: 0; padding: 0;">+</h1>
    </div>

    <div style="display: flex; justify-content: center;">
        <template v-for="_ in p2">
            <img style="margin-right: 8px; width: 48px; height: 48px; margin-top: auto; margin-bottom: auto;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
        </template>
    </div>

    <div style="display: flex; justify-content: center;">
        <h1 v-if="p1 + p2 == sum" style="margin: 0; padding: 0; color: green">=</h1>
        <h1 v-else style="margin: 0; padding: 0; color: red">≠</h1>
    </div>

    <div style="display: flex; justify-content: center;">
        <template v-for="_ in sum">
            <img style="margin-right: 8px; width: 48px; height: 48px; margin-top: auto; margin-bottom: auto;" src="https://pngfre.com/wp-content/uploads/apple-95-270x300.png">
        </template>
    </div>

    <div style="display: flex; justify-content: center;">
        <button @click="restart">RESTART</button>
    </div>
</template>