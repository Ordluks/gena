import { existsSync } from 'fs'
import { resolve } from 'path'
import { TemplateFolder } from './interpret'


const loadTemplate = (appdata: string, name: string): void | TemplateFolder => {
	const path = resolve(appdata, name + '.gyc.js')
	return existsSync(path) ? require(path) : undefined
}

export default loadTemplate