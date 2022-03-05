import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { curry } from 'ramda'

export interface Appdata {
	path: string
}

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

export default initAppdata