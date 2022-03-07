import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'fs'
import { partial } from 'lodash'
import { resolve } from 'path'
import { curry } from 'ramda'

export interface Appdata {
	path: string
}

export type AppdataWorker = ReturnType<typeof createAppdataWorker>

const initAppdata = (): Appdata => {
	const appdataRoot = process.env.APPDATA || (process.platform == 'darwin'
		? process.env.HOME + '/Library/Preferences'
		: process.env.HOME + '/.local/share')

	const appdata = resolve(appdataRoot, 'GYC')
	if (!existsSync(appdata)) {
		mkdirSync(appdata)
	}

	return { path: appdata }
}

export const createAppdataWorker = (appdata: Appdata) => ({
	find: findInAppdata(appdata),
	save: saveToAppdata(appdata),
	delete: deleteFromAppdata(appdata),
	filesList: partial(getAppdataFiles, appdata)
})

export const findInAppdata = curry(
	(appdata: Appdata, file: string): void | string => {
		const path = resolve(appdata.path, file)
		return existsSync(path)
			? path
			: undefined
	}
)

export const saveToAppdata = curry(
	(appdata: Appdata, file: string, data: string) => {
		const path = resolve(appdata.path, file)
		writeFileSync(path, data)
	}
)

export const deleteFromAppdata = curry(
	(appdata: Appdata, file: string) => {
		const path = resolve(appdata.path, file)
		unlinkSync(path)
	}
)

export const getAppdataFiles = (appdata: Appdata) => readdirSync(appdata.path)

export default initAppdata