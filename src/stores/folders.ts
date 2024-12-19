import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Filetype, filetypeToFolders} from "../interfaces/filesystem.ts";
import {Session} from "../interfaces/session.ts";
import * as path from '@tauri-apps/api/path';


export const useFoldersStore = defineStore('folders', () => {
    const folders = ref(new Map<Filetype, string>());

    async function setCurrentlyUsedFolders(session: Session, currentFolders: Map<Filetype, string>) {
        folders.value = currentFolders;

        for (const [filetype, folderName] of filetypeToFolders) {
            if (!currentFolders.has(filetype)) {
                continue;
            }

            folders.value.set(filetype, await path.join(session.path, folderName));
        }
    }

    return {folders, setCurrentlyUsedFolders};
});
