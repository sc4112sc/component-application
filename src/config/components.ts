import { reactive } from 'vue';
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
} from 'SElement';

export interface ComponentItem {
    name: string;
    component: Component;
    color: string;
    route: string;
    demoProps?: Record<string, any>;
}

export const vibrantColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FF8FA3', '#6C5CE7', '#00B894', '#FDCB6E', '#E17055',
    '#74B9FF', '#A29BFE', '#FD79A8', '#FFEAA7', '#DFE6E9',
    '#55EFC4', '#81ECEC'
];

export const demoData = reactive({
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

export const tabsData = [
    { name: 'first', label: '頁籤1', icon: 'icon-list-linear', redDot: false, unread: 0 },
    { name: 'second', label: '頁籤2', icon: 'icon-messages-linear', redDot: false, unread: 3 },
    { name: 'third', label: '頁籤3', icon: 'icon-hall-linear', redDot: true, unread: 0, disabled: true },
];

export const components: ComponentItem[] = [
    { name: 'Button', component: tButton, color: vibrantColors[0], route: '/button', demoProps: { type: 'primary' } },
    { name: 'Input', component: tInput, color: vibrantColors[1], route: '/input' },
    { name: 'Select', component: tSelect, color: vibrantColors[2], route: '/select' },
    { name: 'Checkbox', component: tCheckbox, color: vibrantColors[3], route: '/checkbox' },
    { name: 'Radio', component: tRadio, color: vibrantColors[4], route: '/radio' },
    { name: 'Switch', component: tSwitch, color: vibrantColors[5], route: '/switch' },
    { name: 'Tag', component: tTag, color: vibrantColors[6], route: '/tag', demoProps: { type: 'primary' } },
    { name: 'Badge', component: tBadge, color: vibrantColors[7], route: '/badge', demoProps: { value: 5 } },
    { name: 'Avatar', component: tAvatar, color: vibrantColors[8], route: '/avatar', demoProps: { size: 'large' } },
    { name: 'Link', component: tLink, color: vibrantColors[10], route: '/button', demoProps: { type: 'primary' } },
    { name: 'Pagination', component: tPagination, color: vibrantColors[11], route: '/pagination' },
    { name: 'TimePicker', component: tTimePicker, color: vibrantColors[12], route: '/timepicker' },
    { name: 'Tooltip', component: tTooltip, color: vibrantColors[13], route: '/tooltip', demoProps: { content: '這是提示內容' } },
    { name: 'Affix', component: tAffix, color: vibrantColors[14], route: '/button', demoProps: {} },
    { name: 'Tabs', component: tTabs, color: vibrantColors[15], route: '/tabs' },
    { name: 'RoundedTabs', component: tRoundedTabs, color: vibrantColors[16], route: '/roundedtabs' },
    { name: 'CollapsibleTabs', component: tCollapsibleTabs, color: vibrantColors[17], route: '/collapsibletabs' },
    { name: 'Modal', component: tModal, color: vibrantColors[19], route: '/modal', demoProps: {} },
    { name: 'Transfer', component: tTransfer, color: vibrantColors[20], route: '/transfer' },
    { name: 'Tree', component: tTree, color: vibrantColors[21], route: '/transfer', demoProps: {} },
];

export const getComponentProps = (item: ComponentItem) => {
    switch (item.name) {
        case 'Input':
            return { modelValue: demoData.inputValue, 'onUpdate:modelValue': (val: string) => demoData.inputValue = val, placeholder: '請輸入內容' };
        case 'Select':
            return { modelValue: demoData.selectValue, 'onUpdate:modelValue': (val: string) => demoData.selectValue = val, placeholder: '請選擇' };
        case 'Checkbox':
            return { checked: demoData.checkboxValue, 'onUpdate:checked': (val: boolean) => demoData.checkboxValue = val };
        case 'Radio':
            return { checked: demoData.radioValue, 'onUpdate:checked': (val: boolean) => demoData.radioValue = val };
        case 'Switch':
            return { modelValue: demoData.switchValue, 'onUpdate:modelValue': (val: boolean) => demoData.switchValue = val };
         case 'Pagination':
            return { total: 100, current: demoData.paginationPage, onChange: (val: number) => demoData.paginationPage = val };
         case 'TimePicker':
            return { modelValue: demoData.timeValue, 'onUpdate:modelValue': (val: string) => demoData.timeValue = val };
         case 'Tabs':
            return { modelValue: demoData.activeTab, 'onUpdate:modelValue': (val: string) => demoData.activeTab = val, tabs: tabsData };
         case 'RoundedTabs':
             return { modelValue: demoData.activeRoundedTab, 'onUpdate:modelValue': (val: string) => demoData.activeRoundedTab = val, tabs: tabsData }
         case 'CollapsibleTabs':
              return { modelValue: demoData.activeCollapsibleTab, 'onUpdate:modelValue': (val: string) => demoData.activeCollapsibleTab = val, tabs: tabsData }
         case 'Transfer':
              return { leftList: demoData.leftList, 'onUpdate:leftList': (val: any[]) => demoData.leftList = val, rightList: demoData.rightList, 'onUpdate:rightList': (val: any[]) => demoData.rightList = val, leftTitle: '來源列表', rightTitle: '目標列表', leftPlaceholder: '搜尋來源', rightPlaceholder: '搜尋目標' }
         case 'Tree':
              return { itemList: demoData.treeItemList, groupList: demoData.treeGroupList, type: 'treeview', isCheck: false, isEdit: false }
         case 'Modal':
             return { show: demoData.modalVisible, title: '範例 Modal', onClose: () => demoData.modalVisible = false }
        default:
            return item.demoProps || {};
    }
};
