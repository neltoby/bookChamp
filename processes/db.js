import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { Toast } from 'native-base'

export const db = SQLite.openDatabase('db.bookchamp')

export const imageBase64 = (fileUri = '../img/previewImage.jpg') => {
    try{
        const base64 = FileSystem.readAsStringAsync(fileUri, {encoding: FileSystem.EncodingType.Base64})
        return `data:image/png;base64,${base64}`
    }catch(err){
        console.log(err)
    }
}

const showTaoster = payload => {
    return Toast.show(
        { 
            text: payload.text, 
            buttonText: 'CLOSE', 
            type: payload.type || 'success',
            textStyle: { fontSize: payload.textStyle || 14 },
            style: payload.style || {backgroundColor: 'green'}
        }
    )
}
// db.transaction(tx => {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, category TEXT, image TEXT, likes INT, idioms_1 TEXT, idioms_2 TEXT, idioms_3 TEXT, new_word_1 TEXT, new_word_2 TEXT, new_word_3 TEXT, read INT, archived INT, liked INT)')
// })
