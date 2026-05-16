<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { setDarkMode } from 'SElement';

const route = useRoute();
const router = useRouter();

const showHomeButton = computed(() => route.path !== '/' && route.path !== '/roulette');

const goHome = () => {
    router.push('/');
};

setDarkMode(true);
</script>

<template>
    <RouterView />
    
    <button v-if="showHomeButton" class="cyber-btn global-home-btn" @click="goHome">
        <span class="btn-content">RETURN CONNECT</span>
        <span class="btn-glitch"></span>
    </button>
</template>

<style>
.global-home-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: rgba(5, 5, 5, 0.8);
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
