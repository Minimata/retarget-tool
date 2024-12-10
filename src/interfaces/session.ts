export interface SessionData {
	name: string;
	path: string;
	date?: Date;
}

interface NewSession extends SessionData {
	id: number;
}

export class Session {
	id!: number;
	name!: string;
	path!: string;
	date: Date | undefined;

	constructor(newSession: NewSession) {
		this.id = newSession.id, this.name = newSession.name;
		this.path = newSession.path;
		this.date = newSession.date;
	}
}
