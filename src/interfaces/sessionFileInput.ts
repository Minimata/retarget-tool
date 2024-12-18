import { DirEntry } from '@tauri-apps/plugin-fs';
import { Session } from '../interfaces/session';

export interface SessionFileInput {
	session: Session;
	folder: DirEntry;
	file: DirEntry;
}
