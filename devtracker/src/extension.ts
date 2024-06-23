import * as vscode from 'vscode';
import { Timer } from './timer';
import { supportedLanguages } from './languages';

let timer: Timer | null = null
let currentLanguage: string | undefined
let global_context: vscode.ExtensionContext 

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "devtracker" is now active!');
	let disposable = vscode.commands.registerCommand('devtracker.helloWorld', () => {
		vscode.window.showInformationMessage('Dev Tracker is now tracking!');
	});
	
    //saves context for future use
    global_context = context;

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

        // Prints the time spent on project during the begining of the project
        let time_worked = global_context.globalState.get("Current_Time", 0);
        console.log(`Timer has started, the current time worked is ${time_worked} seconds`);
    }
}

function stopTimer() {
    if (timer) {
        // Gets the current time before the time is stopped
        let current_time = timer.getElapsedTimeInSeconds()

        timer.stop();
        timer = null;

        // Adds the previous time to the current time
        let time_added = global_context.globalState.get("Current_Time", 0) + current_time;
        global_context.globalState.update("Current_Time", time_added);
        console.log(`Timer is stopped, the current time worked is ${time_added} seconds`);
    }
}