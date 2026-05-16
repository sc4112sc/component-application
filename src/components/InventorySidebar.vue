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
    <!-- Inventory Sidebar -->
    <div class="inventory-sidebar" :class="{ 'is-open': showInventory }">
        <div class="sidebar-header">
            <h3>INVENTORY</h3>
            <button class="close-btn" @click="$emit('update:showInventory', false)">×</button>
        </div>
        
        <div class="sidebar-content">
            <div class="log-list">
                <div v-if="decoderStore.history.length === 0" class="empty-state">NO LOGS FOUND</div>
                <div 
                    v-for="item in decoderStore.history" 
                    :key="item.id" 
                    class="log-item"
                    @click="$emit('select-component', item.name)"
                >
                    <span class="log-time">{{ new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) }}</span>
                    <span class="log-name" :style="{ color: item.color }">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.inventory-sidebar {
    position: fixed;
    top: 0;
    left: -350px;
    width: 350px;
    height: 100vh;
    background: rgba(10, 10, 15, 0.95);
    border-right: 1px solid #A29BFE;
    box-shadow: 10px 0 30px rgba(162, 155, 254, 0.1);
    z-index: 200;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    backdrop-filter: blur(10px);
}

.inventory-sidebar.is-open {
    left: 0;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.sidebar-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #fff;
    text-shadow: 0 0 5px currentColor;
}

.close-btn {
    background: none;
    border: none;
    color: #ff0055;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    padding: 0;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
}

.sidebar-content::-webkit-scrollbar {
    width: 4px;
}

.sidebar-content::-webkit-scrollbar-thumb {
    background: #A29BFE;
}

.empty-state {
    color: #555;
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
}

.log-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border: 1px solid #333;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.5);
}

.log-item:hover {
    border-color: #A29BFE;
    background: rgba(162, 155, 254, 0.1);
}

.log-time {
    color: #555;
    font-size: 0.8rem;
    margin-right: 1rem;
}

.log-name {
    font-weight: bold;
}

@media (max-width: 600px) {
    .inventory-sidebar {
        width: 100%;
        left: -100%;
    }
}
</style>
