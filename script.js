const products = [
    { id: 1, name: "COLORFUL IGame GeForce RTX 5050 Ultra", price: 19590, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSBin4NQTFLWY39Q6iya-ISuC0pyuKAY2cSweBDPeiHn10KMwSOrTXwIqTOkJYnZwYkkiPFfYoR8Eq7N6KUw01y0-6ct1Pn"  },
    { id: 2, name: "Gigabyte Rtx 5060 Windforce Max Oc 8gb Gddr7 Graphic Card", price: 22500, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRzCqX_HsP2rGD1JQd2MQcqv5Qh7mL2Htepxzls_Mj6HSHZhmu4-XtsX_Cdwc_k4sIHDKr42GH_bAqMPbn59QOLn890aE5r"  },
    { id: 3, name: "Sapphire Pulse AMD Radeon RX 9060 XT", price: 20500, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSeAY1s3CSVNLZtn-TyIeyZY_H7XTRu3IkFE-xE0V7luuj9OF9TqIqZYRIG6WfSgXVXnjwWgBpZyilHYn6P9F2QTgA6RphJ01lENqQPg_Mfet31YbnyR5xoatg"  },
    { id: 4, name: "ASRock AMD Radeon RX 9060 XT Challenger 8GB", price: 20950, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSruukRAHVMpFcvLHgBrMCVPjxTpbp9Mr2G9NtRvZlAnR7fWqcxkb6jsuIra3lJu098M_OVCas5RE5OdpXwECUev5nYM0WjnA" },
    { id: 5, name: "Redragon H510 Zeus-X RGB Wired Gaming Headset", price: 4014, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRllPcNB-ytTH-U2hAVfQnfGtwtzhwnc1grlT6qdFuswTLprw1hdurwvw0hA1DS7gKxnY3ewmkcPDbmfEhqodx7Ec5zXD7Bcs80rZAmPLnUD7wm1yzG2ra29fY" },
    { id: 6, name: "Logitech G PRO X Wired 7.1 Gaming Headset, League of Legends Edition", price: 40590, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9PSaXKQ8_yzKjfvcH1gV5aa2U07zwEnkwoNppF0umb6gEUGdWkBN0CxWVn2Zh6MHUvfgIE7v-EFLecPoxP5cEmnJcZ48TbcyOc8nHYjtcuO583woPWK7JdQ" },
    { id: 7, name: "Razer Barracuda X Chroma - Wireless Multi-Platform Gaming and Mobile Headset", price: 900, img: "https://down-ph.img.susercontent.com/file/ph-11134207-81ztj-mkw0215t2uiq49" },
    { id: 7, name: "Glorious Model D Wireless Gaming Mouse", price: 3850, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRFL5FjMxNzvA_0JWSC01ZmfUfeRLrHJV6zaDvhg7FNnSXatn0fsoSQQvOCSGic_P7ofr-LhPqcLiHYXp-MJ13zEEl9HB6Wacv6AnXSv5HK7R5PC48WJdU" }

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
    
    document.getElementById('receipt-date').innerText = new Date().toLocaleString();
    const receiptBody = document.getElementById('receipt-body');
    receiptBody.innerHTML = cart.map(item => `
        <tr><td>${item.name}</td><td>${item.qty}</td><td>₱${(item.price * item.qty).toFixed(2)}</td></tr>
    `).join('');
    document.getElementById('receipt-total').innerText = document.getElementById('total-price').innerText;
    
  
    window.print();
}

init();
