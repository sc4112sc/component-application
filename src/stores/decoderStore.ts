import { defineStore } from 'pinia';

export interface HistoryItem {
    id: string;
    name: string;
    color: string;
    timestamp: number;
}

export const useDecoderStore = defineStore('decoder', {
    state: () => ({
        history: [] as HistoryItem[],
    }),
    actions: {
        addHistory(name: string, color: string) {
            const newItem: HistoryItem = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                color,
                timestamp: Date.now(),
            };
            this.history.unshift(newItem);
            // Keep only the last 20 records
            if (this.history.length > 20) {
                this.history.pop();
            }
        },
        clearHistory() {
            this.history = [];
        }
    },
});
