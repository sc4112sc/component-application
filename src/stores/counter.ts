import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment () {
            this.count++;
        },
        incrementBy (n: number) {
            this.count += n;
        },
    },
});
