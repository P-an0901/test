
const headerNav = document.querySelector(".header-bottom");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if(lastScrollY < window.scrollY) {
        headerNav.classList.add("hide")
    } else {
        headerNav.classList.remove("hide")
    }
    lastScrollY = window.scrollY;
})
function openModal(type) {
    if (type === 'login') {
        document.querySelector('.sign-up').style.display = 'none'; // Ẩn phần đăng ký
        document.querySelector('.login').style.display = 'block';  // Hiển thị phần đăng nhập
    } else if (type === 'signup') {
        document.querySelector('.login').style.display = 'none';   // Ẩn phần đăng nhập
        document.querySelector('.sign-up').style.display = 'block'; // Hiển thị phần đăng ký
    }
    $('#signup-login').modal('show'); // Hiển thị modal
    }

        // Sự kiện chuyển đổi giữa đăng ký và đăng nhập
        document.querySelector('.login-link').addEventListener('click', function () {
            document.querySelector('.sign-up').style.display = 'none';
            document.querySelector('.login').style.display = 'block';
        });

        document.querySelector('.signup-link').addEventListener('click', function () {
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.sign-up').style.display = 'block';
        });