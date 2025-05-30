<script setup lang="ts">
import {ref} from 'vue';
import {DirEntry, readDir} from '@tauri-apps/plugin-fs';
import * as path from '@tauri-apps/api/path';

import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue'
// @ts-ignore
import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import {Session} from '../../interfaces/session';
import {Filetype, supportedFileExtensions, availableFoldersForTypes} from '../../interfaces/filesystem.ts';
import {useFoldersStore} from "../../stores/folders.ts";
import FileAnimItem from './FileAnimItem.vue';
import PlaceholderItem from '../PlaceholderItem.vue';
import ROMPane from './ROMPane.vue';
import TimesheetPane from './TimesheetPane.vue';

const {session} = defineProps<{
    session: Session,
}>()

const currentlySelectedFile = ref<DirEntry>()
const currentlySelectedFolder = ref<DirEntry>()
const currentlySelectedFileType = ref<Filetype>(Filetype.TIMESHEET)

interface Directory {
    entry: DirEntry,
    content?: DirEntry[]
}

const allEntries = await readDir(session.path);

const typeToComponentMap = new Map<Filetype, any>([
    [Filetype.TIMESHEET, TimesheetPane],
    [Filetype.ROM, ROMPane],
    [Filetype.ANIM, TimesheetPane],
    [Filetype.TARGET, TimesheetPane],
    [Filetype.VIDEOREF, TimesheetPane],
])

const validDirectories = Array.from(availableFoldersForTypes.keys())
const validEntries = allEntries.filter((entry: DirEntry) => entry.isDirectory && validDirectories.includes(entry.name.toLowerCase()))
const entriesMap = new Map<string, Directory>(validEntries.map((entry: DirEntry) => [entry.name.toLowerCase(), {entry: entry}]))

const usedFolders = new Map<Filetype, string>(validEntries.map((entry: DirEntry) => [availableFoldersForTypes.get(entry.name.toLowerCase())!, entry.name]))
const { setCurrentlyUsedFolders } = useFoldersStore();
await setCurrentlyUsedFolders(session, usedFolders);

for (const [_, directory] of entriesMap) {
    const contentPath = await path.join(session.path, directory.entry.name)
    const content = await readDir(contentPath);
    directory.content = content.filter((entry: DirEntry) => entry.isFile)
    directory.content = content.filter((entry: DirEntry) => entry.isFile && supportedFileExtensions().has(entry.name.split('.').pop()!))
}

function itemClickedOn(file: DirEntry, folder: DirEntry, type: Filetype) {
    currentlySelectedFile.value = file
    currentlySelectedFolder.value = folder
    currentlySelectedFileType.value = type
}
</script>

<template>
    <div class="w-full p-4">
        <div class="flex px-1 pb-4 gap-2 items-baseline">
            <p class="text-xl">Session <span class="font-bold">{{ session.name }}</span></p>
            <p class="badge badge-secondary">{{ session.date ? session.date.toDateString() : "No date selected" }}</p>
            <p class="badge badge-accent text-sm italic">{{ session.path }}</p>
        </div>
        <Splitpanes vertical>
            <Pane>
                <TabGroup>
                    <TabList class="tabs tabs-boxed">
                        <Tab v-for="[name, _] in entriesMap" as="template" :key="name" v-slot="{ selected }">
                            <button :class="['tab', selected ? 'tab-active' : '']">
                                {{ entriesMap.get(name) ? entriesMap.get(name)!.entry.name : name }}
                            </button>
                        </Tab>
                    </TabList>
                    <TabPanels class="mt-2">
                        <TabPanel v-for="[name, directory] in entriesMap" :key="name" :class="[
                            'rounded-xl',
                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        ]">
                            <ul v-if="directory.content!.length > 0">
                                <li v-for="(file, idx) in directory.content" :key="file.name">
                                    <FileAnimItem :file="file" :folder="directory.entry" :is-odd="idx % 2 != 0"
                                                  :type="availableFoldersForTypes.get(name)!"
                                                  @clicked-on="itemClickedOn"/>
                                </li>
                            </ul>
                            <div v-else>
                                <PlaceholderItem>No {{ name }} in folder...</PlaceholderItem>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Pane>
            <Pane v-if="currentlySelectedFile">
                <h1 class="text-xl">{{ currentlySelectedFile!.name }}</h1>
                <component :is="typeToComponentMap.get(currentlySelectedFileType)"
                           v-bind="{ session: session, folder: currentlySelectedFolder, file: currentlySelectedFile }">
                </component>
            </Pane>
        </Splitpanes>
    </div>
</template>