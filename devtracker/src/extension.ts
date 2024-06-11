import * as vscode from 'vscode';
import { Timer } from './timer';
import { supportedLanguages } from './languages';

let timer: Timer | null = null
let currentLanguage: string | undefined

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "devtracker" is now active!');
	let disposable = vscode.commands.registerCommand('devtracker.helloWorld', () => {
		vscode.window.showInformationMessage('Dev Tracker is now tracking!');
	});
	
	context.subscriptions.push(disposable);

	vscode.workspace.onDidOpenTextDocument((document) => {
        if (supportedLanguages.includes(document.languageId)) {
            startTimer(document.languageId)
        }
    });

    vscode.window.onDidChangeActiveTextEditor((editor) =>{
        if (editor && supportedLanguages.includes(editor.document.languageId)){
            startTimer(editor.document.languageId)
        } else if (editor && editor.document.languageId != 'plaintext'){
            stopTimer()
        }
    })
}

export function deactivate() {
	stopTimer();
}


function startTimer(languageId: string) {
    if (languageId !== currentLanguage) {
        stopTimer();
        currentLanguage = languageId;
        console.log(`Current Language is ${languageId}`);
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