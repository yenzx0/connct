 'use strict'
import { preview } from './preview.js'
import { getContato, deleteContato } from './contato.js'

async function buscarContato() {
    const id = Number(localStorage.getItem('id'))
    if (!id) return undefined
    const contato = await getContato(id)
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


async function preencherFormulario() {
    const contato = await buscarContato()
    if (contato == undefined) {
        habilitarFormulario()
        return false
    }
    document.getElementById('nome').value = contato.nome
    document.getElementById('email').value = contato.email
    document.getElementById('celular').value = contato.celular
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('cidade').value = contato.cidade
    const imgSrc = contato.foto || 'img/logo.png'
    const needsParent = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\')
    document.getElementById('imagePreview').src = (needsParent && !/^https?:\/\//.test(imgSrc) && !imgSrc.startsWith('..')) ? `../${imgSrc}` : imgSrc
}

preencherFormulario()

document.getElementById('editar').addEventListener('click', habilitarFormulario)
document.getElementById('inputFile')
        .addEventListener('change', () => preview('inputFile', 'imagePreview'))

const salvarBtn = document.getElementById('salvar')
const cancelarLink = document.getElementById('cancelar')

function mostrarSalvarCancelar() {
    if (salvarBtn) salvarBtn.style.display = 'flex'
    if (cancelarLink) cancelarLink.classList.remove('oculto')
}

async function salvarContato() {
    const id = Number(localStorage.getItem('id'))
    const payload = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        foto: document.getElementById('imagePreview').src
    }

    try {
        const urlBase = 'https://backend-fecaf-connect.vercel.app/contatos'
        const res = await fetch(id ? `${urlBase}/${id}` : urlBase, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        window.location.href = '../index.html'
    } catch (err) {
        console.error('Erro ao salvar contato', err)
        alert('Erro ao salvar contato. Tente novamente.')
    }
}

if (salvarBtn) salvarBtn.addEventListener('click', salvarContato)

const deletarBtn = document.getElementById('deletar')
async function excluirContato() {
    const id = Number(localStorage.getItem('id'))
    if (!id) return
    const confirmar = confirm('Deseja realmente excluir este contato?')
    if (!confirmar) return

    try {
        await deleteContato(id)
        localStorage.removeItem('id')
        window.location.href = '../index.html'
    } catch (err) {
        console.error('Erro ao excluir contato', err)
        alert('Erro ao excluir contato. Tente novamente.')
    }
}

if (deletarBtn) deletarBtn.addEventListener('click', excluirContato)
if (cancelarLink) cancelarLink.addEventListener('click', (e) => {
    // navega para a página inicial sem salvar
})

 