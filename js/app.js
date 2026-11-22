import { loadServices } from './agendamentos.js';
import { supabase } from './supabase.js';

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

    if (themeButton) {
        themeButton.textContent = newTheme === 'dark' ? '☀' : '☾';
    }
}

if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
}

async function updateAccount(user) {
    const actions = document.querySelector('.actions');
    const loginLink = actions?.querySelector('a[href="login/login.html"]');

    if (!actions || !loginLink) return;

    let logoutButton = document.getElementById('logout-button');

    if (!user) {
        loginLink.textContent = 'Entrar';
        loginLink.href = 'login/login.html';

        logoutButton?.remove();
        return;
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('user_id', user.id)
        .maybeSingle();

    loginLink.textContent = profile?.full_name || user.email;
    loginLink.href = '#';
    loginLink.title = profile?.role === 'admin'
        ? 'Administrador'
        : 'Minha conta';

    if (!logoutButton) {
        logoutButton = document.createElement('button');
        logoutButton.id = 'logout-button';
        logoutButton.className = 'button button-small';
        logoutButton.textContent = 'Sair';

        actions.appendChild(logoutButton);
    }

    logoutButton.onclick = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert('Não foi possível sair da conta.');
            return;
        }

        window.location.reload();
    };
}

async function checkAccount() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Erro ao verificar conta:', error);
        return;
    }

    await updateAccount(data.user);
}

loadTheme();
loadServices();
checkAccount();

supabase.auth.onAuthStateChange((_event, session) => {
    updateAccount(session?.user || null);
});

const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}
