// Chọn tất cả các thumbnail và hình lớn
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-product-image');

// Lắng nghe sự kiện click trên từng thumbnail
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        // Lấy đường dẫn của hình thu nhỏ được bấm và thay đổi hình lớn
        const newSrc = e.target.getAttribute('data-src');
        mainImage.src = newSrc;
    });
});

// Mở modal khi bấm vào hình ảnh lớn
mainImage.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = "flex";  // Mở modal
    modalImage.src = mainImage.src;  // Đặt hình ảnh modal giống với hình lớn
});

// Đóng modal khi click ra ngoài ảnh
window.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        modal.style.display = "none";  // Ẩn modal khi click ra ngoài ảnh
    }
});
function closeModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = 'none'; // Ẩn modal
}
function selectOnlyOne(checkbox) {
    var checkboxes = document.getElementsByName('size');
    checkboxes.forEach(function(box) {
        if (box !== checkbox) {
            box.checked = false; 
        }
    });
}
// Giảm số lượng
function decreaseQuantity() {
    var quantityInput = document.getElementById("quantity");
    var quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

// Tăng số lượng
function increaseQuantity() {
    var quantityInput = document.getElementById("quantity");
    var quantity = parseInt(quantityInput.value);

    quantityInput.value = quantity + 1;
}
function addToCart2() {
    // Lấy thông tin về sản phẩm
    var productName = document.querySelector(".product-name h1").innerText;
    var productPrice = document.querySelector(".product-price").innerText.replace("Giá: ", "");
    var quantity = document.getElementById("quantity").value;
    var productSize = Array.from(document.querySelectorAll('.checkbox-size:checked')).map(cb => cb.value).join(", ");
    var productImage = document.querySelector("#main-product-image").src;

    // Thông báo khi không chọn size
    if (!productSize) {
        alert("Vui lòng chọn kích thước sản phẩm.");
        return;
    }
    // Giả lập giỏ hàng (có thể lưu vào localStorage hoặc sessionStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    var existingProduct = cart.find(item => item.name === productName && item.size === productSize);
    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);  // Tăng số lượng nếu đã có sản phẩm trong giỏ
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: parseInt(quantity),
            size: productSize,
            image: productImage
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
document.getElementById('toggleDescription').addEventListener('click', function() {
    const fullDescription = document.querySelector('.full-description');
    const overlay = document.querySelector('.overlay');
    
    if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
        fullDescription.style.display = 'block';
        overlay.style.display = 'none'; // Ẩn lớp phủ mờ khi mở mô tả đầy đủ
        this.textContent = 'Thu gọn';
    } else {
        fullDescription.style.display = 'none';
        overlay.style.display = 'block'; // Hiển thị lớp phủ mờ khi ẩn mô tả đầy đủ
        this.textContent = 'Xem thêm';
    }
});
