// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('git-diff-apply.helloWorld', async () => {
		const diff = vscode.window.activeTextEditor?.document.getText()

		if (!diff) {
			vscode.window.showErrorMessage("There is no text in the active editor");
			return;
		}

		if (!diff.startsWith("diff --git")) {
			vscode.window.showErrorMessage("It does not seem to be a diff...");
			return;
		}

		const terminal = vscode.window.createTerminal("Applying git diff from current editor");
    terminal.sendText(`echo '${diff}' > my.patch`);
    terminal.sendText('git apply my.patch');
    terminal.sendText('rm my.patch');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
