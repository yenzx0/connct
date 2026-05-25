'use strict';

 import { getContatos } from './contato.js'

function criarCard(contato) {
    const card = document.createElement('a');

    card.className = 'card';
    card.href = './pages/contato.html';
    card.onclick = () => localStorage.setItem('id', contato.id)

    const foto = contato.foto ? contato.foto.replace(/^\.\.(\/)?/, '') : '';

    card.innerHTML = `
        <img src="${foto}" alt="Imagem do contato" class="card__image">
        <h2 class="card__name">${contato.nome}</h2>
        <div class="card__contact-phone">
            <i class="fas fa-mobile-alt contact__icon"></i>
            <p class="contact-phone__number">${contato.celular}</p>
        </div>
        <div class="card__tag-color"></div>
    `;

    return card;
}

async function carregarCards() { 
    const container = document.getElementById('card-container')

    const contatos = await getContatos()

   const cards = contatos.map(criarCard)
   container.replaceChildren(...cards)


}
carregarCards();

document.getElementById('novo-contato')
        .addEventListener('click', () => { localStorage.clear() })