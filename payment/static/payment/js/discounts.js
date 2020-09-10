'use strict';

function get_available_discount(type){
    const discount = document.querySelectorAll(`[data-discount=${type}]`);
    const res = Array.prototype.map.call(discount, ({dataset}) => { 
        let {code, type} = dataset;
        return {code,type};
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

function add_discount_to_cart(amount, type) {
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
            discount_text.innerText = `${parseInt(amount)}% Descuento`;
            discount_price.innerText = `-$ ${discount.toFixed(2)}`;
            // Add "p" tag into "div" tag
            discount_item.appendChild(discount_text);
            discount_item.appendChild(discount_price);
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
            let total = add_discount_to_cart(amount, d.type);
            applyDiscountToTotal(total);
        }
    });
    // If not discount apply remove discounts and set total cart
    if (!discount_applied) {
        removeDiscount();
        applyDiscountToTotal(get_total_cart());
    }
}

document.addEventListener('click', (e) => {
    const elem = e.target;
    if (elem.name == 'payment-method') {
        if (elem.checked) applyPaymentDiscount(elem.value);
    }
})