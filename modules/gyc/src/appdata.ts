import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'


const initAppdata = () => {
	const appdataRoot = process.env.APPDATA || (process.platform == 'darwin'
		? process.env.HOME + '/Library/Preferences'
		: process.env.HOME + '/.local/share')

	const appdata = resolve(appdataRoot, 'GYC')
	if (existsSync(appdata)) return appdata

	mkdirSync(appdata)

	return appdata
}

export default initAppdata