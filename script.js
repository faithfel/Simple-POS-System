const products = [
    { id: 1, name: "Coffee", price: 5.00 },
    { id: 2, name: "Sandwich", price: 8.50 },
    { id: 3, name: "Cookie", price: 2.00 }
];

let cart = [];

function init() {
    const productDiv = document.getElementById('product-list');
    products.forEach(p => {
        productDiv.innerHTML += `
            <div class="product-card">
                <h3>${p.name}</h3>
                <p>$${p.price.toFixed(2)}</p>
                <button onclick="addToCart(${p.id})">Add</button>
            </div>`;
    });
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    const inCart = cart.find(p => p.id === id);
    if (inCart) { inCart.qty++; } else { cart.push({ ...item, qty: 1 }); }
    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    cartDiv.innerHTML = cart.map(item => `<p>${item.name} x ${item.qty} - $${(item.price * item.qty).toFixed(2)}</p>`).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    totalSpan.innerText = total.toFixed(2);
}

function printReceipt() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    // Fill the hidden receipt section
    document.getElementById('receipt-date').innerText = new Date().toLocaleString();
    const receiptBody = document.getElementById('receipt-body');
    receiptBody.innerHTML = cart.map(item => `
        <tr><td>${item.name}</td><td>${item.qty}</td><td>$${(item.price * item.qty).toFixed(2)}</td></tr>
    `).join('');
    document.getElementById('receipt-total').innerText = document.getElementById('total-price').innerText;
    
    // Trigger standard print dialog
    window.print();
}

init();
