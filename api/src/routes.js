const express = require('express');

const routes = express.Router();

const Cliente = require('./controllers/cliente');
const Medico = require('./controllers/medico');

routes.get('/', (req, res) => {
    res.send('API Clínica Respondendo');
});

routes.post('/clientes', Cliente.create);
routes.get('/clientes', Cliente.read);
routes.put('/clientes/:id', Cliente.update);
routes.delete('/clientes/:id', Cliente.del);

routes.post('/medicos', Medico.create);
routes.get('/medicos', Medico.read);
routes.put('/medicos/:id', Medico.update);
routes.delete('/medicos/:id', Medico.del);

module.exports = routes;