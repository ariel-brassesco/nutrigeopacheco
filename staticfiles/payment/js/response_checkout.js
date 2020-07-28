'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const elem = document.getElementById('success-checkout') || document.getElementById('failure-checkout');
    elem.classList.remove('inactive');

    setTimeout(() => {
        document.getElementById('redirect-frontend').click();
    }, 2000);
}, false);