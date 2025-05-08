import { defineStore } from 'pinia';
import { Animation, AnimationStatus } from '../interfaces/animation.ts';
import { Filetype, filetypeToExtensions } from '../interfaces/filesystem.ts';
import { useFoldersStore } from './folders.ts';
import * as path from '@tauri-apps/api/path';
import { exists } from '@tauri-apps/plugin-fs';

export const useAnimationsUtils = defineStore('animationUtils', () => {
	async function checkAnimationsFromTimesheet(animations: Animation[]) {
		const { folders } = useFoldersStore();
		for (const animation of animations) {
			const folderPath = folders.get(Filetype.ANIM)!;
			const fileExtension = filetypeToExtensions.get(Filetype.ANIM)![0];
			const animPath = await path.join(folderPath, animation.filename + '.' + fileExtension);
			if (await exists(animPath)) {
				animation.status = AnimationStatus.OK;
			} else {
				animation.status = AnimationStatus.ERROR;
				animation.statusMessage = 'Could not find file for animation.';
				console.log(animPath);
			}
		}
	}

	function trimAnimationFBXFiles(animations: Animation[]) {
		console.log(animations);
	}

	return { checkAnimationsFromTimesheet, trimAnimationFBXFiles };
});
