const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: cadastro.nome.value,
        cpf: cadastro.cpf.value,
        nascimento: cadastro.nascimento.value
    }
    fetch('http://localhost:4000/medicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Médico(a) cadastrado com sucesso');
            } else {
                msg3('Erro ao cadastrar médico(a)');
            }
        });
});

fetch('http://localhost:4000/medicos')
    .then(response => response.json())
    .then(medicos => {
        const tabela = document.getElementById('medicos');
        medicos.forEach((medico) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td data-label="Id:">${medico.id_medico}</td>
            <td data-label="Nome:" contenteditable="true">${medico.nome}</td>
            <td data-label="CPF:" contenteditable="true">${medico.cpf}</td>
            <td data-label="E-mail:" contenteditable="true">${medico.email}</td>
            <td data-label="Telefone:" contenteditable="true">${medico.telefone}</td>
            <td data-label="Nascimento:" contenteditable="true">${new Date(medico.nascimento).toLocaleDateString('pt-BR')}</td>
            <td><button onclick="alterar(this)">*</button><button onclick="excluir(${medico.id_medico})">-</button></td>
        `;
            tabela.appendChild(linha);
        });
    });

function alterar(e) {
    const id = e.parentNode.parentNode.children[0].textContent
    const corpo = {
        nome: e.parentNode.parentNode.children[1].textContent,
        cpf: e.parentNode.parentNode.children[2].textContent,
        nascimento: e.parentNode.parentNode.children[3].textContent.split('/').reverse().join('-')
    }
    fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 202) {
                msg3('Médico(a) alterado com sucesso');
            } else {
                msg3('Erro ao alterar médico');
            }
        });
}

function excluir(id_cliente) {
    fetch(`http://localhost:4000/medicos/${id_cliente}`, {
        method: 'DELETE'
    })
        .then(response => response.status)
        .then(status => {
            if (status === 204) {
                msg3('Médico(a) excluído(a) com sucesso');
            } else {
                msg3('Erro ao excluir médico(a)');
            }
        });
}

function msg3(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}