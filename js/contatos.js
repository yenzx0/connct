'use strict'

function buscarContato() {
    const id = Number(localStorage.getItem('id'))
    console.log('ID:', id)
    console.log('Array contatos:', contatos)
    
    const contato = contatos.find(c => c.id === id)
    console.log('Contato encontrado:', contato)
    
    return contato
}

const habilitarCampo = campo => campo.disabled = false
const trocarBotao = botao => {
    if (botao.id === 'salvar') {
        botao.style.display = 'block'
        return
    }
    botao.style.display = 'none'
}

function habilitarFormulario(){
        document.querySelectorAll('input').forEach(habilitarCampo)
        document.querySelectorAll('button').forEach(trocarBotao)

}

function preencherFormulario() {
    const contato = buscarContato()
    if (contato == undefined) {
        habilitarFormulario()
        return false
    }
    document.getElementById('nome').value = contato.name     
    document.getElementById('email').value = contato.email
    document.getElementById('celular').value = contato.celular
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('cidade').value = contato.cidade
    document.getElementById('imagePreview').src = contato.foto 
}

preencherFormulario()

document.getElementById('editar').addEventListener('click', habilitarFormulario)
