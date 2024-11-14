// puxando o express e criando o objeto router
const express = require('express');
const router = express.Router();

//chamando funções
const {
    cadastrar,  
    deletar,
    getRemedios} = require('../controller/remedios');

//Rotas de Remedios
router.post('/cadastrar', cadastrar);
router.post('/deletar', deletar);
router.get('/', getRemedios);


//exportando arquivo
module.exports = router;