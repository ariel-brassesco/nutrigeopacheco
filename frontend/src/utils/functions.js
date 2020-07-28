export const slugText = (text) => text.toLowerCase()
        .replace(/[\s\W]+/g,'_') // Convert spaces or not [a-z0-9_] in '_'
        .replace(/_+/g,'-'); // Convert '_' to '-'