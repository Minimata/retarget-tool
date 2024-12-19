import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Animation} from "../interfaces/animation.ts";

export const useAnimationsStore = defineStore('animations', () => {
    const animations = ref<Animation[]>([]);

    return {animations};
});
