'use strict';

function get_available_discount(type){
    const discount = document.querySelectorAll(`[data-discount=${type}]`);
    const res = Array.prototype.map.call(discount, ({dataset}) => { 
        let {id, code, type} = dataset;
        return {id, code,type};
    })
    return res;
}

function get_total_cart(){
    let items = document.getElementsByClassName('cart-item');
    items  = Array.prototype.map.call(items, ({dataset}) => { 
        let {quantity, price} = dataset;
        return parseFloat(quantity)*parseFloat(price);
    })
    return items.reduce((a,b)=> a+b, 0);
}

function add_discount_to_cart(id, amount, type) {
    let total = get_total_cart();
    let discount = 0;
    const dis_items = document.getElementById('discount-items');
    
    switch(type) {
        case 'percent':
            // Update the total cart value
            discount = amount/100*total;
            total -= discount;
            // Add discount item
            let fragment = document.createDocumentFragment();
            let discount_item = document.createElement('div');
            let discount_text = document.createElement('p');
            let discount_price = document.createElement('p');
            // Populet "p" with data
            discount_text.innerText = `${parseInt(amount)}% OFF`;
            discount_price.innerText = `-$ ${discount.toFixed(2)}`;
            // Add "p" tag into "div" tag
            discount_item.appendChild(discount_text);
            discount_item.appendChild(discount_price);
            // Add CSS class and attributes
            discount_item.classList.add('discount-item');
            discount_item.setAttribute('data-id', id);
            // Append to fragment
            fragment.appendChild(discount_item);
            // Append fragment into dis_items
            dis_items.appendChild(fragment);
            break;
        default:
            break;
    }
    // Return the new total cart value
    return total;
}

function removeDiscount() {
    const dis_items = document.getElementById('discount-items');
    dis_items.innerHTML = '';
}

function applyDiscountToTotal(value) {
    const total_cart = document.getElementById('total-cart');
    total_cart.textContent = `$ ${value.toFixed(2)}`;
}

function applyPaymentDiscount(discount) {
    const gen_dis = get_available_discount('payment');
    let discount_applied = false;
    
    // Check and apply discount
    gen_dis.forEach(d => {
        let [amount, payment] = d.code.split('-');
        if (discount == payment) {
            discount_applied = true;
            amount = parseFloat(amount);
            let total = add_discount_to_cart(d.id, amount, d.type);
            applyDiscountToTotal(total);
        }
    });
    // If not discount apply remove discounts and set total cart
    if (!discount_applied) {
        removeDiscount();
        applyDiscountToTotal(get_total_cart());
        applyAllDiscount();
    }
}

function applyAllDiscount() {
    const gen_dis = get_available_discount('all');
    
    // Check and apply discount
    gen_dis.forEach(d => {
        let [amount, ] = d.code.split('-');
        amount = parseFloat(amount);
        let total = add_discount_to_cart(d.id, amount, d.type);
        applyDiscountToTotal(total);
    });
}

document.addEventListener('click', (e) => {
    const elem = e.target;
    if (elem.name == 'payment-method') {
        if (elem.checked && (getData('apply_discount') !== elem.value)) {
            applyPaymentDiscount(elem.value);
        }
        saveData('apply_discount', elem.value);
    }
});

document.addEventListener('submit', (e)=> {
    e.preventDefault();
    const form = e.target;
    const discount = document.getElementsByClassName('discount-item');
    
    // Add the discount as input if any
    if (discount.length > 0) {
        for (let dis of discount) {
            let field = document.createElement('input');
            field.setAttribute('type', 'hidden');
            field.setAttribute('name', 'apply_discount');
            field.setAttribute('value', dis.dataset.id);
            form.appendChild(field);
        }
    }
    // Submit Form
    form.submit();
}, false);


document.addEventListener('DOMContentLoaded', () => {
    saveData.bind(null, 'apply_discount', null);
    applyAllDiscount();
}, false);

