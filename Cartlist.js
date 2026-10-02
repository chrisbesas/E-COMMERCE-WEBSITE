// !! CART.JS — shared cart logic ng AutoBayPh
// I-include ito sa LAHAT ng pages na may "Add to Cart" button
// at sa CARTPAGE.html mismo: <script src="cart.js"></script>

const CART_KEY = 'autobayph_cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
    // item = { id, name, price, spec, image }
    const cart = getCart();
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
}

function removeFromCart(id) {
    saveCart(getCart().filter(c => c.id !== id));
}

function updateQty(id, qty) {
    const cart = getCart();
    const item = cart.find(c => c.id === id);
    if (!item) return;
    if (qty <= 0) {
        removeFromCart(id);
    } else {
        item.qty = qty;
        saveCart(cart);
    }
}

function cartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.addCartBTN').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!btn.dataset.id) return;

            addToCart({
                id: btn.dataset.id,
                name: btn.dataset.name || 'Unnamed Car',
                price: parseInt(btn.dataset.price, 10) || 0,
                spec: btn.dataset.spec || '',
                image: btn.dataset.image || ''
            });

            const original = btn.textContent;
            btn.textContent = 'Added ✓';
            setTimeout(() => { btn.textContent = original; }, 1200);
        });
    });
});