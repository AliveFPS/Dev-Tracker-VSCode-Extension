import { getLanguageDataPath } from "./readData";
import { readFile } from "./readData";
import * as fs from 'fs';

export function writeFile(language: string, time: number): void{
    let data = readFile();
    let dictionary = data.languages;
    // Checking to see if the language exists in the object, if not add the language and the time
    if (dictionary[language] !== undefined){
        dictionary[language] = dictionary[language] + time;
    }
    else{
        dictionary[language] = time;
    }
    //Adds the dictionary into the "languages" key and writes to file
    let filePath = getLanguageDataPath();
    data.languages = dictionary
    fs.writeFileSync(filePath,JSON.stringify(data, null, 2))
}

