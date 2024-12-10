<script setup lang="ts">
import { DirEntry, readDir } from '@tauri-apps/plugin-fs';
import * as path from '@tauri-apps/api/path';

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import { Session } from '../interfaces/session';
import { ref } from 'vue';

const { session } = defineProps<{
    session: Session,
}>()

interface Directory {
    entry: DirEntry,
    content?: DirEntry[]
}

const allEntries = await readDir(session.path);

const validDirectories = ['roms', 'anims', 'videorefs', 'targets']
const supportedFileExtensions = ['.fbx']
const validEntries = allEntries.filter((entry) => entry.isDirectory && validDirectories.includes(entry.name.toLowerCase()))
const entriesMap = new Map<string, Directory>(validEntries.map(entry => [entry.name.toLowerCase(), {entry: entry}]))
const entriesOrdered = [entriesMap.get('roms'), entriesMap.get('anims'), entriesMap.get('targets'), entriesMap.get('videorefs')]


for (const [name, directory] of entriesMap) {
    const contentPath = await path.join(session.path, directory.entry.name)
    const content = await readDir(contentPath);
    directory.content = content.filter((entry) => entry.isFile)
    // directory.content = content.filter((entry) => entry.isFile && supportedFileExtensions.includes(entry.name.split('.').pop()!.toLowerCase()))
    console.log(content);
}

</script>

<template>
    <div class="w-full max-w-lg px-2 py-16 sm:px-0">
        <TabGroup>
            <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab v-for="[name, directory] in entriesMap" as="template" :key="name" v-slot="{ selected }">
                    <button :class="[
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white text-blue-700 shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                    ]">
                        {{ directory.entry.name }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2">
                <TabPanel v-for="[name, directory] in entriesMap" :key="name" :class="[
                    'rounded-xl bg-white p-3',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                ]">
                    <ul>
                        <li v-for="file in directory.content" :key="file.name" class="relative rounded-md p-3 hover:bg-gray-100">
                            <h3 class="text-sm font-medium leading-5">
                                {{ file.name }}
                            </h3>

                            <ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                <li>is it a file ?</li>
                                <li>&middot;</li>
                                <li>{{ file.isFile ? 'Yes' : 'No' }}</li>
                            </ul>

                            <a href="#" :class="[
                                'absolute inset-0 rounded-md',
                                'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                            ]" />
                        </li>
                    </ul>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>