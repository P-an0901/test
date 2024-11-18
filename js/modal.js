function addSampleAccount() {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Nếu chưa có tài khoản, thêm một tài khoản mẫu
    if (accounts.length === 0) {
        accounts.push({
            fullName: 'Nguyen Van A',
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
    let emailUser = document.getElementById('email').value;  
    let passwordUser = document.getElementById('password').value;
    let passwordConfirmation = document.getElementById('password_confirmation').value;
    let checkSignup = document.getElementById('checkbox-signup').checked;

    // Kiểm tra validate
    validateSignup(fullNameUser, emailUser, passwordUser, passwordConfirmation, checkSignup);

    // Nếu thông tin hợp lệ, lưu vào localStorage
    if (fullNameUser.length >= 6 && emailUser.length > 0 && passwordUser.length >= 6 && passwordUser === passwordConfirmation && checkSignup) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts.push({ fullName: fullNameUser, email: emailUser, password: passwordUser });  // Sử dụng email thay vì phone
        localStorage.setItem('accounts', JSON.stringify(accounts));
        return true;
    }else{
        document.querySelector('.form-message-login').innerHTML = 'Kiểm tra lại email hoặc mật khẩu';
    }
}

// Hàm kiểm tra và hiển thị thông báo lỗi trong đăng ký
function validateSignup(fullNameUser, emailUser, passwordUser, passwordConfirmation, checkSignup) {
    if (fullNameUser.length == 0) {
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên';
        document.getElementById('fullname').focus();
    } else if (fullNameUser.length < 6) {
        document.getElementById('fullname').value = '';
        document.querySelector('.form-message-name').innerHTML = 'Vui lòng nhập họ và tên lớn hơn 6 kí tự';
    } else {
        document.querySelector('.form-message-name').innerHTML = '';
    }

    if (emailUser.length == 0) {
        document.querySelector('.form-message-email').innerHTML = 'Vui lòng nhập vào email';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailUser)) {
        document.querySelector('.form-message-email').innerHTML = 'Vui lòng nhập vào email hợp lệ';
        document.getElementById('email').value = '';
    } else {
        document.querySelector('.form-message-email').innerHTML = '';
    }

    if (passwordUser.length == 0) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu';
    } else if (passwordUser.length < 6) {
        document.querySelector('.form-message-password').innerHTML = 'Vui lòng nhập mật khẩu lớn hơn 6 kí tự';
        document.getElementById('password').value = '';
    } else {
        document.querySelector('.form-message-password').innerHTML = '';
    }

    if (passwordConfirmation.length == 0) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Vui lòng nhập lại mật khẩu';
    } else if (passwordConfirmation !== passwordUser) {
        document.querySelector('.form-message-password-confi').innerHTML = 'Mật khẩu không khớp';
        document.getElementById('password_confirmation').value = '';
    } else {
        document.querySelector('.form-message-password-confi').innerHTML = '';
    }

    if (!checkSignup) {
        document.querySelector('.form-message-checkbox').innerHTML = 'Vui lòng kiểm tra đăng ký';
    } else {
        document.querySelector('.form-message-checkbox').innerHTML = '';
    }
}

// Hàm xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();

    let emailLog = document.getElementById('email-login').value;
    let passlog = document.getElementById('password-login').value;
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    validateLogin(emailLog, passlog);

    if (emailLog.length > 0 && passlog.length >= 6) {
        let accountFound = accounts.find(account => account.email === emailLog && account.password === passlog);
        if (accountFound) {
            // Lưu thông tin người dùng đã đăng nhập vào localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(accountFound));
           return accountFound;
        } else {
            document.querySelector('.form-message-login').innerHTML = 'Kiểm tra lại tài khoản hoặc mật khẩu';
        }
    }
}


// Hàm kiểm tra và hiển thị thông báo lỗi trong đăng nhập
function validateLogin(emailLog, passlog) {
    // Kiểm tra email
    if (emailLog.length == 0) {
        document.querySelector('.form-message.email-log').innerHTML = 'Vui lòng nhập vào email';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailLog)) {
        document.querySelector('.form-message.email-log').innerHTML = 'Vui lòng nhập vào email hợp lệ';
        document.getElementById('email-login').value = '';
    } else {
        document.querySelector('.form-message.email-log').innerHTML = '';
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
