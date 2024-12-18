export enum Filetype {
	TIMESHEET = 'timesheet',
	ROM = 'rom',
	ANIM = 'anim',
	TARGET = 'target',
	VIDEOREF = 'videoref',
}

export const filetypeToFolders = new Map<Filetype, string>([
	[Filetype.TIMESHEET, "Timesheets"],
	[Filetype.ROM, "ROMs"],
	[Filetype.ANIM, "Animations"],
	[Filetype.TARGET, "Targets"],
	[Filetype.VIDEOREF, "Videorefs"],
])

export const availableFoldersForTypes = new Map<string, Filetype>([
	['timesheets', Filetype.TIMESHEET],
	['timesheet', Filetype.TIMESHEET],
	['timetables', Filetype.TIMESHEET],
	['timetable', Filetype.TIMESHEET],
	['roms', Filetype.ROM],
	['rom', Filetype.ROM],
	['anims', Filetype.ANIM],
	['anim', Filetype.ANIM],
	['animations', Filetype.ANIM],
	['animation', Filetype.ANIM],
	['targets', Filetype.TARGET],
	['target', Filetype.TARGET],
	['videorefs', Filetype.VIDEOREF],
	['videoref', Filetype.VIDEOREF],
	['videoreferences', Filetype.VIDEOREF],
	['videoreference', Filetype.VIDEOREF],
	['video references', Filetype.VIDEOREF],
	['video reference', Filetype.VIDEOREF]
])

export const supportedFileExtensions = ['fbx', 'mp4', 'mov', 'csv']
