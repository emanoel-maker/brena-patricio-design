import { supabase } from './supabase.js';

export async function loadServices() {
    const servicesList = document.getElementById('services-list');

    servicesList.innerHTML = '<p>Carregando serviços...</p>';

    const { data, error } = await supabase
        .from('services')
        .select('id, name, category, description, price, duration_minutes')
        .eq('active', true)
        .order('sort_order');

    if (error) {
        console.error('Erro ao carregar serviços:', error);
        servicesList.innerHTML = '<p>Não foi possível carregar os serviços.</p>';
        return;
    }

    if (!data || data.length === 0) {
        servicesList.innerHTML = '<p>Nenhum serviço disponível no momento.</p>';
        return;
    }

    servicesList.innerHTML = data.map(service => `
        <article class="service-card">
            <h3>${service.name}</h3>
            <p>${service.description || ''}</p>
            <p class="service-price">
                R$ ${Number(service.price).toFixed(2).replace('.', ',')}
            </p>
        </article>
    `).join('');
}
