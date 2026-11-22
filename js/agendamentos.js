const services = [
    {
        name: 'Design personalizado',
        category: 'Sobrancelhas',
        description: 'Formato pensado para valorizar seus traços naturais.',
        price: 30
    },
    {
        name: 'Design com henna',
        category: 'Sobrancelhas',
        description: 'Definição e preenchimento para um olhar marcante.',
        price: 40
    },
    {
        name: 'Brow Lamination',
        category: 'Sobrancelhas',
        description: 'Alinhamento dos fios para um efeito moderno.',
        price: 125
    },
    {
        name: 'Lash Lifting',
        category: 'Cílios',
        description: 'Curvatura e destaque para os cílios naturais.',
        price: 125
    },
    {
        name: 'Fio a fio',
        category: 'Cílios',
        description: 'Extensão delicada para valorizar o olhar.',
        price: 125
    },
    {
        name: 'Spa de sobrancelhas',
        category: 'Cuidados',
        description: 'Um momento de cuidado e renovação.',
        price: 20
    }
];

export function loadServices() {
    const container = document.getElementById('services-list');

    if (!container) return;

    container.innerHTML = services.map(service => `
        <article class="service-card">
            <small>${service.category}</small>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <span class="service-price">
                R$ ${service.price.toFixed(2).replace('.', ',')}
            </span>
        </article>
    `).join('');
}
