const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
let emailText = document.querySelector('.emailText');
let passText = document.querySelector('.passText');
let eyeError = document.getElementById("form_pass_eye--error");
let eye = document.getElementById("form_pass_eye");


const regex = {
    //min 8 max 14, one uppercase letter, one lowercase letter, one number and one special character
    password: /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,14}$/,
    email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/
}

const category = {
    email: 'Must be a valid email address',
    pass: 'Password must be bewteen 8-14 characters and contain at least one uppercase, one lowercase, one number, a special character.',
}


const validation = (e) => {
    switch (e.target.name) {
        case "email": // in case our input name match i want to execute a certain code -
            validateInput(regex.email, e.target, email, emailText, category.email);
            break;
        case "password":
            validateInput(regex.password, e.target, password, passText, category.pass);
            break;
    }
}

const validateInput = (regex, target, input, text, cat) => { // I put 

    if (regex.test(target.value)) { // si me devuelve un true tal cosa un false tal otra
        input.style.border = "1px solid green"
        text.innerHTML = "";
        eye.style.display = 'block'
        eyeError.style.display = 'none'
        text.classList.add('validMsg');
        text.classList.remove('errorMsg');


    } else {
        input.style.border = "1px solid red"
        text.classList.add('errorMsg');
        text.classList.remove('validMsg');
        text.innerHTML = cat;
        eye.style.display = 'none'
        eyeError.style.display = 'block'
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validation); // the keyup word means that when the user press a key and lift his or her finger a code will be executed
    input.addEventListener('blur', validation); // When the user clicks outside the input I want to validate aswell
})

form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the user from submiting any data.
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
            }).then((response) => response.json()) // convert to json
            .then(
                (json) => {
                    if (json.accessToken) {
                        window.location.assign('../pages/secondPage.html');
                    } else {
                        //alert("email o contrasena no son validas");
                        password.style.border = "1px solid red"
                        email.style.border = "1px solid red"
                        emailText.innerHTML = "Invalid Email"
                        emailText.style.color = "red"
                        passText.innerHTML = "Invalid Password"
                        passText.style.color = "red"
                        eye.style.display = 'none'
                        eyeError.style.display = 'block'
                    }
                }
            ); //print data to console
    } catch (error) {

    }
}



// const email = document.getElementById('email');
// const pass = document.getElementById('password');

// email.addEventListener('input', () =>{
//     const form = document.querySelector('.form');
//     const emailText = document.querySelector('.emailText');
//     const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//     if(email.value.match(emailPattern)){
//         form.classList.add('validMsg');
//         form.classList.remove('errorMsg');
//         emailText.innerHTML = "Your email is valid";
//     }
// })