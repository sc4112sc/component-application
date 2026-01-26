<script setup lang="ts">
import { ref, shallowRef, reactive, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Component } from 'vue';
import {
    tButton,
    tInput,
    tSelect,
    tCheckbox,
    tRadio,
    tSwitch,
    tTag,
    tBadge,
    tAvatar,
    tLink,
    tPagination,
    tTimePicker,
    tTooltip,
    tAffix,
    tTabs,
    tRoundedTabs,
    tCollapsibleTabs,
    tModal,
    tTransfer,
    tTree,
    tOption,
} from 'SElement';

interface ComponentItem {
    name: string;
    component: Component;
    color: string;
    route: string;
    demoProps?: Record<string, any>;
}

const vibrantColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FF8FA3', '#6C5CE7', '#00B894', '#FDCB6E', '#E17055',
    '#74B9FF', '#A29BFE', '#FD79A8', '#FFEAA7', '#DFE6E9',
    '#55EFC4', '#81ECEC'
];

// Reactive data for component demos
const demoData = reactive({
    inputValue: '示例輸入',
    selectValue: '1',
    checkboxValue: true,
    radioValue: true,
    switchValue: true,
    timeValue: '09:00-18:00',
    colorValue: '#409EFF',
    activeTab: 'first',
    activeRoundedTab: 'first',
    activeCollapsibleTab: 'first',
    paginationPage: 1,
    leftList: [
        { id: '1', name: '選項 1', groupId: '1', level: 0, isCheck: false, groupRelation: ['1'] },
        { id: '2', name: '選項 2', groupId: '1', level: 0, isCheck: false, groupRelation: ['1'] },
        { id: '3', name: '選項 3', groupId: '1', level: 0, isCheck: false, groupRelation: ['1'] },
    ],
    rightList: [
        { id: '4', name: '選項 4', groupId: '1', level: 0, isCheck: false, groupRelation: ['1'] },
    ],
    treeGroupList: [
        { groupId: '1', name: '群組 1', level: 0, isOpen: true, isCheck: false, children: [], groupRelation: [] },
        { groupId: '2', name: '群組 2', level: 0, isOpen: true, isCheck: false, children: [], groupRelation: [] },
    ],
    treeItemList: [
        { id: '1', name: '項目 1', groupId: '1', level: 1, isCheck: false, groupRelation: ['1'] },
        { id: '2', name: '項目 2', groupId: '1', level: 1, isCheck: false, groupRelation: ['1'] },
        { id: '3', name: '項目 3', groupId: '2', level: 1, isCheck: false, groupRelation: ['2'] },
    ],
    modalVisible: false,
});

const tabsData = [
    { name: 'first', label: '頁籤1', icon: 'icon-list-linear', redDot: false, unread: 0 },
    { name: 'second', label: '頁籤2', icon: 'icon-messages-linear', redDot: false, unread: 3 },
    { name: 'third', label: '頁籤3', icon: 'icon-hall-linear', redDot: true, unread: 0, disabled: true },
];



