<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const showHomeButton = computed(() => route.path !== '/' && route.path !== '/roulette');

const goHome = () => {
    router.push('/');
};
</script>

<template>
    <RouterView />
    
    <button v-if="showHomeButton" class="cyber-btn global-home-btn" @click="goHome">
        <span class="btn-content">RETURN CONNECT</span>
        <span class="btn-glitch"></span>
    </button>
</template>

<style>
/* Global Cyberpunk Button Styles */
.cyber-btn {
    background: transparent;
    border: 1px solid #A29BFE;
    color: #A29BFE;
    padding: 1rem 2rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.cyber-btn:hover:not(:disabled) {
    background: rgba(162, 155, 254, 0.1);
    box-shadow: 0 0 15px #A29BFE;
    text-shadow: 0 0 5px #A29BFE;
}

.cyber-btn .btn-content {
    position: relative;
    z-index: 1;
}

.cyber-btn .btn-glitch {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #A29BFE;
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 0;
    opacity: 0.1;
}

.cyber-btn:hover .btn-glitch {
    transform: translateX(0);
}

.global-home-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: rgba(5, 5, 5, 0.8); /* Ensure visibility over content */
    backdrop-filter: blur(4px);
}

@media (max-width: 600px) {
    .global-home-btn {
        bottom: 1rem;
        right: 1rem;
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
}
</style>
