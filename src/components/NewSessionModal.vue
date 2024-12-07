<template>
    <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Create new session</h3>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Session name</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Date</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Select a folder</span>
            </div>
            <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
        </label>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</template>