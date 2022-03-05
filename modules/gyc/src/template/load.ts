import { existsSync } from 'fs'
import { Appdata, findInAppdata } from '../appdata'
import { Template } from './interpreter'


export const TEMPLATE_EXT = '.gyc.js'

const loadTemplate = (appdata: Appdata, name: string): void | Template => {
	const path = findInAppdata(appdata, name + TEMPLATE_EXT)
	return path ? require(path) : undefined
}

export default loadTemplate