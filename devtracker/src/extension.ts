import * as vscode from 'vscode';
import { Timer } from './timer';

let timer: Timer | null = null

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "devtracker" is now active!');
	let disposable = vscode.commands.registerCommand('devtracker.helloWorld', () => {
		vscode.window.showInformationMessage('Dev Tracker is now tracking!');
	});
	
	context.subscriptions.push(disposable);

	vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'javascript') {
			console.log(`Current Language is ${document.languageId}`)
            startTimer();
        }
    });
}

export function deactivate() {
	stopTimer();
}


function startTimer() {
    if (!timer) {
        timer = new Timer();
        timer.start();
    }
}

function stopTimer() {
    if (timer) {
        timer.stop();
        timer = null;
    }
}