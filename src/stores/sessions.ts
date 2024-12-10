import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Session, SessionData } from '../interfaces/session';

export const useSessionsStore = defineStore('sessions', () => {
	const sessions = ref(new Map<number, Session>());

	function addSession(data: SessionData) {
		const newID = sessions.value.size
		const newSession = new Session({id: newID, ...data})
		sessions.value.set(newID, newSession)
	}

	function removeSession(id: number) {
		sessions.value.delete(id)
	}

	return { sessions, addSession, removeSession };
});
