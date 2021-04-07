const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote === undefined) {
        notes.push({
            title,
            body
        })
        
        saveNotes(notes)
        console.log(chalk.green('New note added!'));
    } else {
        console.log(chalk.red('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title )

    if (notes.length > remainingNotes.length) {
        saveNotes(remainingNotes)
        console.log(chalk.green('One note removed!'));
    } else {
        console.log(chalk.red('No matching note found.'));
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold('Your notes\n'))
    notes.forEach((note) => {
        console.log(chalk.cyan(note.title));
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.blueBright(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red('No matching note found'));
    }
}

const saveNotes = (notesArr) => {
    const dataJson = JSON.stringify(notesArr)
    fs.writeFileSync('notes.json', dataJso)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote
}