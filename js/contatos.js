'use strict'
import { preview } from './preview.js'

function buscarContato() {
    const id = Number(localStorage.getItem('id'))
    const contato = contatos.find(c => c.id === id)
    return contato
}

const habilitarCampo = campo => campo.disabled = false

const trocarBotao = botao => {
    if (botao.id === 'editar' || botao.id === 'deletar') {
        botao.style.display = 'none'
        return
    }
    botao.style.display = 'flex'  
}

function habilitarFormulario() {
    document.querySelectorAll('input').forEach(habilitarCampo)
    document.querySelectorAll('button').forEach(trocarBotao)
    document.getElementById('inputFile').disabled = false
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
document.getElementById('inputFile')
        .addEventListener('change', () => preview('inputFile', 'imagePreview'))