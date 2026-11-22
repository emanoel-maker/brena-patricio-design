import { loadServices } from './agendamentos.js';
import { signIn, signUp } from './auth.js';

const themeButton = document.getElementById('theme-toggle');

function loadTheme() {
    const savedTheme = localStorage.getItem('bp-theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;

    if (themeButton) {
        themeButton.textContent = savedTheme === 'dark' ? '☀' : '☾';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('bp-theme', newTheme);

    themeButton.textContent = newTheme === 'dark' ? '☀' : '☾';
}

if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
}

loadTheme();
loadServices();

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerArea = document.getElementById('register-area');
const loginArea = document.querySelector('.login-form');

document.getElementById('show-register')?.addEventListener('click', (event) => {
    event.preventDefault();
    loginArea.hidden = true;
    registerArea.hidden = false;
});

document.getElementById('show-login')?.addEventListener('click', (event) => {
    event.preventDefault();
    registerArea.hidden = true;
    loginArea.hidden = false;
});

loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = document.getElementById('login-message');
    message.textContent = 'Entrando...';

    try {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const { error } = await signIn(email, password);

        if (error) throw error;

        message.textContent = 'Login realizado com sucesso!';
    } catch (error) {
        message.textContent = 'Erro ao entrar: ' + error.message;
    }
});

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = document.getElementById('register-message');
    message.textContent = 'Criando conta...';

    try {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        const { error } = await signUp(name, email, password);

        if (error) throw error;

        message.textContent =
            'Cadastro realizado! Verifique seu e-mail para confirmar a conta.';
    } catch (error) {
        message.textContent = 'Erro ao cadastrar: ' + error.message;
    }
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
