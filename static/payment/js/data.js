'use strict';
// Functions to manage the localStorage
function getData(key) {
    if (!localStorage.getItem(key)) return false;
    return JSON.parse(localStorage.getItem(key));
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }
    catch(error){
        console.log('An error was ocurred');
        return false;
    }
}
