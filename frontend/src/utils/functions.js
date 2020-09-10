export const slugText = (text) => text.toLowerCase()
        .replace(/[\s\W]+/g,'_') // Convert spaces or not [a-z0-9_] in '_'
        .replace(/_+/g,'-'); // Convert '_' to '-'

// Functions to manage the localStorage
export function getData(key) {
    if (!localStorage.getItem(key)) return false;
    return JSON.parse(localStorage.getItem(key));
}

export function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }
    catch(error){
        console.log('An error was ocurred');
        return false;
    }
}