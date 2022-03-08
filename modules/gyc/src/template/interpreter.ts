import { file, Folder } from 'folderst-maker'
import {
	clone,
	isString,
	reduce,
	replace,
	template as lodTemplate,
	templateSettings as lodTemplateSettings,
	trim
} from 'lodash'

lodTemplateSettings.interpolate = /##([a-zA-Z]*);?/
lodTemplateSettings.evaluate = null
lodTemplateSettings.escape = null

const defineTagRegex = /##=([a-zA-Z]*)$/


export interface Template {
	[key: string]: Template | string
}


const interpolateTag = (string: string, tags: object) => {
	try {
		return lodTemplate(string)(tags)
	} catch (error) {
		throw new ReferenceError(error.message)
	}
}

const interpretTemplate = (source: Template, standartTags: object): Folder => {
	const tags = clone(standartTags)
	return reduce(Object.entries(source), (acc, [name, item]) => {

		const [tagDefiner, tagName] = defineTagRegex.exec(name) || []
		const removedDefinderName = trim(replace(name, tagDefiner, ''))
		const newItemName = interpolateTag(removedDefinderName, tags)
		if (tagName) tags[tagName] = newItemName

		const newItem = isString(item) ? file(interpolateTag(item, tags)) : interpretTemplate(item, tags)

		return {
			...acc,
			[newItemName]: newItem
		}
	}, {})
}

export default interpretTemplate