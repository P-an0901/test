/* Chèn header*/
$(document).ready(function(){
    $("#header-container").load("html/header.html", function(){
        checkStatus();
        const headerNav = document.querySelector(".header-bottom");
        if (headerNav) {
            let lastScrollY = window.scrollY;

            window.addEventListener("scroll", () => {
                if (lastScrollY < window.scrollY) {
                    headerNav.classList.add("hide");
                } else {
                    headerNav.classList.remove("hide");
                }
                lastScrollY = window.scrollY;
            });
        }
        const currentUrl = window.location.pathname;
        const danhMucLink = document.querySelector('.menu-link[href="danhmuc.html"]');
        const trangChuLink = document.querySelector('.menu-link[href="index.html"]');
        
        // Xóa 'active' khỏi tất cả các menu links
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));
        
        // Kiểm tra URL hiện tại để thêm 'active' cho "Trang chủ" hoặc "Danh Mục Sản phẩm"
        if (currentUrl.includes("index.html") || currentUrl === "/") {
            trangChuLink.classList.add('active'); 
        } else if (currentUrl.includes("taikhoan.html") || currentUrl.includes("giohang.html") || currentUrl.includes("gioithieu.html")) {
            document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));
        } else  {
            danhMucLink.classList.add('active'); 
        }
        updateCart();
    })
     // Khi nội dung của modal được tải xong
     $("#modal-container").load("html/modal.html", function() {
        // Đảm bảo rằng các sự kiện đã được gán sau khi tải modal
        const closeButton = document.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', resetModal);
        }
        // Đăng ký
        let signupButton = document.getElementById('signup-button');
        signupButton.addEventListener('click', (event) => {
            let signupResult = handleSignup(event);
        
            if (signupResult == true) {
                alert('Đăng ký thành công');
                resetModal();
                document.querySelector('.sign-up').style.display = 'none';
                document.querySelector('.login').style.display = 'block';
            }
        });

        // Đăng nhập
        let loginButton = document.getElementById('login-button');
        loginButton.addEventListener('click', (event) => {
            let accountFound = handleLogin(event);  

        // Nếu đăng nhập thành công, hiển thị thông báo
            if (accountFound) {
                alert('Đăng nhập thành công');
                resetModal();
                checkStatus();
                $('#signup-login').modal('hide');
             }else{
                
                document.querySelector('.form-message-login').style.display = 'block';
                return null;
             }
        });
        // Sự kiện chuyển đổi giữa đăng ký và đăng nhập
        document.querySelector('.login-link').addEventListener('click', function () {
            resetModal();
            document.querySelector('.sign-up').style.display = 'none';
            document.querySelector('.forgot-password-form').style.display = 'none';
            document.querySelector('.login').style.display = 'block';
        });

        document.querySelector('.signup-link').addEventListener('click', function () {
            resetModal();
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.sign-up').style.display = 'block';
        });

        document.querySelector('.forgot-password-link').addEventListener('click', function () {
            resetModal();
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.forgot-password-form').style.display = 'block';
        });

        document.querySelector('.forgot-password-form .login-link').addEventListener('click', function () {
            resetModal();
            document.querySelector('.forgot-password-form').style.display = 'none'; 
            document.querySelector('.login').style.display = 'block'; 
        });
    });

    // Hàm mở modal với các loại form: login, signup
    window.openModal = function(type) {
        if (type === 'login') {
            document.querySelector('.sign-up').style.display = 'none'; // Ẩn phần đăng ký
            document.querySelector('.login').style.display = 'block';  // Hiển thị phần đăng nhập
        } else if (type === 'signup') {
            document.querySelector('.login').style.display = 'none';   // Ẩn phần đăng nhập
            document.querySelector('.sign-up').style.display = 'block'; // Hiển thị phần đăng ký
        }
        document.querySelector('.forgot-password-form').style.display = 'none';
        $('#signup-login').modal('show'); // Hiển thị modal
    };

    // Hàm reset modal
    function resetModal() {
        const modal = document.querySelector('#signup-login');
        modal.querySelectorAll('input[type="text"], input[type="password"]').forEach(input => {
            input.value = ''; 
        });
        modal.querySelectorAll('.form-message').forEach(msg => {
            msg.textContent = ''; // Xóa nội dung của các thông báo
        });
        
        modal.querySelector('.sign-up').style.display = 'none';
        modal.querySelector('.forgot-password-form').style.display = 'none';
        modal.querySelector('.login').style.display = 'block';
        modal.querySelector('.form-message-login').innerHTML = '';
        modal.querySelector('.form-message-login').style.display = 'none';
    }
    $("#footer").load("html/footer.html")
});
function loginWithFacebook() {
    // Logic for Facebook login
  }
  
  function loginWithGoogle() {
    // Logic for Google login
  }

/* Giảm giá*/
const products = document.querySelectorAll('.product-item');

products.forEach(pro => {
    const priceElement = pro.querySelector('.product-price');
    const salePriceElement = pro.querySelector('.product-sale-price');

    // Kiểm tra nếu phần tử giá có tồn tại
    if (priceElement && salePriceElement) {
        if (pro.dataset.hasDiscount === 'true') {
            pro.classList.add('has-discount');
            priceElement.style.textDecoration = 'line-through'; 
            salePriceElement.style.display = 'block'; 
        } else {
            priceElement.style.textDecoration = 'none';
            pro.classList.remove('has-discount');
            //salePriceElement.style.display = 'none'; 
        }
    }
});


// Giỏ hàng dưới dạng mảng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(button) {
    const productElement = button.closest('.product-item');
    const productName = productElement.querySelector('.product-name').innerText;
    const productPrice = productElement.querySelector('.product-price').innerText;
    const productImage = productElement.querySelector('.product-image').src;

    // Kiểm tra xem sản phẩm đã có trong giỏ hay chưa
    const productInCart = cart.find(item => item.name === productName);
    if (productInCart) {
        alert('Sản phẩm này đã có trong giỏ hàng!');
        return;
    }

    // Thêm sản phẩm vào giỏ
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    // Cập nhật giỏ hàng
    updateCart();
}

// Hàm cập nhật giỏ hàng
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Phần tử chứa giỏ hàng
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-message');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        if (cart.length > 0) {
            emptyMessage.style.display = 'none';

            cart.forEach((product, index) => {
                const productHTML = `
                    <li class="cart-item">
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
        }
    }
    // Cập nhật badge giỏ hàng
    const cartBadge = document.querySelector('.cart-container .badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// Hàm xóa sản phẩm khỏi giỏ
function removeFromCart(index) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    }
}

// Đọc giỏ hàng từ localStorage khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = storedCart;
    updateCart();
});
/*Lên đầu trang */
window.addEventListener("scroll", function() {
    const backToTopButton = document.querySelector(".back-to-top");
    if (window.scrollY > 200) {
        backToTopButton.classList.add("active");
    } else {
        backToTopButton.classList.remove("active");
    }
});
document.querySelector(".back-to-top").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});
