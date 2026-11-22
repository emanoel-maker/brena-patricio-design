import { loadServices } from './agendamentos.js';

const themeButton = document.getElementById('theme-toggle');

function loadTheme() {
    const savedTheme = localStorage.getItem('bp-theme') || 'light';

    document.documentElement.dataset.theme = savedTheme;
    themeButton.textContent = savedTheme === 'dark' ? '☀' : '☾';
}

function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('bp-theme', newTheme);

    themeButton.textContent = newTheme === 'dark' ? '☀' : '☾';
}

themeButton.addEventListener('click', toggleTheme);

loadTheme();
loadServices();
