'use strict';

let saveNote,
    deleteNote,
    onSave, 
    onDelete;

const getNoteObject = function (el) {
    let textarea = el.querySelector('textarea'),
        title = el.querySelector('.title');

    return (
    {
    transformCSSValue: el.style.transform,
    content: textarea.value,
    title: title.value,
    id: el.id,
    textarea: {
        width: textarea.style.width,
        height: textarea.style.height,
    }
    });
};

const onAddNoteBtnClick = function () {
    createNote();
};


const createNote = function (options) {
    let stickerEl = document.createElement('div'),
        barEl = document.createElement('div'),
        deleteBtnEl = document.createElement('button'),
        textareaEl = document.createElement('textarea'),
        textareaTitle = document.createElement('textarea'),
        BOUNDARIES = 400,
        noteConfig = options || {
        transformCSSValue: "translateX(" + Math.random() * BOUNDARIES + "px) translateY(" + Math.random() * BOUNDARIES + "px)",
        content: '',
        title: '',
        id: "sticker_" + new Date().getTime(),
        },
        onSave,
        onDelete;
    
    if (noteConfig.textarea) {
    textareaEl.style.width = noteConfig.textarea.width;
    textareaEl.style.height = noteConfig.textarea.height;
    textareaEl.style.resize = 'none';
    }

    onSave = function() {
        saveNote(getNoteObject(stickerEl));
    };
    
    onDelete = function() {
        deleteNote(getNoteObject(stickerEl));
    
        document.body.removeChild(stickerEl);
    };
    
    stickerEl.style.transform = noteConfig.transformCSSValue; 
    stickerEl.id = noteConfig.id;
    textareaEl.value = noteConfig.content;
    textareaTitle.value = noteConfig.title;
    
    deleteBtnEl.classList.add('deleteButton');
    deleteBtnEl.addEventListener('click', onDelete, false);
    
    barEl.classList.add('bar');
    stickerEl.classList.add('sticker');
    textareaTitle.classList.add('title');
    
    barEl.appendChild(deleteBtnEl);
    
    stickerEl.appendChild(barEl);
    stickerEl.appendChild(textareaEl);
    stickerEl.appendChild(textareaTitle); 
    
    stickerEl.addEventListener("mousedown", onDragStart, false);
    stickerEl.addEventListener('focusout', onSave, false);
    
    document.body.appendChild(stickerEl);
};


const init = function () {

    saveNote = function (note) {
        localStorage.setItem(note.id, JSON.stringify(note));
      };

    deleteNote = function (note) {
        let noteID = note.id;
        localStorage.removeItem(noteID);

        let test_value = localStorage.getItem(noteID);
        console.log(test_value);
    };

    const loadNotes = function () {
        for(var i = 0; i < localStorage.length; i++) {
        var noteObject = JSON.parse(
            localStorage.getItem(localStorage.key(i))
        );
        createNote(noteObject);
        };
    };
    loadNotes();      

    let addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click', onAddNoteBtnClick, false);
};

init();