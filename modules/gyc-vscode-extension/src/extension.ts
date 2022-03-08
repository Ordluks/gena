import { commands, window, ExtensionContext } from 'vscode'

export function activate(context: ExtensionContext) {
	const disposable = commands.registerCommand('gyc.generate', () => {
		window.showInformationMessage('Generate')
	})

	context.subscriptions.push(disposable)
}

export function deactivate() {}
