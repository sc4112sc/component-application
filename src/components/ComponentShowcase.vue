<script setup lang="ts">
import { tButton, tOption } from 'SElement';
import { type ComponentItem, getComponentProps, demoData } from '../config/components';

defineProps<{
    selectedComponent: ComponentItem | null;
}>();
</script>

<template>
    <div v-if="selectedComponent" class="z-50 w-full max-w-[650px] mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        
        <!-- Tech Header -->
        <div class="relative bg-gradient-to-r from-purple-900/40 to-transparent border-l-4 border-purple-500 p-6 flex flex-col items-start overflow-hidden">
            <!-- Decorative scanline -->
            <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-400 to-transparent opacity-50"></div>
            
            <div class="text-xs font-medium tracking-[0.2em] text-purple-300/70 mb-1 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                TARGET ACQUIRED
            </div>
            <div class="text-3xl max-sm:text-2xl font-black tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                {{ selectedComponent.name }}
            </div>
            
            <!-- Decorative tech elements -->
            <div class="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 text-5xl font-black italic">
                {{ selectedComponent.name.substring(0, 2).toUpperCase() }}
            </div>
        </div>

        <!-- Component Display Area -->
        <div class="p-8 bg-gray-50 dark:bg-[#0f0f13] relative">
            <!-- Inner screen border effect -->
            <div class="absolute inset-4 ring-1 ring-black/5 dark:ring-white/10 rounded-xl pointer-events-none"></div>
            
            <div class="relative z-10 w-full flex justify-center items-center flex-col text-gray-800 dark:text-gray-200 font-sans min-h-[200px]">
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
            <div v-else-if="selectedComponent.name === 'CollapsibleTabs'" class="w-full max-w-[350px] overflow-clip mx-auto">
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
    </div>
</template>

<style scoped>
</style>
