import { curry, T } from 'ramda'
import { structure } from 'folderst-maker'
import { AppdataWorker } from '../appdata'
import interpretTemplate, { Template } from './interpreter'
import { filter, map, partial, replace } from 'lodash'
import { fileExtExpr } from '../utils'

const TEMPLATE_EXT = '.gyc.js'
const TEMPLATE_EXT_REGEXP = fileExtExpr(TEMPLATE_EXT)

export const createTemplateWorker = (appdataWorker: AppdataWorker) => ({
	load: loadTemplate(appdataWorker),
	addNew: addTemplate(appdataWorker),
	list: partial(templatesList, appdataWorker),
	generateYourComponent: generateYourComponent(appdataWorker)
})

export const loadTemplate = curry(
	(appdata: AppdataWorker, name: string): void | Template => {
		const path = appdata.find(name + TEMPLATE_EXT)
		return path ? require(path) : undefined
	}
)

export const addTemplate = curry(
	(appdata: AppdataWorker, name: string, content: string) => {
		appdata.save(name + TEMPLATE_EXT, content)
	}
)

export const removeTemplate = curry(
	(appdata: AppdataWorker, name: string) => {
		appdata.delete(name + TEMPLATE_EXT)
	}
)

export const templatesList = (appdata: AppdataWorker) => {
	const templates = map(
		appdata.filesList(),
		value => TEMPLATE_EXT_REGEXP.test(value) ? replace(value, TEMPLATE_EXT_REGEXP, '') : null
	)

	return filter(templates, value => value !== null)
}


interface GenerateSetting {
	template: string
	name: string,
	path: string
}

export const generateYourComponent = curry(
	(appdata: AppdataWorker, {template: templateName, name, path}: GenerateSetting) => {
		const template = loadTemplate(appdata, templateName)
		if (!template) throw new Error(`Can not find template named '${templateName}'`)
	
		const tags = { name }
		const foldersData = interpretTemplate(template, tags)
	
		structure(foldersData, path)
	}
)