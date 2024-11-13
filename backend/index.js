//criando servidor com express
const express = require('express');
const app = express();

//puxando cors
const cors = require('cors');

//chamando prisma
const prisma = require('./prisma/prismaClient');

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

//puxar dotenv
const env = require('dotenv').config();

// Permite cors, todas as origens
app.use(cors());

//Mensagem de boas vindas na rota raiz
app.get('/', (req,res)=>{
    res.send('Bem vindo ao ARI');
});

//importar rotas
const usuarioRoutes = require('./src/routes/usuarios');

//usar rotas no Express
app.use('/usuario', usuarioRoutes);

//ultimo elemento do arquivo
app.listen(3001, ()=>{
    console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');
})


