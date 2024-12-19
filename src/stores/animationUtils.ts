import {defineStore} from 'pinia';
import {Animation} from "../interfaces/animation.ts";
import { Filetype, supportedFileExtensions, availableFoldersForTypes } from '../../interfaces/filesystem.ts';
import { DirEntry, readDir } from '@tauri-apps/plugin-fs';
import * as path from '@tauri-apps/api/path';


export const useAnimationsUtils = defineStore('animationUtils', () => {
    function checkAnimationsFromTimesheet(animations: Animation[]) {
        console.log(animations);

    }

    function trimAnimationFBXFiles(animations: Animation[]) {
        console.log(animations);
    }

    return {checkAnimationsFromTimesheet, trimAnimationFBXFiles};
});