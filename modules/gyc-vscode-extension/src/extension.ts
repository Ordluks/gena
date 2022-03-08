import GYC from 'gyc'
import { commands, window, ExtensionContext } from 'vscode'
import { componentNamePrompt, templatePrompt } from './prompts'

export function activate(context: ExtensionContext) {

	const disposable = commands.registerCommand('gyc.generate', async () => {
		// const template = await templatePrompt()
		const name = await componentNamePrompt()
		console.log(GYC)
		window.showInformationMessage(`Generate by template with name "${name}"`)
	})

	context.subscriptions.push(disposable)
}

export function deactivate() {}
