import * as vscode from 'vscode';
import { Timer } from './timer';
import { supportedLanguages } from './languages';

interface LanguageData {
    [key: string]: number;
}

let timer: Timer | null = null;
let currentLanguage: string | undefined;
let globalState: vscode.Memento;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "devtracker" is now active!');
    globalState = context.globalState;

    let startTrackingDisposable = vscode.commands.registerCommand('devtracker.startTracking', () => {
        vscode.window.showInformationMessage('Dev Tracker is now tracking!');
    });

    let viewDataDisposable = vscode.commands.registerCommand('devtracker.viewData', () => {
        displayLanguageData();
    });

    context.subscriptions.push(startTrackingDisposable, viewDataDisposable);

    vscode.workspace.onDidOpenTextDocument((document) => {
        if (supportedLanguages.includes(document.languageId)) {
            startTimer(document.languageId);
        }
    });

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor && supportedLanguages.includes(editor.document.languageId)) {
            startTimer(editor.document.languageId);
        } else {
            stopTimer();
        }
    });
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

        let languageData = globalState.get<LanguageData>('languageData', {});
        let timeWorked = languageData[languageId] || 0;
        console.log(`Timer has started, the current time worked on ${languageId} is ${timeWorked} seconds`);
    }
}

function stopTimer() {
    if (timer && currentLanguage) {
        let elapsedTime = timer.getElapsedTimeInSeconds();
        timer.stop();
        timer = null;

        // Update the time for the current language
        let languageData = globalState.get<LanguageData>('languageData', {});
        languageData[currentLanguage] = (languageData[currentLanguage] || 0) + elapsedTime;
        globalState.update('languageData', languageData);

        console.log(`Timer stopped, total time worked on ${currentLanguage} is ${languageData[currentLanguage]} seconds`);
    }
}

function displayLanguageData() {
    let languageData = globalState.get<LanguageData>('languageData', {});
    let dataDisplay = Object.entries(languageData)
        .map(([lang, time]) => `${lang}: ${formatTime(time)}`)
        .join('\n');

    if (dataDisplay) {
        vscode.window.showInformationMessage('Language Data:', { modal: true, detail: dataDisplay });
    } else {
        vscode.window.showInformationMessage('No language data recorded yet.');
    }
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}