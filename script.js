const products = [
    { id: 1, name: "COLORFUL IGame GeForce RTX 5050 Ultra", price: 19590, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSBin4NQTFLWY39Q6iya-ISuC0pyuKAY2cSweBDPeiHn10KMwSOrTXwIqTOkJYnZwYkkiPFfYoR8Eq7N6KUw01y0-6ct1Pn"  },
    { id: 2, name: "Gigabyte Rtx 5060 Windforce Max Oc 8gb Gddr7 Graphic Card", price: 22500, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRzCqX_HsP2rGD1JQd2MQcqv5Qh7mL2Htepxzls_Mj6HSHZhmu4-XtsX_Cdwc_k4sIHDKr42GH_bAqMPbn59QOLn890aE5r"  },
    { id: 3, name: "Cookie", price: 2.00, img: ""  },
    { id: 4, name: "Bread", price: 4.00, img: "" }
];

let cart = [];

function init() {
    const productDiv = document.getElementById('product-list');
    products.forEach(p => {
        productDiv.innerHTML += `
            <div class="product-card">
                <img class="product-img" src="${p.img}">
                <h3>${p.name}</h3>
                <p>₱${p.price.toFixed(2)}</p>
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
    cartDiv.innerHTML = cart.map(item => `<p>${item.name} x ${item.qty} - ₱${(item.price * item.qty).toFixed(2)}</p>`).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    totalSpan.innerText = total.toFixed(2);
}

function printReceipt() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    // Fill the hidden receipt section
    document.getElementById('receipt-date').innerText = new Date().toLocaleString();
    const receiptBody = document.getElementById('receipt-body');
    receiptBody.innerHTML = cart.map(item => `
        <tr><td>${item.name}</td><td>${item.qty}</td><td>₱${(item.price * item.qty).toFixed(2)}</td></tr>
    `).join('');
    document.getElementById('receipt-total').innerText = document.getElementById('total-price').innerText;
    
    // Trigger standard print dialog
    window.print();
}

init();
