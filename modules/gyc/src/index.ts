import { structure } from 'folderst-maker'
import initAppdata from './appdata'
import addTemplate from './template/add'
import interpretTemplate from './template/interpreter'
import loadTemplate from './template/load'

interface GenerateSetting {
	template: string
	name: string,
	path: string
}

const appdata = initAppdata()

const generateYourComponent = ({template: templateName, name, path}: GenerateSetting) => {
	const template = loadTemplate(appdata, templateName)
	if (!template) throw new Error(`Can not find template named '${templateName}'`)

	const tags = { name }
	const foldersData = interpretTemplate(template, tags)

	structure(foldersData, path)
}

export = {
	addTemplate,
	generateYourComponent
}

// generateYourComponent({
// 	template: 'newTemplate',
// 	name: 'New',
// 	path: 'C:\\Users\\yakov\\Desktop'
// })

// addTemplate(appdata, 'newTemplate', `
// module.exports = {
// 	'##name;Folder ##=rootFolder': {
// 		'file.txt': '##rootFolder'
// 	}
// }
// `)