'use strict'

function normalizeFoto(foto) {
    if (!foto) return 'img/logo.png';
    return String(foto).replace(/^(\.\.\/|\.\.\\)+/, '');
}

function formatCelular(raw) {
    if (!raw) return '';
    const digits = String(raw).replace(/\D/g, '');
    if (digits.length === 11) {
        return digits.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '$1 $2 $3-$4');
    }
    if (digits.length === 10) {
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1 $2-$3');
    }
    return raw.trim();
}

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

function normalizeItem(item) {
    return {
        id: item.id,
        nome: item.nome ?? item.name ?? '',
        celular: formatCelular(item.celular ?? item.telefone ?? ''),
        foto: normalizeFoto(item.foto),
        email: item.email ?? '',
        endereco: item.endereco ?? '',
        cidade: item.cidade ?? ''
    };
}

export async function getContatos() {
    const url = 'https://backend-fecaf-connect.vercel.app/contatos'
    const data = await fetchJson(url)
    return Array.isArray(data) ? data.map(normalizeItem) : [];
}

export async function getContato(id) {
    if (!id) return undefined;
    const url = `https://backend-fecaf-connect.vercel.app/contatos/${id}`;
    const data = await fetchJson(url);
    return data ? normalizeItem(data) : undefined;
}

export async function deleteContato(id) {
    if (!id) return false;
    const url = `https://backend-fecaf-connect.vercel.app/contatos/${id}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
}