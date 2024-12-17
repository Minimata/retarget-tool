<script setup lang="ts">
import { DirEntry, readDir } from '@tauri-apps/plugin-fs';
import * as path from '@tauri-apps/api/path';

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import { Session } from '../interfaces/session';
import { ref } from 'vue';
import FileAnimItem from './FileAnimItem.vue';
import PlaceholderItem from './PlaceholderItem.vue';

const { session } = defineProps<{
    session: Session,
}>()

interface Directory {
    entry: DirEntry,
    content?: DirEntry[]
}

const allEntries = await readDir(session.path);

const validDirectories = ['timesheets', 'roms', 'anims', 'targets', 'videorefs']
const supportedFileExtensions = ['fbx', 'mp4', 'mov', 'csv']
const validEntries = allEntries.filter((entry: DirEntry) => entry.isDirectory && validDirectories.includes(entry.name.toLowerCase()))
const entriesMap = new Map<string, Directory>(validEntries.map((entry: DirEntry) => [entry.name.toLowerCase(), { entry: entry }]))

const re = /(?:\.([^.]+))?$/;
for (const [name, directory] of entriesMap) {
    const contentPath = await path.join(session.path, directory.entry.name)
    const content = await readDir(contentPath);
    directory.content = content.filter((entry: DirEntry) => entry.isFile)
    directory.content = content.filter((entry: DirEntry) => entry.isFile && supportedFileExtensions.includes(entry.name.split('.').pop()!))
}

</script>

<template>
    <div class="w-full p-4">
        <div class="flex px-1 pb-4 gap-2 items-baseline">
            <p class="text-xl">Session <span class="font-bold">{{ session.name }}</span></p>
            <p class="badge badge-secondary">{{ session.date ? session.date.toDateString() : "No date selected" }}</p>
            <p class="badge badge-accent text-sm italic">{{ session.path }}</p>
        </div>
        <TabGroup>
            <TabList class="tabs tabs-boxed">
                <Tab v-for="name in validDirectories" as="template" :key="name" v-slot="{ selected }">
                    <button :class="['tab', selected ? 'tab-active' : '']">
                        {{ entriesMap.get(name) ? entriesMap.get(name)!.entry.name : name }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2">
                <TabPanel v-for="name in validDirectories" :key="name" :class="[
                    'rounded-xl',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]">
                    <ul v-if="entriesMap.get(name) && entriesMap.get(name)!.content!.length > 0">
                        <li v-for="(file, idx) in entriesMap.get(name)!.content" :key="file.name">
                            <FileAnimItem :file="file" :is-odd="idx % 2 != 0" />
                        </li>
                    </ul>
                    <div v-else>
                        <PlaceholderItem>No {{ name }} in folder...</PlaceholderItem>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>