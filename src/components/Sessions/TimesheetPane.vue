<script setup lang="ts">
import {SessionFileInput} from '../../interfaces/sessionFileInput'
import * as path from '@tauri-apps/api/path';
import {readTextFile} from '@tauri-apps/plugin-fs';
import {parse} from 'csv-parse/browser/esm/sync';

const {session, folder, file} = defineProps<SessionFileInput>()

enum RecordStatus {
    NONE,
    OK,
    WARNING,
    ERROR,
}

interface Record {
    filename: string,
    description: string,
    tcin: string,
    tcout: string,
    status: RecordStatus,
    statusMessage: string,
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

const fullFilePath = await path.join(session.path, folder.name, file.name)
const contents = await readTextFile(fullFilePath);
const records = parse(contents, {
    columns: true,
    skip_empty_lines: true,
    skip_records_with_empty_values: true,
    skip_records_with_error: true
});

let lastKnownFilename = ""
const actualRecords: Record[] = []
for (const record of records) {
    const filename: string = record['Filename']
    const description: string = record['Anim Description']
    const tcin: string = record['TC Start']
    const tcout: string = record['TC End']
    if (tcin.length > 0 && tcout.length > 0) {
        lastKnownFilename = filename.length > 0 ? filename : lastKnownFilename
        actualRecords.push({
            filename: lastKnownFilename,
            description: description,
            tcin: tcin,
            tcout: tcout,
            status: randomEnum(RecordStatus),
            statusMessage: ""
        })
    }
}


const recordStatusToBGColor = new Map<RecordStatus, string>([
    [RecordStatus.NONE, ""],
    [RecordStatus.OK, "bg-success text-success-content"],
    [RecordStatus.WARNING, "bg-warning text-warning-content"],
    [RecordStatus.ERROR, "bg-error text-error-content"],
])

function checkRecords() {
    console.log(actualRecords)
}
function trimFBXFiles() {
    console.log('will do mate, will do')
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
            <tr v-for="(record, index) in actualRecords" :key="record.filename + index.toString()" :class="[recordStatusToBGColor.get(record.status, '')]">
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