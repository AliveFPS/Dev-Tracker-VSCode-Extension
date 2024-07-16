import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

export interface LanguageData {
    languages: {
        [key: string]: number
    }
}

export function getLanguageDataPath(): string {
    const extensionContext = vscode.extensions.getExtension("devtracker")?.extensionUri
    return path.join(extensionContext?.fsPath || '', 'languageData.json')
}

export function createFile(): void {
    const filePath = getLanguageDataPath()
    if (!fs.existsSync(filePath)) {
        const initalData: LanguageData = {languages: {}};
        fs.writeFileSync(filePath,JSON.stringify(initalData, null, 2))
    }
}

export function readFile(): LanguageData {
    const filePath = getLanguageDataPath()
    createFile()

    const rawData = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(rawData) as LanguageData
}