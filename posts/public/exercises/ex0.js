// need to write specific html
function subtitute() {
    const value = document.getElementById('textBox').value;
    const title = document.getElementById('title');

    if (value.lenght == '') {
        console.log('enter a real value in the input');
    }

   title.innerHTML = value
    
}

// idea for calculator
const SPENDING_THRESHOLD = 200;
const TAX_RATE = 0.08;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;

let bankBalance = 303.91;
let amount = 0;

function calculateTax(amount) {
    return amount * TAX_RATE;
}

function formatAmount(amount) {
    return '$' + amount.toFixed(2);
}

while (amount < bankBalance) {
    amount = amount + PHONE_PRICE;

    if (amount < SPENDING_THRESHOLD) {
        amount = amount + ACCESSORY_PRICE;
    }
}

amount = amount + calculateTax(amount);

console.log('your purchase' + formatAmount(amount));

if (amount > bankBalance) {
    console.log('you can afford the purchase')
}
