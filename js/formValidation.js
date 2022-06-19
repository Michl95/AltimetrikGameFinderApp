let emailText = document.querySelector('.emailText');
let passText = document.querySelector('.passText');

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const passPath = document.querySelector('.pass_path');
const passPathVisible = document.querySelector('.pass_path--visible');
const eyePass = document.querySelector('.form_pass_eye');
const eyePassVisible = document.querySelector('.form_pass_eye--visible');



const regex = {
    //min 8 max 14, one uppercase letter, one lowercase letter, one number and one special character
    password: /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,14}$/,
    email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/
}

const category = {
    email: 'Must be a valid email address',
    pass: 'Password must be bewteen 8-14 characters and contain at least one uppercase, one lowercase, one number and a special character.',
}


const validation = (e) => {
    switch (e.target.name) {
        case "email":
            validateInput(regex.email, e.target, email, emailText, category.email);
            break;
        case "password":
            validateInput(regex.password, e.target, password, passText, category.pass);
            break;
    }
}

const validateInput = (regex, target, input, text, cat) => {

    if (regex.test(target.value)) {
        input.style.border = "1px solid green"
        text.innerHTML = "";
        text.classList.add('validMsg');
        text.classList.remove('errorMsg');
        passPath.classList.remove('red');
        passPathVisible.classList.remove('red');


    } else {
        input.style.border = "1px solid red"
        text.classList.add('errorMsg');
        text.classList.remove('validMsg');
        text.innerHTML = cat;
        passPath.classList.add('red');
        passPathVisible.classList.add('red');
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validation);
    input.addEventListener('blur', validation);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
})


async function apiCall() {
    let emailValue = document.getElementById("email").value;
    let passValue = document.getElementById("password").value;


    try {
        await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passValue,
                })
            }).then((response) => response.json())
            .then(
                (json) => {
                    if (json.accessToken) {
                        window.location.assign('../pages/secondPage.html');
                    } else {
                        password.style.border = "1px solid red"
                        email.style.border = "1px solid red"
                        emailText.innerHTML = "Invalid Email"
                        emailText.style.color = "red"
                        passText.innerHTML = "Invalid Password"
                        passText.style.color = "red"
                        passPath.classList.add('red');
                        passPathVisible.classList.add('red');
                    }
                }
            );
    } catch (error) {

    }
}