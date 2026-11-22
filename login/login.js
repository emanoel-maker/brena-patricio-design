import { signIn, signUp } from '../js/auth.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const formTitle = document.getElementById('form-title');
const formDescription = document.getElementById('form-description');
const formMessage = document.getElementById('form-message');

const registerOption = document.getElementById('register-option');
const loginOption = document.getElementById('login-option');

function showMessage(message, isError = false) {
    formMessage.textContent = message;
    formMessage.style.color = isError ? '#b42318' : '#806B50';
}

document.getElementById('show-register').addEventListener('click', (event) => {
    event.preventDefault();

    loginForm.hidden = true;
    registerForm.hidden = false;

    registerOption.hidden = true;
    loginOption.hidden = false;

    formTitle.textContent = 'Crie sua conta';
    formDescription.textContent = 'Cadastre-se para solicitar seus agendamentos.';

    showMessage('');
});

document.getElementById('show-login').addEventListener('click', (event) => {
    event.preventDefault();

    registerForm.hidden = true;
    loginForm.hidden = false;

    loginOption.hidden = true;
    registerOption.hidden = false;

    formTitle.textContent = 'Entre na sua conta';
    formDescription.textContent = 'Acesse sua conta para acompanhar seus agendamentos.';

    showMessage('');
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const button = loginForm.querySelector('button');
    button.disabled = true;
    button.textContent = 'Entrando...';

    const { error } = await signIn(email, password);

    if (error) {
        showMessage('E-mail ou senha incorretos.', true);
        button.disabled = false;
        button.textContent = 'Entrar';
        return;
    }

    showMessage('Login realizado!');

    window.location.href = '../index.html';
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    const button = registerForm.querySelector('button');
    button.disabled = true;
    button.textContent = 'Criando conta...';

    const { data, error } = await signUp(name, email, password);

    if (error) {
        showMessage(error.message, true);
        button.disabled = false;
        button.textContent = 'Criar minha conta';
        return;
    }

    if (data?.session) {
        showMessage('Conta criada com sucesso!');
        window.location.href = '../index.html';
        return;
    }

    showMessage('Conta criada! Verifique seu e-mail para confirmar o cadastro.');
    button.disabled = false;
    button.textContent = 'Criar minha conta';
});
