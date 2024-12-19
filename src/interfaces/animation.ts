import { DirEntry } from '@tauri-apps/plugin-fs';
import { Session } from '../interfaces/session';


export enum AnimationStatus {
	NONE,
	OK,
	WARNING,
	ERROR,
}


export interface AnimationData {
	filename: string,
	filepath?: DirEntry,
	session: Session,
	description: string,
	tcin: string,
	tcout: string,
	status: AnimationStatus,
	statusMessage: string,
}

export class Animation {
	filename: string;
	filepath?: DirEntry;
	session: Session;
	description: string;
	tcin: string;
	tcout: string;
	status: AnimationStatus;
	statusMessage: string;

	constructor(anim: AnimationData) {
		this.filename = anim.filename;
		this.filepath = anim.filepath;
		this.session = anim.session;
		this.description = anim.description;
		this.tcin = anim.tcout;
		this.tcout = anim.tcout;
		this.status = anim.status;
		this.statusMessage = anim.statusMessage;
	}
}
