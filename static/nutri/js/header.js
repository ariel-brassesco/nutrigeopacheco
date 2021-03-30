'use strict';
// Functions to find Elements in the DOM
function findParentElementByClass(e, cls) {
    if (e === document.body) return null;
    let parent = e.parentElement;
    return (parent.classList.contains(cls))?parent: findParentElementByClass(parent, cls);
}

function showMenuMobile(elem, menu) {
    if (findParentElementByClass(elem, 'header-menu--mobile')){
        menu.classList.toggle('header-menu__show');
    }
}


