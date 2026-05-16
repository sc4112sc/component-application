<script setup lang="ts">
import { ref, shallowRef, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDecoderStore } from '../stores/decoderStore';
import { components, type ComponentItem } from '../config/components';
import InventorySidebar from '../components/InventorySidebar.vue';
import DecoderBox from '../components/DecoderBox.vue';
import ComponentShowcase from '../components/ComponentShowcase.vue';

const router = useRouter();
const decoderStore = useDecoderStore();

const showInventory = ref(false);
const isDecoding = ref(false);
const decodingText = ref('READY');
const selectedComponent = shallowRef<ComponentItem | null>(null);

const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
let decodeInterval: any = null;

const navigateToComponentPage = (name: string) => {
    const comp = components.find(c => c.name === name);
    if (comp) {
        let routePath = comp.route;
        // Fix routes for tabs which share the same page
        if (name === 'RoundedTabs' || name === 'CollapsibleTabs') {
            routePath = '/tabs';
        }
        router.push('/s/element' + routePath);
    }
};

const handleStartDecode = () => {
    if (isDecoding.value) return;

    isDecoding.value = true;
    selectedComponent.value = null; // Hide result during decode
    
    let duration = 0;
    const maxDuration = 30; // Reduced total cycles for faster decode
    
    // Random component selection
    const targetIndex = Math.floor(Math.random() * components.length);
    const targetComponent = components[targetIndex];

    clearInterval(decodeInterval);

    decodeInterval = setInterval(() => {
        duration++;
        
        // Generate random glitch text
        let randomText = '';
        const len = Math.floor(Math.random() * 5) + 5;
        for (let i = 0; i < len; i++) {
            randomText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
        }
        decodingText.value = randomText;

        // Occasionally show real component names for effect
        if (duration % 5 === 0) {
             const randomComp = components[Math.floor(Math.random() * components.length)];
             decodingText.value = randomComp.name.toUpperCase();
        }

        if (duration >= maxDuration) {
            clearInterval(decodeInterval);
            isDecoding.value = false;
            decodingText.value = targetComponent.name.toUpperCase();
            selectedComponent.value = targetComponent;
            decoderStore.addHistory(targetComponent.name, targetComponent.color);
        }

    }, 30); // Fast update
};

onUnmounted(() => {
    clearInterval(decodeInterval);
});

const goToElementSystem = () => {
    router.push('/s/element');
};
</script>

<template>
    <div class="min-h-screen w-screen bg-[#050505] text-[#A29BFE] font-['Share_Tech_Mono',_monospace] flex flex-col items-center p-8 max-sm:p-4 relative overflow-x-clip" :class="{ 'sidebar-open': showInventory }">
        <!-- Background Effects -->
        <div class="absolute w-[200%] h-[200%] bg-[linear-gradient(rgba(162,155,254,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(162,155,254,0.1)_1px,transparent_1px)] bg-[length:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] z-0 animate-[gridMove_20s_linear_infinite]"></div>
        <div class="fixed inset-0 w-screen h-screen bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px] z-[100] pointer-events-none opacity-60"></div>

        <button class="cyber-btn fixed top-8 max-sm:top-4 left-8 max-sm:left-4 p-1.5 sm:px-3 sm:py-2 max-sm:w-10 max-sm:h-10 flex items-center justify-center gap-2 text-sm z-[100]" @click="showInventory = !showInventory">
            <span class="relative z-10 text-xl leading-none mt-[2px] max-sm:mt-0">☰</span>
            <span class="relative z-10 max-sm:hidden">INVENTORY [{{ decoderStore.history.length }}]</span>
            <span class="btn-glitch"></span>
        </button>

        <button class="cyber-btn fixed top-8 max-sm:top-4 right-8 max-sm:right-4 p-1.5 sm:px-3 sm:py-2 max-sm:w-10 max-sm:h-10 flex items-center justify-center gap-2 text-sm z-[100]" @click="goToElementSystem">
            <span class="relative z-10 max-sm:hidden">ELEMENT SYSTEM</span>
            <span class="relative z-10 text-xl leading-none mt-[2px] max-sm:mt-0">⊞</span>
            <span class="btn-glitch"></span>
        </button>

        <InventorySidebar 
            :show-inventory="showInventory" 
            @update:show-inventory="showInventory = $event"
            @select-component="navigateToComponentPage"
        />

        <div class="z-10 text-center mt-12 mb-8 w-full px-4">
            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white [text-shadow:3px_3px_0px_#ff0055,-3px_-3px_0px_#A29BFE] tracking-[6px] max-sm:tracking-[3px] m-0 relative cyber-title leading-tight" data-text="COMPONENT LIBRARY DECODER">COMPONENT LIBRARY DECODER</h1>
            <p class="mt-2 text-2xl max-sm:text-xl tracking-[4px] text-[#55EFC4] animate-[textFlicker_3s_infinite]">v1.0</p>
        </div>

        <DecoderBox 
            :is-decoding="isDecoding"
            :decoding-text="decodingText"
            @start-decode="handleStartDecode"
        />

        <ComponentShowcase 
            :selected-component="selectedComponent" 
        />
    </div>
</template>

<style scoped>
.cyber-title::before,
.cyber-title::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #050505;
}

.cyber-title::before {
    left: 2px;
    text-shadow: -2px 0 #ff0055;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

.cyber-title::after {
    left: -2px;
    text-shadow: -2px 0 #00ffff;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
}
</style>