const components: ComponentItem[] = [
    { 
        name: 'Button', 
        component: tButton, 
        color: vibrantColors[0],
        route: '/button',
        demoProps: { type: 'primary' } 
    },
    { 
        name: 'Input', 
        component: tInput, 
        color: vibrantColors[1],
        route: '/input',
    },
    { 
        name: 'Select', 
        component: tSelect, 
        color: vibrantColors[2],
        route: '/select',
    },
    { 
        name: 'Checkbox', 
        component: tCheckbox, 
        color: vibrantColors[3],
        route: '/checkbox',
    },
    { 
        name: 'Radio', 
        component: tRadio, 
        color: vibrantColors[4],
        route: '/radio',
    },
    { 
        name: 'Switch', 
        component: tSwitch, 
        color: vibrantColors[5],
        route: '/switch',
    },
    { 
        name: 'Tag', 
        component: tTag, 
        color: vibrantColors[6],
        route: '/tag',
        demoProps: { type: 'primary' } 
    },
    { 
        name: 'Badge', 
        component: tBadge, 
        color: vibrantColors[7],
        route: '/badge',
        demoProps: { value: 5 } 
    },
    { 
        name: 'Avatar', 
        component: tAvatar, 
        color: vibrantColors[8],
        route: '/avatar',
        demoProps: { size: 'large' } 
    },
    { 
        name: 'Link', 
        component: tLink, 
        color: vibrantColors[10],
        route: '/link',
        demoProps: { type: 'primary' } 
    },
    { 
        name: 'Pagination', 
        component: tPagination, 
        color: vibrantColors[11],
        route: '/pagination',
    },
    { 
        name: 'TimePicker', 
        component: tTimePicker, 
        color: vibrantColors[12],
        route: '/timepicker',
    },
    { 
        name: 'Tooltip', 
        component: tTooltip, 
        color: vibrantColors[13],
        route: '/tooltip',
        demoProps: { content: '這是提示內容' } 
    },
    { 
        name: 'Affix', 
        component: tAffix, 
        color: vibrantColors[14],
        route: '/affix',
        demoProps: {} 
    },
    { 
        name: 'Tabs', 
        component: tTabs, 
        color: vibrantColors[15],
        route: '/tabs',
    },
    { 
        name: 'RoundedTabs', 
        component: tRoundedTabs, 
        color: vibrantColors[16],
        route: '/roundedtabs',
    },
    { 
        name: 'CollapsibleTabs', 
        component: tCollapsibleTabs, 
        color: vibrantColors[17],
        route: '/collapsibletabs',
    },
    { 
        name: 'Modal',  
        component: tModal, 
        color: vibrantColors[19],
        route: '/modal',
        demoProps: {} 
    },
    { 
        name: 'Transfer', 
        component: tTransfer, 
        color: vibrantColors[20],
        route: '/transfer',
    },
    { 
        name: 'Tree', 
        component: tTree, 
        color: vibrantColors[21],
        route: '/tree',
        demoProps: {} 
    },
];

const selectedComponent = shallowRef<ComponentItem | null>(null);
const isDecoding = ref(false);
const decodingText = ref('READY');
const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
let decodeInterval: any = null;

// Helper to get reactive props
const getComponentProps = (item: ComponentItem) => {
    switch (item.name) {
        case 'Input':
            return { 
                modelValue: demoData.inputValue, 
                'onUpdate:modelValue': (val: string) => demoData.inputValue = val, 
                placeholder: '請輸入內容' 
            };
        case 'Select':
            return {
                 modelValue: demoData.selectValue,
                 'onUpdate:modelValue': (val: string) => demoData.selectValue = val,
                 placeholder: '請選擇'
            };
        case 'Checkbox':
            return {
                checked: demoData.checkboxValue,
                'onUpdate:checked': (val: boolean) => demoData.checkboxValue = val
            };
        case 'Radio':
            return {
                checked: demoData.radioValue,
                'onUpdate:checked': (val: boolean) => demoData.radioValue = val
            };
        case 'Switch':
            return {
                modelValue: demoData.switchValue,
                'onUpdate:modelValue': (val: boolean) => demoData.switchValue = val
            };
         case 'Pagination':
            return {
                total: 100,
                current: demoData.paginationPage,
                onChange: (val: number) => demoData.paginationPage = val
            };
         case 'TimePicker':
            return {
                modelValue: demoData.timeValue,
                'onUpdate:modelValue': (val: string) => demoData.timeValue = val
            };
         case 'Tabs':
            return {
                modelValue: demoData.activeTab,
                'onUpdate:modelValue': (val: string) => demoData.activeTab = val,
                tabs: tabsData
            };
         case 'RoundedTabs':
             return {
                modelValue: demoData.activeRoundedTab,
                'onUpdate:modelValue': (val: string) => demoData.activeRoundedTab = val,
                tabs: tabsData
             }
         case 'CollapsibleTabs':
              return {
                modelValue: demoData.activeCollapsibleTab,
                'onUpdate:modelValue': (val: string) => demoData.activeCollapsibleTab = val,
                tabs: tabsData
              }
         case 'Transfer':
              return {
                 leftList: demoData.leftList,
                 'onUpdate:leftList': (val: any[]) => demoData.leftList = val,
                 rightList: demoData.rightList,
                 'onUpdate:rightList': (val: any[]) => demoData.rightList = val,
                 leftTitle: '來源列表',
                 rightTitle: '目標列表',
                 leftPlaceholder: '搜尋來源',
                 rightPlaceholder: '搜尋目標'
              }
         case 'Tree':
              return {
                 itemList: demoData.treeItemList,
                 groupList: demoData.treeGroupList,
                 type: 'treeview',
                 isCheck: false,
                 isEdit: false
              }
         case 'Modal':
             return {
                 show: demoData.modalVisible,
                 title: '範例 Modal',
                 onClose: () => demoData.modalVisible = false,
             }
        default:
            return item.demoProps || {};
    }
};

