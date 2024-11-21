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
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Mock dữ liệu
const productseach = [
    { name: "Royal M139 BOOMBANG", price: "650.000 đ", img: "images/BOOMBANG",url: "detail.html" },
    { name: "Royal M139 CHUỘT XƯỚC", price: "200.000 đ", img: "#" },
    { name: "Royal M139 ĐEN MỜ", price: "150.000 đ", img: "#" },
    { name: "Royal M139 LEOPARD", price: "250.000 đ", img: "#" },
    { name: "Royal M139 V.1", price: "300.000 đ", img: "#" },
    { name: "Royal ROYAL M139 VÀNG BÓNG", price: "100.000 đ", img: "#" },
    { name: "Royal M139 V.2", price: "100.000 đ", img: "#" },
    { name: "Royal M5 TRẮNG ĐEN", price: "100.000 đ", img: "#" },
    { name: "MŨ BẢO HIỂM XE ĐẠP JC-20 HỒNG", price: "200.000 đ", img: "#" },
    { name: "MŨ BẢO HIỂM XE ĐẠP JC-20 CAM", price: "200.000 đ", img: "#" },
    { name: "MŨ BẢO HIỂM XE ĐẠP JC-20 XANH", price: "200.000 đ", img: "#" },
    { name: "MŨ BẢO HIỂM XE ĐẠP JC-20 XANH", price: "200.000 đ", img: "#" },
    { name: "MŨ BẢO HIỂM XE ĐẠP JC-20 ĐỎ", price: "100.000 đ", img: "#" },
    { name: "ROYAL M139 ĐỎ ĐÔ", price: "100.000 đ", img: "#" },
    { name: "ROYAL M139 V.5 ĐEN - ĐỒNG", price: "100.000 đ", img: "#" },
    { name: "ROYAL M139 V.7 VÀNG BÓNG", price: "100.000 đ", img: "#" },
    { name: "ROYAL M125K CHUỘT MỜ", price: "100.000 đ", img: "#" },
    { name: "ROYAL M139 XÁM XI MĂNG BÓNG", price: "100.000 đ", img: "#" },
    { name: "FULLFACE ROYAL M141K ĐEN BÓNG", price: "100.000 đ", img: "#" },
    { name: "FULLFACE ROYAL M02 SCHU ĐEN", price: "100.000 đ", img: "#" },
    { name: "FULLFACE ROYAL M141K TRẮNG", price: "100.000 đ", img: "#" },
    { name: "ROYAL M139 V.9 TRẮNG", price: "100.000 đ", img: "#" },
    { name: "FULLFACE ROYAL M02 ĐỎ", price: "100.000 đ", img: "#" },
    { name: "ASIA MT-10 ĐỎ MỜ", price: "100.000 đ", img: "#" },
    { name: "ASIA MT-10 XANH MU BÓNG", price: "100.000 đ", img: "#" },
    { name: "ASIA MT-10 XANH MU BÓNG", price: "100.000 đ", img: "#" },
    { name: "ASIA MT-10 XANH MU BÓNG", price: "100.000 đ", img: "#" },
];

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query) {
        const filteredProducts = productseach.filter(pross =>
            pross.name.toLowerCase().includes(query)
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(pross => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <img src="${pross.img}" alt="${pross.name}">
                    <div>
                        <p>${pross.name}</p>
                        <p>${pross.price}</p>
                    </div>
                `;
                li.addEventListener("click", () => {
                    window.location.href = pross.url; // Chuyển hướng khi click
                });
                searchResults.appendChild(li);
            });
            searchResults.classList.remove("hidden");
        } else {
            searchResults.classList.add("hidden");
        }
    } else {
        searchResults.classList.add("hidden");
    }
});

// Đóng dropdown khi click bên ngoài
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add("hidden");
    }
});