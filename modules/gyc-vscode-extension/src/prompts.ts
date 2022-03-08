import GYC from 'gyc'
import { window } from 'vscode'

export const templatePrompt = () => {

	const templatesList = GYC.list()
	console.log(templatesList)
	return window.showQuickPick(templatesList, { canPickMany: false })
}

export const componentNamePrompt = () => window.showInputBox({
	title: 'Name'
})