function addSampleAccount() {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Nếu chưa có tài khoản, thêm một tài khoản mẫu
    if (accounts.length === 0) {
        accounts.push({
            fullName: 'Nguyen Van A',
            username: 'admin',
            email: 'paan@gmail.com',
            password: '123456',
            role:'admin'
        });
        // Lưu tài khoản vào localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}
addSampleAccount();
// Hàm xử lý đăng ký
function handleSignup(event) {
    event.preventDefault();

    let fullNameUser = document.getElementById('fullname').value;
    let usernameUser = document.getElementById('username').value;
    let emailUser = document.getElementById('email').value;  
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;

    // Kiểm tra validate
    validateSignup(fullNameUser, usernameUser, emailUser, passwordUser, passwordConfirmation, checkSignup);

    // Nếu thông tin hợp lệ, lưu vào localStorage
    if (fullNameUser.length >= 6 && usernameUser.length >= 6 && passwordUser.length >= 6 && passwordUser === passwordConfirmation && checkSignup) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        // Kiểm tra username trùng lặp
        if (accounts.some(account => account.username === usernameUser)) {
            document.querySelector('.form-message-username').innerHTML = 'Tên tài khoản đã tồn tại';
            return false;
        }

        accounts.push({
            fullName: fullNameUser,
            username: usernameUser,
            email: emailUser || '',
            password: passwordUser,
            role: 'user'
        });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        return true;
    }
}


// Hàm kiểm tra và hiển thị thông báo lỗi trong đăng ký
function validateSignup(fullNameUser, usernameUser, emailUser, passwordUser, passwordConfirmation, checkSignup) {
    // Kiểm tra họ và tên
    if (fullNameUser.length == 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 6) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 6 kí tự';
    } else {
        document.querySelector('.form-message-name').innerHTML = '';
    }

    // Kiểm tra username
    if (usernameUser.length == 0) {
        document.querySelector('.form-message-username').innerHTML = 'Vui lòng nhập username';
        document.getElementById('username').focus();
    } else if (usernameUser.length < 6) {
        document.getElementById('username').value = '';
        document.querySelector('.form-message-username').innerHTML = 'Vui lòng nhập username lớn hơn 6 kí tự';
    } else {
        document.querySelector('.form-message-username').innerHTML = '';
    }

    // Kiểm tra email
    if (emailUser.length == 0) {
        document.querySelector('.form-message-email').innerHTML = 'Vui lòng nhập vào email';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailUser)) {
        document.querySelector('.form-message-email').innerHTML = 'Vui lòng nhập vào email hợp lệ';
        document.getElementById('email').value = '';
    } else {
        document.querySelector('.form-message-email').innerHTML = '';
    }

    // Kiểm tra mật khẩu
    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = '';
    }

    // Kiểm tra xác nhận mật khẩu
    if (passwordConfirmation.length == 0) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('password_confirmation').value = '';
    } else {
        document.querySelector('.form-message-password-confi').innerHTML = '';
    }

    // Kiểm tra checkbox
    if (!checkSignup) {
        document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng kiểm tra đăng ký';
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }
}
// Hàm xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();

    let usernameLog = document.getElementById('username-login').value;
    let passlog = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    validateLogin(usernameLog, passlog);

    if (usernameLog.length > 0 && passlog.length >= 6) {
        let accountFound = accounts.find(account => account.username === usernameLog && account.password === passlog);
        if (accountFound) {
            // Lưu thông tin người dùng đã đăng nhập vào localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(accountFound));
            return accountFound;
        } else {
            document.querySelector('.form-message-login').innerHTML = 'Kiểm tra lại username hoặc mật khẩu';
        }
    }
}
// Hàm kiểm tra và hiển thị thông báo lỗi trong đăng nhập
function validateLogin(usernameLog, passlog) {
    // Kiểm tra username
    if (usernameLog.length == 0) {
        document.querySelector('.form-message-username').innerHTML = 'Vui lòng nhập vào username';
    } else {
        document.querySelector('.form-message-username').innerHTML = '';
    }

    // Kiểm tra mật khẩu
    if (passlog.length == 0) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passlog.length < 6) {
        document.querySelector('.form-message-check-login').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password-login').value = '';
    } else {
        document.querySelector('.form-message-check-login').innerHTML = '';
    }
}

