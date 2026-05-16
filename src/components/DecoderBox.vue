<script setup lang="ts">
defineProps<{
    isDecoding: boolean;
    decodingText: string;
}>();

defineEmits<{
    (e: 'start-decode'): void;
}>();
</script>

<template>
    <div class="decoder-wrapper">
        <!-- Status Indicators -->
        <div class="status-bar">
            <span class="status-item">NET: <span class="active">ONLINE</span></span>
            <span class="status-item">SEC: <span class="active">SECURE</span></span>
            <span class="status-item">CPU: <span class="random-val">98%</span></span>
        </div>

        <!-- Main Decoder Box -->
        <div class="decoder-box" :class="{ 'decoding': isDecoding }">
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-left"></div>
            <div class="corner bottom-right"></div>
            
            <div class="decoder-screen">
                <div class="glitch-text" :data-text="decodingText">{{ decodingText }}</div>
            </div>
        </div>

        <button class="cyber-btn" @click="$emit('start-decode')" :disabled="isDecoding">
            <span class="btn-content">{{ isDecoding ? 'DECODING...' : 'INITIATE DECODE' }}</span>
            <span class="btn-glitch"></span>
        </button>
    </div>
</template>

<style scoped>
.decoder-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    z-index: 2;
}

.status-bar {
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: #555;
}

.status-item .active {
    color: #55EFC4;
    text-shadow: 0 0 5px #55EFC4;
}

.status-item .random-val {
    color: #FDCB6E;
    animation: textFlicker 2s infinite;
}

.decoder-box {
    position: relative;
    width: 300px;
    height: 100px;
    border: 2px solid #333;
    background: rgba(10, 10, 15, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(162, 155, 254, 0.1);
}

.decoder-box.decoding {
    border-color: #ff0055;
    box-shadow: 0 0 20px rgba(255, 0, 85, 0.3);
}

.corner {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 2px solid #A29BFE;
    transition: all 0.3s;
}

.decoding .corner {
    border-color: #ff0055;
}

.top-left { top: -2px; left: -2px; border-right: none; border-bottom: none; }
.top-right { top: -2px; right: -2px; border-left: none; border-bottom: none; }
.bottom-left { bottom: -2px; left: -2px; border-right: none; border-top: none; }
.bottom-right { bottom: -2px; right: -2px; border-left: none; border-top: none; }

.decoder-screen {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.glitch-text {
    position: relative;
    animation: textFlicker 0.1s infinite;
}

@keyframes textFlicker {
    0% { opacity: 0.8; }
    50% { opacity: 1; text-shadow: 2px 0 #ff0055, -2px 0 #A29BFE; }
    100% { opacity: 0.9; }
}

@media (max-width: 600px) {
    .decoder-screen {
        font-size: 1.5rem;
    }
}
</style>