const startDecode = () => {
    if (isDecoding.value) return;

    isDecoding.value = true;
    selectedComponent.value = null; // Hide result during decode
    
    let duration = 0;
    const maxDuration = 150; // Total cycles before stop
    
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
        }

    }, 30); // Fast update
};

onUnmounted(() => {
    clearInterval(decodeInterval);
});

const router = useRouter();
const goToElementSystem = () => {
    router.push('/s/element');
};

</script>

<template>
    <div class="cyber-container">
        <!-- Background Effects -->
        <div class="cyber-grid"></div>
        <div class="scanlines"></div>

        <button class="cyber-btn nav-btn" @click="goToElementSystem">
            <span class="btn-content">ELEMENT SYSTEM</span>
            <span class="btn-glitch"></span>
        </button>

        <div class="header-section">
            <h1 class="cyber-title" data-text="SYSTEM DETECTED">SYSTEM DETECTED</h1>
            <p class="cyber-subtitle">COMPONENT DECODER v1.0</p>
        </div>

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

            <button class="cyber-btn" @click="startDecode" :disabled="isDecoding">
                <span class="btn-content">{{ isDecoding ? 'DECODING...' : 'INITIATE DECODE' }}</span>
                <span class="btn-glitch"></span>
            </button>
        </div>

        <div v-if="selectedComponent" class="result-section cyber-result">
            <div class="result-header">
                <div class="result-label">TARGET ACQUIRED</div>
                <div class="result-name" :style="{ color: selectedComponent.color, borderColor: selectedComponent.color }">
                    {{ selectedComponent.name }}
                </div>
            </div>
            
            <div class="component-info">
                 <p>PATH: <span class="path-text">{{ selectedComponent.route }}</span></p>
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
                <div v-else-if="selectedComponent.name === 'CollapsibleTabs'" style="width: 100%; max-width: 350px; overflow: hidden; margin: 0 auto;">
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
    overflow-x: hidden;
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
    text-shadow: -1px 0 #ff0055;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

.cyber-title::after {
    left: -2px;
    text-shadow: -1px 0 #A29BFE;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
}

.cyber-subtitle {
    color: #ff0055;
    letter-spacing: 2px;
    font-size: 1rem;
    margin-top: 0.5rem;
    text-transform: uppercase;
}

/* Decoder Box */
.decoder-wrapper {
    z-index: 2;
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.status-bar {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #555;
}

.status-item .active {
    color: #A29BFE;
    text-shadow: 0 0 5px #A29BFE;
}

.decoder-box {
    position: relative;
    border: 1px solid #333;
    background: rgba(10, 10, 15, 0.8);
    padding: 3rem 1rem;
    text-align: center;
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

/* Button */
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

.cyber-btn:disabled {
    border-color: #333;
    color: #555;
    cursor: not-allowed;
}

.nav-btn {
    position: fixed;
    top: auto;
    bottom: 2rem;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    z-index: 100;
}

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

/* Mobile Adjustments */
@media (max-width: 600px) {
    .cyber-title {
        font-size: 1.8rem;
    }
    .decoder-screen {
        font-size: 1.5rem;
    }
    .result-name {
        font-size: 1.5rem;
    }
    .nav-btn {
        top: auto;
        bottom: 1.5rem;
        right: auto;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
        width: max-content;
    }
    
    .cyber-container {
        padding: 1rem;
    }
}

</style>
