'use strict';

function applyDiscount(discount) {
    console.log(discount);
}

document.addEventListener('click', (e) => {
    const elem = e.target;
    if (elem.name == 'payment-method') {
        if (elem.checked) applyDiscount(elem.value);
    }
})