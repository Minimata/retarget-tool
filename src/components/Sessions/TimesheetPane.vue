<script setup lang="ts">
import {SessionFileInput} from '../../interfaces/sessionFileInput'
import * as path from '@tauri-apps/api/path';
import {readTextFile} from '@tauri-apps/plugin-fs';
import {parse} from 'csv-parse/browser/esm/sync';
import {Animation, AnimationStatus} from "../../interfaces/animation.ts";
import {useAnimationsStore} from "../../stores/animations.ts";
import {useAnimationsUtils} from "../../stores/animationUtils.ts";

const {session, folder, file} = defineProps<SessionFileInput>()

const { animations } = useAnimationsStore()
const {checkAnimationsFromTimesheet, trimAnimationFBXFiles} = useAnimationsUtils()

const fullFilePath = await path.join(session.path, folder.name, file.name)
const contents = await readTextFile(fullFilePath);
const records = parse(contents, {
    columns: true,
    skip_empty_lines: true,
    skip_records_with_empty_values: true,
    skip_records_with_error: true
});

let lastKnownFilename = ""
for (const record of records) {
    const filename: string = record['Filename']
    const description: string = record['Anim Description']
    const tcin: string = record['TC Start']
    const tcout: string = record['TC End']
    if (tcin.length > 0 && tcout.length > 0) {
        lastKnownFilename = filename.length > 0 ? filename : lastKnownFilename
        const animation = new Animation({
            filename: lastKnownFilename,
            session: session,
            description: description,
            tcin: tcin,
            tcout: tcout,
            status: AnimationStatus.NONE,
            statusMessage: ""
        })
        animations.push(animation)
    }
}

const animStatusToBGColor = new Map<AnimationStatus, string>([
    [AnimationStatus.NONE, ""],
    [AnimationStatus.OK, "bg-success text-success-content"],
    [AnimationStatus.WARNING, "bg-warning text-warning-content"],
    [AnimationStatus.ERROR, "bg-error text-error-content"],
])

function checkRecords() {
    checkAnimationsFromTimesheet(animations)
}
function trimFBXFiles() {
    trimAnimationFBXFiles(animations)
}
</script>

<template>
    <div class="overflow-x-auto h-96">
        <table class="table table-xs table-pin-rows table-pin-cols">
            <thead>
            <tr  class="text-gray-400">
                <th></th>
                <th>Filename</th>
                <th>TC In</th>
                <th>TC Out</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(record, index) in animations" :key="record.filename + index.toString()" :class="[animStatusToBGColor.get(record.status)]">
                <th class="text-gray-400">{{ index }}</th>
                <td>{{ record.filename }}</td>
                <td>{{ record.tcin }}</td>
                <td>{{ record.tcout }}</td>
                <td>{{ record.description }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="flex flex-wrap items-center justify-end p-4 gap-2">
        <button class="btn btn-accent" @click="checkRecords">Check records</button>
        <button class="btn btn-primary" @click="trimFBXFiles">Trim FBX Files</button>
    </div>
</template>