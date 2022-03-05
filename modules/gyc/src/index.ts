import initAppdata from './appdata'
import interpretTemplate from './template/interpret'
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

	
}

generateYourComponent({
	template: 'reactFC',
	name: 'Component',
	path: ''
})

export = generateYourComponent