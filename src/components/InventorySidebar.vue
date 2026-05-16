<script setup lang="ts">
import { useDecoderStore } from '../stores/decoderStore';

defineProps<{
    showInventory: boolean
}>();

defineEmits<{
    (e: 'update:showInventory', value: boolean): void;
    (e: 'select-component', name: string): void;
}>();

const decoderStore = useDecoderStore();
</script>

<template>
    <!-- Backdrop (Close on click outside) -->
    <div 
        v-if="showInventory" 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[190] transition-opacity duration-300"
        @click="$emit('update:showInventory', false)"
    ></div>

    <!-- Inventory Sidebar -->
    <div 
        class="fixed top-0 -left-[350px] w-[350px] max-sm:w-full max-sm:-left-full h-screen bg-[#0a0a0f]/95 border-r border-[#A29BFE] shadow-[10px_0_30px_rgba(162,155,254,0.1)] z-[200] transition-[left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col p-8 px-4 backdrop-blur-md" 
        :class="showInventory ? '!left-0 max-sm:!left-0' : ''"
    >
        <div class="flex justify-between items-center border-b border-[#333] pb-4 mb-4">
            <h3 class="m-0 text-2xl text-white [text-shadow:0_0_5px_currentColor]">INVENTORY</h3>
            <button class="bg-transparent border-none text-[#ff0055] text-3xl cursor-pointer leading-none p-0" @click="$emit('update:showInventory', false)">×</button>
        </div>
        
        <div class="flex-1 overflow-y-auto sidebar-scroll">
            <div class="log-list">
                <div v-if="decoderStore.history.length === 0" class="text-[#555] text-center mt-8 italic">NO LOGS FOUND</div>
                <div 
                    v-for="item in decoderStore.history" 
                    :key="item.id" 
                    class="flex items-center p-3 border border-[#333] mb-2 cursor-pointer transition-all duration-200 bg-black/50 hover:border-[#A29BFE] hover:bg-[rgba(162,155,254,0.1)]"
                    @click="$emit('select-component', item.name)"
                >
                    <span class="text-[#555] text-xs mr-4">{{ new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) }}</span>
                    <span class="font-bold" :style="{ color: item.color }">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-scroll::-webkit-scrollbar {
    width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
    background: #A29BFE;
}
</style>
