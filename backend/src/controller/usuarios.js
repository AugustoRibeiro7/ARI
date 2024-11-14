//puxando o prisma
const prisma = require('../../prisma/prismaClient');

//puxando bcrypt para criptografar senhas e enviar tokens
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const cadastrar = async(req, res)=>{

    const { nome, email, senha, dataNascimento, status } = req.body;

    try {
        // Verifica se já existe um usuário com o mesmo e-mail
        const usuarioExistente = await prisma.usuario.findUnique({
            where:{
                email:email,
            },
        });

        if(usuarioExistente)
        {
            return res.status(400).json({error:'Usuário já cadastrado com este email'})
        }
        
        //criptografar senha
        senhaCriptografada = await bcrypt.hash(senha,10);

        // Se o e-mail não existe, cria o novo usuário
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada,
                dataNascimento: new Date(dataNascimento),
                status
            }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error(error); // Exibe o erro no console para depuração
        res.status(400).json({ error: `Erro ao criar usuário: ${error.message}` });
    }
}

const login = async(req,res)=>{
    const {email, senha} = req.body;

    try{
        // Verifica se já existe um usuário com o mesmo e-mail
        const usuarioExistente = await prisma.usuario.findUnique({
            where:{
                email:email,
            },
        });

        if(!usuarioExistente || !(await bcrypt.compare(senha, usuarioExistente.senha)))
        {
            return res.status(401).json({message:'Email ou Senha incorretos!'})
        }

        const token = jwtConfig.generateToken(usuarioExistente.id);

        // enviando resultado positivo para logar
        res.status(200).json({token});
    }catch(error){
        res.status(500).json({error:`Erro ao tentar fazer login..: ${error.message}`})
    }
}

const logout = async (req, res) => {
    
    try {
        // Pega o token do cabeçalho Authorization, esperado como "Bearer <token>"
        const token = req.headers['authorization'].split(' ')[1]; // Usamos essa quebra pq normalmente usamos “Baerer XXX”

        if (!token) {
            return res.status(400).json({ message: 'Token não fornecido' });
        }
        
        // Chama a função blacklistToken para invalidar o token, o armazenando na blacklist
        jwtConfig.blacklistToken(token); 
 
        res.status(200).json({ message: 'Logout realizado com sucesso'});


    } catch (error) {
        console.error(error); // Para depuração
        res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
}

//CRUD
// Função para retornar todos os usuários
const getUsuarios = async (req,res)=>{
    try {
        // Busca todos os usuários do banco
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error); // Exibe o erro no console para depuração
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
}

// Função para retornar um usuário específico pelo ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

// Função para atualizar um usuário pelo ID
const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, dataNascimento, status } = req.body;

    try {
        let dadosAtualizados = { nome, email, dataNascimento: new Date(dataNascimento), status };

        // Atualiza a senha apenas se for fornecida uma nova
        if (senha) {
            dadosAtualizados.senha = await bcrypt.hash(senha, 10);
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: dadosAtualizados
        });

        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// Função para deletar um usuário pelo ID
const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.usuario.update({
            where: { id: parseInt(id) },
            data:{status:false} // Altera o status para falso (usuario "deletado")
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};



//TOKEN
const autenticarToken = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Usamos essa quebra pq normalmente usamos “Baerer XXX”
    
    //verificando se token esta vazio
    if (token == null) return res.sendStatus(401); // Token ausente

    try {
        // Verificando o token
        const user = await jwtConfig.verifyToken(token);
        req.user = user;
        next(); // Passa para a próxima função (rota) se o token for válido
    } catch (error) {
        // Caso o token esteja na blacklist ou qualquer outro erro, apenas retorna 403
        console.error('Erro ao autenticar token:', error);  // Log do erro para ajudar no diagnóstico
        return res.status(403).json({message: "Você não tem permissão para acessar este recurso."}); // Token inválido ou expirado
    }
}


//exportando routes
module.exports ={
     cadastrar,
     login,
     logout,
     getUsuarios,
     getUsuarioById,
     atualizarUsuario,
     deletarUsuario,
     autenticarToken
}