"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const timer_1 = require("./timer");
let timer = null;
function activate(context) {
    console.log('Congratulations, your extension "devtracker" is now active!');
    let disposable = vscode.commands.registerCommand('devtracker.helloWorld', () => {
        vscode.window.showInformationMessage('Dev Tracker is now tracking!');
        startTimer();
    });
    context.subscriptions.push(disposable);
    vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'javascript') {
            console.log(`Current Language is ${document.languageId}`);
            startTimer();
        }
    });
}
exports.activate = activate;
function deactivate() {
    stopTimer();
}
exports.deactivate = deactivate;
function startTimer() {
    if (!timer) {
        timer = new timer_1.Timer();
        timer.start();
    }
}
function stopTimer() {
    if (timer) {
        timer.stop();
        timer = null;
    }
}
//# sourceMappingURL=extension.js.map