<script setup lang="ts">
import {Ref, ref} from "vue";
import letsGoPng from "../../../assets/lets-go.png";
import checkmarkPng from "../../../assets/checkmark.png";
import perfectPng from "../../../assets/perfect.png";
import noPng from "../../../assets/no.png";
import applePng from "../../../assets/apple.png";
import { generateRandomNumberBetween } from "../../../utils/math";
import { Stack } from "../../../utils/Stack.ts"

const target = ref(generateRandomNumberBetween(4, 9));
const apples = ref(target.value + generateRandomNumberBetween(1, target.value));
const pileOne = ref(Math.floor(apples.value / 2)  + generateRandomNumberBetween(-3, 3))
const pileTwo = ref(apples.value - pileOne.value)
const pileMap = {"pileOne": pileOne, "pileTwo": pileTwo}
const addOrder = new Stack<Ref<number>>()
const selectedApples = ref(0);

const submitted = ref(false);
const isCorrect = ref<boolean | null>(null);

const addApple = (pile: Ref<number>) => {
    pile.value--;
    selectedApples.value++;
    addOrder.push(pile)
};

const removeApple = () => {
    if (addOrder.isEmpty()) { return }
    let pile = addOrder.pop()
    if (pile === undefined) { return }
    pile.value++;
    selectedApples.value--;
};

const submit = () => {
    isCorrect.value = selectedApples.value == target.value;
    submitted.value = true;
};
</script>

<template>
    <div class="min-h-screen bg-sky-blue-300 p-4 flex flex-col">
        <template v-if="!submitted">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-2">
                    <img :src="letsGoPng" class="w-24 h-auto">
                    <p class="my-auto">Count to {{ target }} apples!</p>
                </div>

                <button @click=submit>
                    <img :src="checkmarkPng" class="my-auto w-12"/>
                </button>
            </div>

            <div>
                <button
                    v-for="_ in pileOne"
                    @click="addApple(pileMap.pileOne)"
                    class=""
                >
                    <img :src="applePng" class="w-12 h-auto"/>
                </button>
            </div>

            <div>
                <button
                    v-for="_ in pileTwo"
                    @click="addApple(pileMap.pileTwo)"
                    class=""

                >
                    <img :src="applePng" class="w-12 h-auto">
                </button>
            </div>

            <div class="mt-12">
                <button
                    v-for="_ in selectedApples"
                    @click="removeApple"
                    class=""
                >
                    <img :src="applePng" class="w-12 h-auto"/>
                </button>
            </div>
        </template>

        <template v-else>
            <div class="m-auto">
                <img :src="isCorrect ? perfectPng : noPng" class="w-64 h-auto"/>
            </div>
        </template>
    </div>
</template>