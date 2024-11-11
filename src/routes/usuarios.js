// puxando o express e criando o objeto router
const express = require('express');
const router = express.Router();

//chamando funções
const {
    cadastrar, 
    login, 
    logout,
    getUsuarios, 
    getUsuarioById, 
    atualizarUsuario, 
    deletarUsuario,
    autenticarToken} = require('../controller/usuarios');

//Rotas de Usuario
router.post('/cadastrar', cadastrar);
router.post('/login', login);
router.post('/logout', logout);
//rotas CRUD, sendo autenticadas antes de chamar a rota get
router.get('/', autenticarToken, getUsuarios); //obter todos os usuários
router.get('/:id', autenticarToken, getUsuarioById); //obter um usuário específico pelo ID
router.put('/:id', autenticarToken, atualizarUsuario); //atualizar um usuário pelo ID
router.delete('/:id', autenticarToken, deletarUsuario); //deletar um usuário pelo ID



//exportando arquivo
module.exports = router;