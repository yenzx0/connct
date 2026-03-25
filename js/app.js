'use strict';

// função para criar o card
function criarCard() {
    const card = document.createElement('a'); 

    card.className = 'card';
    card.href = './pages/contato.html';
    card.innerHTML = `
        <img src="./img/ana-oliveira-dias.png" alt="Imagem do contato" class="card__image">
        <h2 class="card__name">Ana Oliveira Dias</h2>
        <div class="card__contact-phone">
            <i class=""fas fa-mobile-alt contact__icon"></i>
            <p class="contact-phone__number">+55 11 99999-9999</p>
        </div>
        <div class="card__tag-color"></div>
    `;
    
    return card;
}

// função para carregar os cards dinamicamente
function carregarCards() { 
    const container = document.getElementById('card-container');

   // inserindo na pagina HTML
   for(let i = 0; i < 10; i++) {
   container.appendChild(criarCard());
    }


}

carregarCards();