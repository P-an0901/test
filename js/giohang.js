// Giỏ hàng dưới dạng mảng
let carts = [];

// Khởi tạo giỏ hàng từ localStorage
document.addEventListener('DOMContentLoaded', function () {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    carts = storedCart;
    updateCartDisplay();
});

// Hàm trích xuất số từ chuỗi
function extractNumber(priceString) {
    return Number(priceString.replace(/[^0-9]/g, ''));
}

// Hàm tính tổng tiền của giỏ hàng
function calculateTotal() {
    return carts.reduce((total, product) => total + extractNumber(product.price), 0);
}

// Cập nhật giỏ hàng hiển thị và tổng tiền
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart2-items');
    const emptyMessage = document.getElementById('empty-message');
    const cartTotal = document.getElementById('cart-total');

    // Cập nhật danh sách sản phẩm trong giỏ hàng
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        if (carts.length > 0) {
            emptyMessage.style.display = 'none';
            carts.forEach((product, index) => {
                const productHTML = `
                    <li class="cart-item" id="cart-item-${index}">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                        <span class="cart-item-name">${product.name}</span>
                        <span class="cart-item-price">${product.price}</span>
                        <button class="remove-item-btn" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </li>
                `;
                cartItemsContainer.innerHTML += productHTML;
            });
        } else {
            emptyMessage.style.display = 'block';
        }
    }

    // Cập nhật tổng tiền trong giỏ hàng
    if (cartTotal) {
        cartTotal.textContent = calculateTotal().toLocaleString() + ' đ';
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng và cập nhật hiển thị ngay lập tức
function removeFromCart(index) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        carts.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        saveCart(); // Lưu lại giỏ hàng vào localStorage
        location.reload();
    }
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(carts));
}
function redirectToCheckout() {
    saveCart(); // Lưu giỏ hàng vào localStorage
    window.location.href = "../html/checkout.html"; // Chuyển hướng sang trang thanh toán
}
