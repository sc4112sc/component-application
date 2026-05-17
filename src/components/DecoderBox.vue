<script setup lang="ts">
import { useNetwork, useFps, useMouse, useNow, useDateFormat } from '@vueuse/core';

defineProps<{
    isDecoding: boolean;
    decodingText: string;
}>();

defineEmits<{
    (e: 'start-decode'): void;
}>();

// VueUse Data
const { isOnline, downlink } = useNetwork();
const fps = useFps();
const { x, y } = useMouse();
const now = useNow();
const formattedTime = useDateFormat(now, 'HH:mm:ss');
</script>

<template>
    <div class="flex flex-col items-center gap-8 z-20">
        <!-- Status Indicators -->
        <div class="flex flex-wrap justify-center gap-4 sm:gap-8 text-[0.7rem] sm:text-[0.9rem] text-[#555] w-full max-w-[400px]">
            <span>NET: <span :class="isOnline ? 'text-[#55EFC4] [text-shadow:0_0_5px_#55EFC4]' : 'text-rose-500 [text-shadow:0_0_5px_#f43f5e] animate-pulse'">{{ isOnline ? 'ON / ' + (downlink || '--') + 'M' : 'OFFLINE' }}</span></span>
            <span>FPS: <span class="text-[#FDCB6E] [text-shadow:0_0_5px_#FDCB6E]">{{ fps }}</span></span>
            <span class="max-sm:hidden">POS: <span class="text-[#74b9ff] [text-shadow:0_0_5px_#74b9ff]">{{ Math.round(x) }},{{ Math.round(y) }}</span></span>
            <span>SYS: <span class="text-[#A29BFE] [text-shadow:0_0_5px_#A29BFE] animate-[textFlicker_3s_infinite]">{{ formattedTime }}</span></span>
        </div>

        <!-- Main Decoder Box (Redesigned) -->
        <div 
            class="relative w-[320px] h-[120px] rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden backdrop-blur-md border-2"
            :class="isDecoding ? 'border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6)] bg-gradient-to-b from-rose-950/40 to-black' : 'border-[#A29BFE]/50 shadow-[0_0_30px_rgba(162,155,254,0.2)] bg-gradient-to-b from-purple-900/20 to-black'"
        >
            <!-- Scanning line effect -->
            <div class="absolute inset-0 w-full h-[2px] bg-white/20 animate-[gridMove_2s_linear_infinite] opacity-50" v-if="isDecoding"></div>
            
            <div 
                class="text-[2.5rem] max-sm:text-[2rem] font-bold tracking-widest min-h-[3.5rem] flex items-center justify-center transition-colors duration-300"
                :class="isDecoding ? 'text-rose-500 [text-shadow:0_0_15px_#f43f5e]' : 'text-[#A29BFE] [text-shadow:0_0_15px_rgba(162,155,254,0.5)]'"
            >
                <div class="relative animate-[textFlicker_0.1s_infinite] uppercase" :data-text="decodingText">{{ decodingText }}</div>
            </div>
        </div>

        <button 
            class="relative flex flex-col items-center gap-6 group cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none" 
            @click="$emit('start-decode')" 
            :disabled="isDecoding"
        >
            <!-- Triple Cascading Chevrons -->
            <div class="flex flex-col items-center -gap-2">
                <!-- Chevron 1 (Top) -->
                <div 
                    class="w-16 h-8 transition-all duration-300"
                    :class="[
                        isDecoding ? 'text-rose-500' : 'text-[#A29BFE] opacity-40 group-hover:opacity-100 group-hover:translate-y-1',
                        !isDecoding && 'animate-[textFlicker_2s_infinite]'
                    ]"
                >
                    <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-current stroke-2">
                        <path d="M2 2L12 10L22 2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <!-- Chevron 2 (Middle) -->
                <div 
                    class="w-16 h-8 transition-all duration-300 -mt-4"
                    :class="[
                        isDecoding ? 'text-rose-500 delay-75' : 'text-[#A29BFE] opacity-60 group-hover:opacity-100 group-hover:translate-y-2',
                        !isDecoding && 'animate-[textFlicker_2s_infinite_100ms]'
                    ]"
                >
                    <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-current stroke-2">
                        <path d="M2 2L12 10L22 2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <!-- Chevron 3 (Bottom) -->
                <div 
                    class="w-16 h-8 transition-all duration-300 -mt-4"
                    :class="[
                        isDecoding ? 'text-rose-500 delay-150' : 'text-[#A29BFE] group-hover:text-white group-hover:translate-y-3',
                        !isDecoding && 'animate-[textFlicker_2s_infinite_200ms]'
                    ]"
                >
                    <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-current stroke-2">
                        <path d="M2 2L12 10L22 2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>

            <!-- Action Text -->
            <div class="flex flex-col items-center">
                <span 
                    class="text-[0.7rem] font-bold tracking-[0.6em] transition-all duration-300"
                    :class="isDecoding ? 'text-rose-400 animate-pulse' : 'text-[#A29BFE] opacity-60 group-hover:opacity-100'"
                >
                    {{ isDecoding ? 'DECODING...' : 'TAP TO DECODE' }}
                </span>
                <div class="mt-2 w-8 h-[1px] bg-[#A29BFE]/30 group-hover:w-20 group-hover:bg-[#A29BFE] transition-all duration-500"></div>
            </div>

        </button>
    </div>
</template>

<style scoped>
</style>
