<script setup lang="ts">
import { tButton, tOption } from 'SElement';
import { type ComponentItem, getComponentProps, demoData } from '../config/components';

defineProps<{
    selectedComponent: ComponentItem | null;
}>();
</script>

<template>
    <div v-if="selectedComponent" class="result-section cyber-result">
        <div class="result-header" style="text-align: center;">
            <div class="result-label">TARGET ACQUIRED</div>
            <div class="result-name" :style="{ color: selectedComponent.color, borderColor: selectedComponent.color }">
                {{ selectedComponent.name }}
            </div>
        </div>

        <div class="component-demo-wrapper">
            <div v-if="selectedComponent.name === 'Modal'" class="flex flex-col items-center gap-4">
                <t-button type="primary" @click="demoData.modalVisible = true">開啟 Modal</t-button>
                <component
                    :is="selectedComponent.component"
                    v-bind="getComponentProps(selectedComponent)"
                >
                    <div class="p-4">這是 Modal 的內容區域</div>
                    <template #footer>
                        <div class="flex justify-end gap-2 p-2">
                            <t-button type="secondary" @click="demoData.modalVisible = false">取消</t-button>
                            <t-button type="primary" @click="demoData.modalVisible = false">確定</t-button>
                        </div>
                    </template>
                </component>
            </div>
            <div v-else-if="selectedComponent.name === 'CollapsibleTabs'" style="width: 100%; max-width: 350px; overflow: clip; margin: 0 auto;">
                <component
                    :is="selectedComponent.component"
                    v-bind="getComponentProps(selectedComponent)"
                />
            </div>
            <component
                v-else
                :is="selectedComponent.component"
                v-bind="getComponentProps(selectedComponent)"
            >
                <template v-if="selectedComponent.name === 'Button'">
                    {{ selectedComponent.name }} 按鈕
                </template>
                <template v-else-if="selectedComponent.name === 'Tag'">
                    {{ selectedComponent.name }} 標籤
                </template>
                <template v-else-if="selectedComponent.name === 'Link'">
                    {{ selectedComponent.name }} 連結
                </template>
                <template v-else-if="selectedComponent.name === 'Tooltip'">
                    <span>懸停查看提示</span>
                </template>
                <template v-else-if="selectedComponent.name === 'Badge'">
                    <span>徽章內容</span>
                </template>
                <template v-else-if="selectedComponent.name === 'Affix'">
                    <span>固定元素</span>
                </template>
                <template v-else-if="selectedComponent.name === 'Select'">
                    <t-option :options="[
                        {value: '1', label: '選項 1'},
                        {value: '2', label: '選項 2'},
                        {value: '3', label: '選項 3'}
                    ]" />
                </template>
                <template v-else-if="selectedComponent.name === 'Checkbox'">
                    <span>核取方塊選項</span>
                </template>
                <template v-else-if="selectedComponent.name === 'Radio'">
                    <span>單選按鈕</span>
                </template>
            </component>
        </div>
    </div>
</template>

<style scoped>
/* Result Section */
.cyber-result {
    z-index: 2;
    background: rgba(16, 16, 20, 0.9);
    border: 1px solid #A29BFE;
    box-shadow: 0 0 30px rgba(162, 155, 254, 0.1);
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    margin-top: 1rem;
    position: relative;
}

.result-header {
    border-bottom: 1px solid #333;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    text-align: center;
}

.result-label {
    font-size: 0.8rem;
    color: #555;
    margin-bottom: 0.5rem;
}

.result-name {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0 0 10px currentColor;
    border: 1px solid;
    padding: 0.5rem 1rem;
    display: inline-block;
}

.component-info {
    font-size: 0.9rem;
    color: #aaa;
    margin-bottom: 2rem;
    text-align: center;
}

.path-text {
    color: #ff0055;
}

.component-demo-wrapper {
    background: #fff; /* Components need light bg usually */
    padding: 2rem;
    border-radius: 4px;
    color: #333; /* Reset text color for demo */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; /* Reset font */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

@media (max-width: 600px) {
    .result-name {
        font-size: 1.5rem;
    }
}
</style>
