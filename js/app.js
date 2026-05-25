'use strict';

const contatos = [
    { 
        id: 1,
        name: 'Ana Oliveira Dias',
        celular: '+55 11 99999-9999',
        foto: '../img/ana-oliveira-dias.png',
        email: 'ana.oliveira.dias@email.com',
        endereco: 'Rua das Flores, 123, São Paulo - SP',
        cidade: 'São Paulo',
    },
    {
        id: 2,
        name: 'Bruno Silva',
        celular: '+55 11 98888-8888',
        foto: '../img/ana-oliveira-dias.png',
        email: 'bruno.silva@email.com',
        endereco: 'Avenida Paulista, 1000, São Paulo - SP',
        cidade: 'São Paulo',
    }
];

// função para criar o card
function criarCard(contatos) {
    const card = document.createElement('a'); 

    card.className = 'card';
    card.href = './pages/contato.html';
    card.onclick = () => localStorage.setItem('id', contatos.id)
    card.innerHTML = `
        <img src="${contatos.foto}" alt="Imagem do contato" class="card__image">
        <h2 class="card__name">${contatos.name}</h2>
        <div class="card__contact-phone">
            <i class="fas fa-mobile-alt contact__icon"></i>
            <p class="contact-phone__number">${contatos.celular}</p>
        </div>
        <div class="card__tag-color"></div>
    `;
    
    return card;
}

// função para carregar os cards dinamicamente
function carregarCards() { 
    const container = document.getElementById('card-container');

   // inserindo na pagina HTML
   const cards = contatos.map(criarCard);
   container.replaceChildren(...cards);


}
carregarCards();

document.getElementById('novo-contato')
        .addEventListener('click', () => { localStorage.clear(); });