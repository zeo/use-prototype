<template>
    <div class="h-screen">
        <div class="h-1/2 rotate-180 border-t-[1px] border-dashed border-black">
            <slot name="one"></slot>
        </div>

        <div class="h-1/2  border-t-[1px] border-dashed border-black">
            <slot name="two"></slot>
        </div>
    </div>
</template>