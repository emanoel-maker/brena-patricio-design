
import {
    signIn,
    signUp,
    signInWithGoogle
} from '../js/auth.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const formTitle = document.getElementById('form-title');
const formDescription = document.getElementById('form-description');
const formMessage = document.getElementById('form-message');

const registerOption = document.getElementById('register-option');
const loginOption = document.getElementById('login-option');
const googleButton = document.getElementById('google-login');
const googleDivider = document.querySelector('.google-divider');

// Sincronizar tema
function updateTheme() {
    const theme = localStorage.getItem('bp-theme') || 'light';

    document.documentElement.dataset.theme = theme;

    document.querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#211D19' : '#F4F1EB');
}

updateTheme();

window.addEventListener('pageshow', updateTheme);

window.addEventListener('storage', (event) => {
    if (event.key === 'bp-theme') {
        updateTheme();
    }
});

function showMessage(message, isError = false) {
    formMessage.textContent = message;
    formMessage.style.color = isError ? '#b42318' : '#806B50';
}

// Mostrar cadastro
document.getElementById('show-register').addEventListener('click', (event) => {
    event.preventDefault();

    loginForm.hidden = true;
    registerForm.hidden = false;

    registerOption.hidden = true;
    loginOption.hidden = false;

    googleButton.hidden = true;
    googleDivider.hidden = true;

    formTitle.textContent = 'Crie sua conta';
    formDescription.textContent = 'Cadastre-se para solicitar seus agendamentos.';

    showMessage('');
});

// Mostrar login
document.getElementById('show-login').addEventListener('click', (event) => {
    event.preventDefault();

    registerForm.hidden = true;
    loginForm.hidden = false;

    loginOption.hidden = true;
    registerOption.hidden = false;

    googleButton.hidden = false;
    googleDivider.hidden = false;

    formTitle.textContent = 'Entre na sua conta';
    formDescription.textContent = 'Acesse sua conta para acompanhar seus agendamentos.';

    showMessage('');
});

// Login com e-mail e senha
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

    window.location.href = '../index.html';
});

// Cadastro
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
        window.location.href = '../index.html';
        return;
    }

    showMessage('Conta criada! Verifique seu e-mail para confirmar o cadastro.');
    button.disabled = false;
    button.textContent = 'Criar minha conta';
});

// Login com Google
googleButton.addEventListener('click', async () => {
    googleButton.disabled = true;
    googleButton.textContent = 'Conectando ao Google...';

    const { error } = await signInWithGoogle();

    if (error) {
        showMessage('Não foi possível entrar com Google.', true);
        googleButton.disabled = false;
        googleButton.textContent = 'Continuar com Google';
    }
});
