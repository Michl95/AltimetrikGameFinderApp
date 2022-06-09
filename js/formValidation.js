const form = document.getElementById('form');
const inputs = document.querySelectorAll(' #form input');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');


function validation(){
    console.log('funciona');
}

inputs.forEach((input) =>{
    input.addEventListener('keyup', validation()); // the keyup word means that when the user press a key and lift his or her finger a code will be executed
    input.addEventListener('blur', validation());
})

form.addEventListener('submit', (e)=>{
    e.preventDefault(); // stop the user from submiting any data.
})

