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
    <div class="cyber-container" :class="{ 'sidebar-open': showInventory }">
        <!-- Background Effects -->
        <div class="cyber-grid"></div>
        <div class="scanlines"></div>

        <button class="cyber-btn nav-btn-left" @click="showInventory = !showInventory">
            <span class="btn-content desktop-text">INVENTORY [{{ decoderStore.history.length }}]</span>
            <span class="btn-content mobile-text">☰</span>
            <span class="btn-glitch"></span>
        </button>

        <button class="cyber-btn nav-btn" @click="goToElementSystem">
            <span class="btn-content desktop-text">ELEMENT SYSTEM</span>
            <span class="btn-content mobile-text">⊞</span>
            <span class="btn-glitch"></span>
        </button>

        <InventorySidebar 
            :show-inventory="showInventory" 
            @update:show-inventory="showInventory = $event"
            @select-component="navigateToComponentPage"
        />

        <div class="header-section">
            <h1 class="cyber-title" data-text="COMPONENT LIBRARY DECODER">COMPONENT LIBRARY DECODER</h1>
            <p class="cyber-subtitle">v1.0</p>
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
.cyber-container {
    min-height: 100vh;
    width: 100vw;
    background-color: #050505;
    color: #A29BFE;
    font-family: 'Share Tech Mono', monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    position: relative;
    overflow-x: clip;
}

/* Background Effects */
.cyber-grid {
    position: absolute;
    width: 200%;
    height: 200%;
    background-image: 
        linear-gradient(rgba(162, 155, 254, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(162, 155, 254, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
    z-index: 0;
    animation: gridMove 20s linear infinite;
}

.scanlines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        to bottom,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.2) 50%,
        rgba(0,0,0,0.2)
    );
    background-size: 100% 4px;
    z-index: 100;
    pointer-events: none;
    opacity: 0.6;
}

.header-section {
    z-index: 2;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 2rem;
}

.cyber-title {
    font-size: 2.5rem;
    color: #fff;
    text-shadow: 2px 2px 0px #ff0055, -2px -2px 0px #A29BFE;
    letter-spacing: 4px;
    margin: 0;
    position: relative;
    animation: glitch-anim 1s infinite alternate;
}

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

.cyber-subtitle {
    margin-top: 1rem;
    font-size: 1.2rem;
    letter-spacing: 2px;
    color: #55EFC4;
    animation: textFlicker 3s infinite;
}

/* Nav Buttons */
.nav-btn {
    position: fixed;
    top: 2rem;
    bottom: auto;
    right: 2rem;
    left: auto;
    transform: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn-left {
    position: fixed;
    top: 2rem;
    left: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Animation Keyframes */
@keyframes gridMove {
    0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px); }
    100% { transform: perspective(500px) rotateX(60deg) translateY(40px) translateZ(-200px); }
}

@keyframes glitch-anim {
    0% { clip: rect(20px, 9999px, 15px, 0); }
    20% { clip: rect(50px, 9999px, 80px, 0); }
    40% { clip: rect(10px, 9999px, 85px, 0); }
    60% { clip: rect(60px, 9999px, 20px, 0); }
    80% { clip: rect(5px, 9999px, 60px, 0); }
    100% { clip: rect(35px, 9999px, 45px, 0); }
}

@keyframes glitch-anim2 {
    0% { clip: rect(25px, 9999px, 40px, 0); }
    20% { clip: rect(75px, 9999px, 5px, 0); }
    40% { clip: rect(15px, 9999px, 30px, 0); }
    60% { clip: rect(85px, 9999px, 95px, 0); }
    80% { clip: rect(45px, 9999px, 10px, 0); }
    100% { clip: rect(55px, 9999px, 25px, 0); }
}

@keyframes textFlicker {
    0% { opacity: 0.8; }
    50% { opacity: 1; text-shadow: 2px 0 #ff0055, -2px 0 #A29BFE; }
    100% { opacity: 0.9; }
}

.mobile-text {
    display: none;
}

/* Adjust mobile styles */
@media (max-width: 600px) {
    .cyber-title {
        font-size: 1.8rem;
    }
    .nav-btn {
        top: 1rem;
        bottom: auto;
        right: 1rem;
        left: auto;
        transform: none;
        padding: 0.5rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cyber-container {
        padding: 1rem;
    }
    
    .nav-btn-left {
        top: 1rem;
        bottom: auto;
        left: 1rem;
        padding: 0.5rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .desktop-text {
        display: none;
    }
    
    .mobile-text {
        display: inline-block !important;
        font-size: 1.5rem;
        line-height: 1;
        margin-top: 2px;
    }
}
</style>
