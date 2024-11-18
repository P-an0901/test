document.getElementById("account-menu").addEventListener("click", function(event) {
    event.stopPropagation(); // Ngăn chặn việc sự kiện click lan ra ngoài
    const dropdownMenu = this.querySelector(".dropdown-menu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

// Đóng dropdown khi nhấp ra ngoài
document.addEventListener("click", function() {
    const dropdownMenu = document.querySelector("#account-menu .dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.style.display = "none";
    }
});
const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
function checkStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        document.getElementById("account-menu").style.display = "block";
        document.getElementById("login-menu").style.display = "none";
        document.getElementById("signup-menu").style.display = "none";
        document.getElementById("account-name").textContent = loggedInUser.fullName || "Tài khoản";
        if (loggedInUser.role === 'admin') {
            document.getElementById('admin-page').style.display = 'block';
        } else {
            document.getElementById('admin-page').style.display = 'none';
        }
    } else {
        document.getElementById("account-menu").style.display = "none";
        document.getElementById("login-menu").style.display = "block";
        document.getElementById("signup-menu").style.display = "block";
    }
}
function logout() {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("loggedInUser");

    // Cập nhật lại trạng thái giao diện
    checkStatus();

    // Thông báo và chuyển hướng
    alert("Bạn đã đăng xuất thành công!");
    window.location.href = "index.html";
}
