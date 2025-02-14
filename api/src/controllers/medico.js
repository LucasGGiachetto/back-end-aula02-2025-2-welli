const con = require('../connect');

function create(req, res) {
    const { nome, cpf, email, telefone, nascimento } = req.body;
    const sql = `INSERT INTO medicos (nome, cpf, email, telefone, nascimento) VALUES ('${nome}', '${cpf}', '${email}', ${telefone} '${nascimento}')`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao cadastrar médico(a)');
        } else {
            res.status(201).json('Médico(a) cadastrado(a) com sucesso');
        }
    });
};

function read(req, res) {
    const sql = 'SELECT * FROM medicos';
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao consultar médicos');
        } else {
            res.status(200).json(result);
        }
    });
}

function update(req, res) {
    const { id } = req.params;
    const { nome, cpf, email, telefone, nascimento } = req.body;
    const sql = `UPDATE medicos SET nome = '${nome}', cpf= '${cpf}', email = '${email}', telefone = '${telefone}' nascimento = '${nascimento}' WHERE id_medico = ${id}`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao alterar médico(a)');
        } else {
            res.status(202).json('Médico(a) alterado(a) com sucesso(a)');
        }
    });
}

function del(req, res) {
    const { id } = req.params;
    const sql = `DELETE FROM medicos WHERE id_medico = ${id}`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao excluir médico');
        } else {
            res.status(204).json('Médico excluído com sucesso');
        }
    });
}

module.exports = {
    create,
    read,
    update,
    del
}