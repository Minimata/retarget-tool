import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Session } from '../interfaces/session';

export const useSessionsStore = defineStore('sessions', () => {
	const sessions = ref(new Map<number, Session>());

	return { sessions };
});
